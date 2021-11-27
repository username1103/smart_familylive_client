import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import Colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';

import { useAuth } from '../../hooks/auth';
import { useDevice } from '../../hooks/device';
import PageName from '../../navs/page-name';
import * as Notifications from 'expo-notifications';
import stateful from '../../utils/stateful';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';

const Dumb = (p) => {
  const { logout, goConnectionCode, goSettings, alarmStatus, goFamilyInfo } = p;
  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="설정" />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity onPress={goSettings}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 13,
                  height: 45,
                  width: 350,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}
              >
                <Text style={{ fontSize: 20, color: 'black' }}>
                  알림 설정 : {alarmStatus}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goFamilyInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 13,
                  height: 45,
                  width: 350,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}
              >
                <Text style={{ fontSize: 20, color: 'black' }}>가족 정보</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 13,
                  height: 45,
                  width: 350,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}
              >
                <Text style={{ fontSize: 20, color: 'black' }}>로그아웃</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      }
    />
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const authHook = useAuth();
  const deviceHook = useDevice();

  const [alarmStatus, setAlarmStatus] = useState(null);

  const logout = async () => {
    navigation.navigate(PageName.SelectModal, {
      message: '로그아웃 하시겠습니까?',
      onSuccess: async () => {
        await deviceHook.removeDeviceToken();
        await authHook.logout();
      },
      goBack: true,
    });
  };

  const init = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted') {
      setAlarmStatus(true);
    } else {
      setAlarmStatus(false);
    }
  };

  useRefreshOnFocus({ isInitialized: alarmStatus !== null, refresh: init });

  useEffect(init, []);

  const goSettings = () => {
    Linking.openSettings();
  };

  const goFamilyInfo = () => {
    navigation.navigate(PageName.FamilyInfo);
  };

  return {
    logout,
    goSettings,
    goFamilyInfo,
    alarmStatus: alarmStatus ? 'ON' : 'OFF',
  };
};

let Settings = stateful(Dumb, Logic);
Settings.displayName = 'Settings';

export default Settings;
