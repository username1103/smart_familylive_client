import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

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
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      {leftButton && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <TouchableOpacity onPress={onLeftButton} disabled={false}>
            {leftButtonComponent}
          </TouchableOpacity>
        </View>
      )}
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          ...textMargin,
          fontWeight: 'bold',
          color: Colors.M3,
          textAlign: 'center',
        }}
      >
        {headerTitle}
      </Text>
      {rightButton && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={onRightButton} disabled={false}>
            {rightButtonComponent}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
