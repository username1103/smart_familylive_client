import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';

import { useAuth } from '../../hooks/auth';
import { useDevice } from '../../hooks/device';
import PageName from '../../navs/page-name';

import stateful from '../../utils/stateful';

const Dumb = (p) => {
  const { logout, goConnectionCode } = p;
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
            <TouchableOpacity onPress={goConnectionCode} disabled={false}>
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
                <Text style={{ fontSize: 20, color: '#000000' }}>연결코드</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} disabled={false}>
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
                <Text style={{ fontSize: 20, color: '#000000' }}>로그아웃</Text>
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

  const logout = async () => {
    await deviceHook.removeDeviceToken();
    await authHook.logout();
  };

  const goConnectionCode = async () => {
    navigation.navigate(PageName.ConnectionCode);
  };

  return {
    logout,
    goConnectionCode,
  };
};

let Settings = stateful(Dumb, Logic);
Settings.displayName = 'Settings';

export default Settings;
