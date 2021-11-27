import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';

const _width = Dimensions.get('screen').width;

export const AlertModal = (p) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: _width * 0.8,
          backgroundColor: Colors.M1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}
      >
        <View
          style={{
            width: '100%',
            paddingVertical: 40,
            borderBottomWidth: 0.3,
            borderBottomColor: Colors.DISABLE,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '600',
            }}
          >
            {p.route.params.message}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 15, color: Colors.M2, fontWeight: '600' }}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AlertModal.displayName = 'AlertModal';
