import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useAddr } from '../addr';
import { useAuth } from '../auth';
import { format } from 'prettier';

export const ImageContext = createContext(null);

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();

  const take = () => {
    const upload = async (form) => {
      const result = await authHook.authedAxios({
        method: 'post',
        url: `${addr}/v1/images`,
        data: form,
      });

      return result.data;
    };

    return { upload };
  };

  const [state, setState] = useState(take());
  useEffect(() => setState(take()), [addr, authHook.status]);

  return (
    <ImageContext.Provider value={state}>{children}</ImageContext.Provider>
  );
};
