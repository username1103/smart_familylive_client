import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Colors from '../../styles/colors';

const HeaderHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  } else if (Platform.OS === 'android') {
    return 56;
  } else {
    return 64;
  }
};

export default ({
  headerTitle,
  leftButton = false,
  onLeftButton,
  leftButtonComponent = null,
  rightButton = false,
  onRightButton,
  rightButtonComponent = null,
}) => {
  let textMargin = {};
  if (leftButton && rightButton) {
    textMargin = {};
  } else if (leftButton) {
    textMargin = {
      marginRight: 40,
    };
  } else if (rightButton) {
    textMargin = {
      marginLeft: 40,
    };
  }
  return (
    <View
      style={{
        height: HeaderHeight(),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: 10,
        }}
      >
        {leftButton ? (
          <TouchableOpacity onPress={onLeftButton} disabled={false}>
            {leftButtonComponent}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      <Text
        style={{
          flex: 1,
          fontSize: 20,

          fontWeight: 'bold',
          color: Colors.M3,
          textAlign: 'center',
        }}
      >
        {headerTitle}
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: 10,
        }}
      >
        {rightButton ? (
          <TouchableOpacity onPress={onRightButton} disabled={false}>
            {rightButtonComponent}
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};
