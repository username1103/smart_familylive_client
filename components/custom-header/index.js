import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';

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
        height: '5.5%',
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
