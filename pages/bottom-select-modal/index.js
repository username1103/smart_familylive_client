import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from '../../styles/colors';

export const BottomSelectModal = (p) => {
  const { options } = p.route.params;

  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: 10,
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          backgroundColor: colors.M1,
          borderRadius: 15,
          overflow: 'hidden',
        }}
      >
        {options.map((option) => {
          const { style, label, onPress, goback } = option;

          const _onPress = () => {
            onPress();
            if (goback) {
              navigation.goBack();
            }
          };

          return (
            <TouchableOpacity onPress={_onPress} key={label}>
              <View
                style={{
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderColor: colors.DISABLE,
                }}
              >
                <Text style={style}>{label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          backgroundColor: colors.M1,
          borderRadius: 15,
          overflow: 'hidden',
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.3,
              borderColor: colors.DISABLE,
            }}
          >
            <Text style={{ color: '#000', fontSize: 15 }}>닫기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

BottomSelectModal.displayName = 'BottomSelectModal';
