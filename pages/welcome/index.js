import React from 'react';
import { Dimensions, View, Image } from 'react-native';

const _width = Dimensions.get('window').width * 0.6;

export const Welcome = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={{ width: _width, height: _width }}
      />
    </View>
  );
};

Welcome.displayName = 'Welcome';
