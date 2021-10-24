import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

export default ({ backgroundColor = '#fff', components }) => {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
        {components ? components : <View />}
      </SafeAreaView>
    );
  } else if (Platform.OS === 'android') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 25,
          backgroundColor: backgroundColor,
        }}
      >
        {componets ? components : <View />}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
        {components ? components : <View />}
      </SafeAreaView>
    );
  }
};
