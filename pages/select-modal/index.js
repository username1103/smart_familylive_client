import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';

const _width = Dimensions.get('screen').width;

export const SelectModal = (p) => {
  const { message, onSuccess, goBack = false } = p.route.params;

  const navigation = useNavigation();

  const _onSuccess = async () => {
    await onSuccess();
    if (goBack) {
      navigation.goBack();
    }
  };
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
            {message}
          </Text>
        </View>
        <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 15, color: 'gray', fontWeight: '600' }}>
              취소
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={_onSuccess}
          >
            <Text style={{ fontSize: 15, color: Colors.M2, fontWeight: '600' }}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SelectModal.displayName = 'SelectModal';
