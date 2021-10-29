import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../../hooks/auth';

import stateful from '../../utils/stateful';

const Dumb = (p) => {
  const { logout } = p;
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
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
            }}
          >
            <Text style={{ fontSize: 20, color: '#000000' }}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Logic = () => {
  const auth = useAuth();

  return {
    logout: auth.logout,
  };
};

let Settings = stateful(Dumb, Logic);
Settings.displayName = 'Settings';

export default Settings;
