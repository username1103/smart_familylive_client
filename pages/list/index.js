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
        <Text>This is Lists</Text>
      </View>
    </>
  );
};

const Logic = () => {
  return {};
};

let Lists = stateful(Dumb, Logic);
Lists.displayName = 'Lists';

export default Lists;
