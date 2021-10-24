import React from 'react';
import { Text, View } from 'react-native';
import stateful from '../../utils/stateful';

const Dumb = (p) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>This is Shop</Text>
      </View>
    </>
  );
};

const Logic = () => {
  return {};
};

let Shop = stateful(Dumb, Logic);
Shop.displayName = 'Shop';

export default Shop;
