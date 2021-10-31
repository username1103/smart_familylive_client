import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PageName from '../../navs/page-name';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';

const _width = Dimensions.get('window').width * 0.6;

const Dumb = ({ kakaoSignin }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.M1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: _width, height: _width }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={kakaoSignin} disabled={false}>
          <Image
            source={require('../../assets/kakao-login.png')}
            style={{ width: 350 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Logic = () => {
  const navigation = useNavigation();

  const kakaoSignin = () => {
    navigation.navigate(PageName.KakaoSignin);
  };

  return {
    kakaoSignin,
  };
};

export default stateful(Dumb, Logic);
