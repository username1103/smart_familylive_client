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
  const { accessToken } = await tokens.loadAccessToken();
  config.headers.Authorization = attachBearer(accessToken);
  return config;
});

export const createAuthedAxios = ({ state, setState }) => {
  if (state.status !== 'authed') {
    return axios;
  }

  const authedAxios = async (options) => {
    try {
      return await baseCall(options);
    } catch (error) {
      const originalRequest = error.config;

      if (isTokenError(error)) {
        let metadata;

        if (!isRefreshingTokens) {
          isRefreshingTokens = true;

          try {
            metadata = await tokens.refreshTokens({
              addr: config.apiAddr,
              refreshToken: (await tokens.loadRefreshToken()).refreshToken,
            });

            await tokens.storeTokens({
              refreshToken: metadata.refreshToken,
              accessToken: metadata.accessToken,
            });

            setState(() => ({
              status: 'authed',
              userId: metadata.userId,
              needInit: metadata.needInit,
              isMatched: metadata.isMatched,
            }));

            isRefreshingTokens = false;
          } catch (err) {
            isRefreshingTokens = false;
            setState({ status: 'not-authed' });
            await tokens.deleteTokens();
            throw err;
          }

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
      } else {
        throw error;
      }
    }
  };

  return authedAxios;
};
