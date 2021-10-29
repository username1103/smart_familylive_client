import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import LoginButton from '../../components/login-button';
import PageName from '../../navs/page-name';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';

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
      <LoginButton
        title="카카오 로그인"
        titleColor={'black'}
        onPress={kakaoSignin}
        backgroundColor={'#FFE812'}
        accessible={true}
        icon={require('../../assets/kakao-talk.png')}
      />
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
