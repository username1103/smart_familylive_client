import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

export default ({ headerTitle, backButton = false, goback }) => {
  return (
    <View
      style={{
        height: '5.5%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      {backButton && (
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <TouchableOpacity onPress={goback} disabled={false}>
            <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
          </TouchableOpacity>
        </View>
      )}
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          marginRight: backButton ? 40 : 0,
          fontWeight: 'bold',
          color: Colors.M3,
          textAlign: 'center',
        }}
      >
        {headerTitle}
      </Text>
    </View>
  );
};
