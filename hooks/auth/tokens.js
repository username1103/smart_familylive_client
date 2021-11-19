import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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

const refreshTokens = async ({ addr, refreshToken }) => {
  const result = await axios({
    method: 'post',
    url: `${addr}/v1/auth/refresh-tokens`,
    data: { refreshToken },
  });

  return {
    accessToken: result.data.access.token,
    refreshToken: result.data.refresh.token,
    userId: result.data.userId,
    needInit: result.data.needInit,
    isMatched: result.data.isMatched,
  };
};

export default {
  storeTokens,
  loadAccessToken,
  loadRefreshToken,
  refreshTokens,
  deleteTokens,
};
