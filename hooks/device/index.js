import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useAddr } from '../addr';
import { useAuth } from '../auth';

export const DeviceContext = createContext(null);

export const useDevice = () => useContext(DeviceContext);

const ensure = async ({ addr, authedAxios, userId, setDeviceToken }) => {
  if (!Constants.isDevice) {
    throw new Error('Non-device cannot issue notification device token');
  }

  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let expoToken;
  {
    const expoTokenData = await Notifications.getExpoPushTokenAsync();
    expoToken = expoTokenData.data;
    setDeviceToken(expoToken);
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      description: '설명',
    });
  }

  try {
    await authedAxios({
      method: 'put',
      url: `${addr}/v1/devices`,
      data: {
        user: userId,
        deviceToken: expoToken,
        modelName: Device.modelName,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const DeviceWrapper = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();
  const [deviceToken, setDeviceToken] = useState('');

  let userId;
  if (authHook.status === 'authed') {
    userId = authHook.userId;
  }

  const removeDeviceToken = async () => {
    if (deviceToken !== '') {
      await authHook.authedAxios({
        method: 'delete',
        url: `${addr}/v1/devices`,
        params: { user: userId, deviceToken },
      });
    }
  };
  useEffect(async () => {
    if (authHook.status === 'authed') {
      await ensure({
        addr,
        authedAxios: authHook.authedAxios,
        userId,
        setDeviceToken,
      });
    }
  }, [addr, authHook.status]);

  const take = () => {
    const ensure_ = () =>
      ensure({
        addr,
        authedAxios: authHook.authedAxios,
        userId,
        setDeviceToken,
      });

    return { ensure: ensure_, removeDeviceToken };
  };

  const [state, setState] = useState(take());
  useEffect(() => () => setState(take()), [addr, authHook]);

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  );
};
