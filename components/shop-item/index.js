import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width;

export default function ShopItem({
  image,
  name,
  price,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={{ width: width * 0.3, height: 200, margin: 3 }}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: width * 0.2, height: width * 0.2 }}
            source={{ uri: image }}
            resizeMode={'contain'}
          />
        </View>

        <View
          style={{
            flex: 0.4,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text>{name}</Text>
          <View
            style={{
              width: width * 0.33,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 18,
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../assets/coin.png')}
            />

            <Text>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
