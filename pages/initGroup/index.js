import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';

export const InitGroup = () => {
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
          backgroundColor: Colors.M1,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
        }}
      >
        <View style={{ borderBottomWidth: 1, borderColor: Colors.DISABLE }}>
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              marginVertical: 10,
              marginHorizontal: 70,
            }}
          >
            설정 > 연결 코드 > 연결 코드를 복사해 가족에게 공유해주세요
          </Text>
        </View>
        <Button
          color={Colors.M3}
          title={'닫기'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

InitGroup.displayName = 'initGroup';
