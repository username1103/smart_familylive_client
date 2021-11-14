import React from 'react';
import { Text, View } from 'react-native';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';

const Dumb = (p) => {
  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Lists" />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          ></View>
        </>
      }
    />
  );
};

const Logic = () => {
  return {};
};

let Lists = stateful(Dumb, Logic);
Lists.displayName = 'Lists';

export default Lists;
