import axios from 'axios';
import config from '../../config';
import tokens from './tokens';

const isTokenError = (error) => {
  const status = error.response.status;
  return status === 401;
};

const attachBearer = (a) => `Bearer ${a}`;

let isRefreshingTokens = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const baseCall = axios.create({
  baseURL: config.apiAddr,
});

baseCall.interceptors.request.use(async (config) => {
  config.headers.Authorization = attachBearer(
    (await tokens.loadAccessToken()).accessToken
  );
  return config;
});

baseCall.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (isTokenError(error)) {
      try {
        let metadata;

        if (!isRefreshingTokens) {
          isRefreshingTokens = true;

          metadata = await tokens.refreshTokens({
            addr: config.apiAddr,
            refreshToken: (await tokens.loadRefreshToken()).refreshToken,
          });

          await storeTokens({
            refreshToken: metadata.refreshToken,
            accessToken: metadata.accessToken,
          });
          isRefreshingTokens = false;

          const result = await baseCall(options);

          onTokenRefreshed(metadata.accessToken);
          // Return the response.
          return result;
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken) => {
            originalRequest.headers.Authorization = attachBearer(accessToken);
            resolve(axios(originalRequest));
          });
        });

        return retryOriginalRequest;
      } catch (err) {
        isRefreshingTokens = false;
        await tokens.deleteTokens();
        throw err;
      }
    } else {
      throw error;
    }
  }
);

export const createAuthedAxios = ({ state, setState }) => {
  if (state.status !== 'authed') {
    return axios;
  }

  const authedAxios = async (options) => {
    try {
      return baseCall(options);
    } catch (err) {
      if (isTokenError(err)) {
        setState({ status: 'not-authed' });
      }

      throw err;
    }
  };

  return authedAxios;
};
