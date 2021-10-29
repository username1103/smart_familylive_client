import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

export default ({
  title,
  titleColor,
  onPress,
  accessible,
  icon,
  backgroundColor = 'transparent',
}) => {
  return (
    <View style={{ borderRadius: 13, overflow: 'hidden', marginVertical: 5 }}>
      <TouchableOpacity onPress={onPress} disabled={!accessible}>
        <View
          style={{
            flexDirection: 'row',
            height: 45,
            width: 350,
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor,
          }}
        >
          {icon ? (
            <Image source={icon} style={{ marginRight: 20 }} />
          ) : undefined}
          <Text style={{ fontSize: 20, color: titleColor }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
