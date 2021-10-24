import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export default ({ title, titleColor, onPress, accessible }) => {
  return (
    <View style={{ borderRadius: 13, overflow: 'hidden' }}>
      <TouchableOpacity onPress={onPress} disabled={!accessible}>
        <View
          style={{
            flexDirection: 'row',
            height: 26,
            borderRadius: 13,
            paddingLeft: 10,
            paddingRight: 7,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 13, color: titleColor }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
