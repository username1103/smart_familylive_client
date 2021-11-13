import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import tokens from './tokens';
import { useAddr } from '../addr';
import axios from 'axios';
import config from '../../config';
import { createAuthedAxios } from './authedAxios';

export const Auth2Context = createContext(null);

export const useAuth = () => useContext(Auth2Context);

const pureLogout = async ({ status, setState }) => {
  if (status !== 'authed') {
    throw new Error();
  }

  await axios({
    method: 'post',
    baseURL: config.apiAddr,
    url: '/v1/auth/logout',
    data: {
      refreshToken: (await tokens.loadRefreshToken()).refreshToken,
    },
  });

  await tokens.deleteTokens();

  setState({ status: 'logout' });
};

export const AuthProvider = ({ children }) => {
  const addr = useAddr();

  const [state, setState] = useState({ status: 'not-authed' });

  useEffect(async () => {
    try {
      // Get current refresh token.
      const { refreshToken } = await tokens.loadRefreshToken();

      // If it does not exist, it's not logged in.
      if (refreshToken == null) {
        setState({ status: 'not-authed' });
        return;
      }

      const metadata = await tokens.refreshTokens({ addr, refreshToken });

      await tokens.storeTokens({
        refreshToken: metadata.refreshToken,
        accessToken: metadata.accessToken,
      });

      setState(() => ({
        status: 'authed',
        userId: metadata.userId,
      }));
    } catch (e) {
      console.log(e);
      setState({ status: 'not-authed' });
      await tokens.deleteTokens();
    }
  }, [addr]);

  const inst = useMemo(() => {
    const saveTokens = async ({
      userId,
      needInit,
      accessToken,
      refreshToken,
    }) => {
      await tokens.storeTokens({ refreshToken, accessToken });
      setState({ status: 'authed', userId, needInit });
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
      await pureLogout({ status: state.status, setState });
    };

    return {
      status: state.status,
      userId: state.userId,
      needInit: state.needInit,
      saveTokens,
      logout,
      authedAxios: createAuthedAxios({ state, setState }),
    };
  }, [addr, state]);

  return React.createElement(Auth2Context.Provider, { value: inst }, children);
};
