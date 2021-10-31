import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './main';
import PageName from './page-name';
import wrapper from './wrapper';
import Entry from '../pages/entry';
import KakaoSignin from '../pages/kakao-sign-in';
import { useAuth } from '../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { Welcome } from '../pages/welcome';

const wrappedComps = {
  Entry: wrapper.commonWrap(Entry),
  KakaoSignIn: wrapper.commonWrap(KakaoSignin, '#fff'),
  Welcome: wrapper.commonWrap(Welcome),
  Main: wrapper.commonWrapNoSafeAreaView({
    Component: Main,
    isStatusBarDark: true,
  }),
};

const NonModalPagesNav = createStackNavigator();

export default () => {
  const N = NonModalPagesNav.Navigator;
  const S = NonModalPagesNav.Screen;

  const auth = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.status === 'authed') {
      navigation.reset({
        index: 0,
        routes: [{ name: PageName.Main }],
      });
    } else if (auth.status === 'not-authed' || auth.status === 'logout') {
      navigation.reset({
        index: 0,
        routes: [{ name: PageName.Entry }],
      });
    }
  }, [auth.status]);

  return (
    <N
      screenOptions={{
        headerShown: false,
      }}
    >
      <S name={PageName.Welcome} component={wrappedComps.Welcome} />

      <S name={PageName.Main} component={wrappedComps.Main} />

      <S name={PageName.Entry} component={wrappedComps.Entry} />
      <S name={PageName.KakaoSignin} component={wrappedComps.KakaoSignIn} />
    </N>
  );
};
