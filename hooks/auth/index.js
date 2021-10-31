import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAddr } from '../addr';
import axios from 'axios';
import config from '../../config';

export const Auth2Context = createContext(null);

export const useAuth = () => useContext(Auth2Context);

const storeRefreshToken = async ({ refreshToken }) => {
  await SecureStore.setItemAsync('refreshToken', refreshToken);
};

const deleteRefreshToken = async () => {
  await SecureStore.deleteItemAsync('refreshToken');
};

const loadRefreshToken = async () => {
  try {
    const result = await SecureStore.getItemAsync('refreshToken');
    return { refreshToken: result };
  } catch (e) {
    return { refreshToken: undefined };
  }
};

const storeAccessToken = async ({ accessToken }) => {
  await SecureStore.setItemAsync('accessToken', accessToken);
};

const deleteAccessToken = async () => {
  await SecureStore.deleteItemAsync('accessToken');
};

const loadAccessToken = async () => {
  try {
    const result = await SecureStore.getItemAsync('accessToken');
    return { accessToken: result };
  } catch (e) {
    return { accessToken: undefined };
  }
};

const storeTokens = async ({ refreshToken, accessToken }) => {
  await storeRefreshToken({ refreshToken });
  await storeAccessToken({ accessToken });
};

const deleteTokens = async () => {
  await deleteRefreshToken();
  await deleteAccessToken();
};

const loadAuthMetadata = async ({ addr, refreshToken }) => {
  const result = await axios({
    method: 'post',
    url: `${addr}/v1/auth/refresh-tokens/`,
    data: { refreshToken },
  });

  return {
    accessToken: result.data.access.token,
    accessTokenExpires: new Date(result.data.access.expires),
    refreshToken: result.data.refresh.token,
    userId: result.data.userId,
  };
};

const attachBearer = (a) => `Bearer ${a}`;

export const AuthProvider = ({ children }) => {
  const addr = useAddr();

  const [state, setState] = useState({ status: 'not-authed' });

  useEffect(async () => {
    try {
      // Get current refresh token.
      const { refreshToken } = await loadRefreshToken();

      // If it does not exist, it's not logged in.
      if (refreshToken == null) {
        setState({ status: 'not-authed' });
        return;
      }

      const metadata = await loadAuthMetadata({ addr, refreshToken });

      await storeTokens({
        refreshToken: metadata.refreshToken,
        accessToken: metadata.accessToken,
      });

      setState(() => ({
        status: 'authed',
        ...metadata,
      }));
    } catch (e) {
      setState({ status: 'not-authed' });
      await deleteTokens();
    }
  }, [addr]);

  const inst = useMemo(() => {
    const saveTokens = async ({ accessToken, refreshToken }) => {
      await storeTokens({ refreshToken, accessToken });
      setState({ status: 'authed' });
    };

    const logout = async () => {
      await axios({
        method: 'get',
        url: 'https://kauth.kakao.com/oauth/logout',
        params: {
          client_id: config.kakao.apiKey,
          logout_redirect_uri: `${config.apiAddr}/v1/auth/logout`,
        },
      });

      await deleteTokens();
      setState({ status: 'not-authed' });
    };

    return {
      status: state.status,
      saveTokens,
      logout,
      // authedAxios: createAuthedAxios({ addr, state, setState }),
    };
  }, [addr, state]);

  return React.createElement(Auth2Context.Provider, { value: inst }, children);
};
