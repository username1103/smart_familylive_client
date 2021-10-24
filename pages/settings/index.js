import React from 'react';
import { Text, View } from 'react-native';
import stateful from '../../utils/stateful';

const Dumb = (p) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>This is Settings</Text>
      </View>
    </>
  );
};

const Logic = () => {
  return {};
};

let Settings = stateful(Dumb, Logic);
Settings.displayName = 'Settings';

export default Settings;
