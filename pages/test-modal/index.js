import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const TestModal = () => {
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
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          테스트 모달
        </Text>
        <Button title={'닫기'} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

TestModal.displayName = 'TestModal';
