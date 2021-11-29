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
    return false;
  }

  let expoToken;
  {
    const expoTokenData = await Notifications.getExpoPushTokenAsync();
    expoToken = expoTokenData.data;
    console.log(expoToken);
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

  return true;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const DeviceWrapper = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();
  const [deviceToken, setDeviceToken] = useState('');
  console.log(deviceToken);
  let userId;
  if (authHook.status === 'authed') {
    userId = authHook.userId;
  }

  useEffect(async () => {
    if (authHook.status === 'authed' && deviceToken === '') {
      await ensure({
        addr,
        authedAxios: authHook.authedAxios,
        userId,
        setDeviceToken,
      });
    }
  }, [addr, authHook.status]);

  const take = () => {
    const ensure_ = async () => {
      await ensure({
        addr,
        authedAxios: authHook.authedAxios,
        userId,
        setDeviceToken,
      });
    };
    const removeDeviceToken = async () => {
      if (deviceToken !== '') {
        await authHook.authedAxios({
          method: 'delete',
          url: `${addr}/v1/devices`,
          params: { user: userId, deviceToken },
        });
        setDeviceToken('');
      }
    };

    return { ensure: ensure_, removeDeviceToken };
  };

  const [state, setState] = useState(take());
  useEffect(() => setState(take()), [addr, authHook.status]);

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  );
};
