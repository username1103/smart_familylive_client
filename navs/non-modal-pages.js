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
import BloodType from '../pages/bloodType';
import Gender from '../pages/gender';
import Birthday from '../pages/birthday';
import Name from '../pages/name';
import NotMatch from '../pages/not-match';
import InsertCode from '../pages/insert-code';
import Question from '../pages/question';
import EditUser from '../pages/edit-user';
import GoAnswer from '../pages/goAnswer';
import UserInfo from '../pages/user-info.js';
import FamilyInfo from '../pages/familyinfo';
import FamilyItem from '../pages/family-item';

const wrappedComps = {
  Entry: wrapper.commonWrap(Entry),
  KakaoSignIn: wrapper.commonWrap(KakaoSignin, '#fff'),
  Welcome: wrapper.commonWrap(Welcome),
  Main: wrapper.commonWrapNoSafeAreaView({
    Component: Main,
    isStatusBarDark: true,
  }),
  Name: wrapper.commonWrap(Name),
  BloodType: wrapper.commonWrap(BloodType),
  Gender: wrapper.commonWrap(Gender),
  Birthday: wrapper.commonWrap(Birthday),

  NotMatch: wrapper.commonWrap(NotMatch),
  InsertCode: wrapper.commonWrap(InsertCode),

  Question: wrapper.commonWrap(Question),
  EditUser: wrapper.commonWrap(EditUser),
  GoAnswer: wrapper.commonWrap(GoAnswer),
  UserInfo: wrapper.commonWrap(UserInfo),
  FamilyInfo: wrapper.commonWrap(FamilyInfo),
  FamilyItem: wrapper.commonWrap(FamilyItem),
};

const NonModalPagesNav = createStackNavigator();

export default () => {
  const N = NonModalPagesNav.Navigator;
  const S = NonModalPagesNav.Screen;

  const navigation = useNavigation();
  const authHook = useAuth();

  useEffect(async () => {
    if (authHook.status === 'authed') {
      if (authHook.needInit) {
        return navigation.reset({
          index: 0,
          routes: [{ name: PageName.Name }],
        });
      }
      if (!authHook.isMatched) {
        return navigation.reset({
          index: 0,
          routes: [{ name: PageName.NotMatch }],
        });
      }
      navigation.reset({
        index: 0,
        routes: [{ name: PageName.Main }],
      });
    } else if (
      authHook.status === 'not-authed' ||
      authHook.status === 'logout'
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: PageName.Entry }],
      });
    }
  }, [authHook.status, authHook.isMatched, authHook.needInit]);

  return (
    <N
      screenOptions={{
        headerShown: false,
      }}
    >
      <S name={PageName.Welcome} component={wrappedComps.Welcome} />

      <S name={PageName.Main} component={wrappedComps.Main} />

      <S name={PageName.Entry} component={wrappedComps.Entry} />

      <S name={PageName.Name} component={wrappedComps.Name} />
      <S name={PageName.BloodType} component={wrappedComps.BloodType} />
      <S name={PageName.Gender} component={wrappedComps.Gender} />
      <S name={PageName.Birthday} component={wrappedComps.Birthday} />

      <S name={PageName.NotMatch} component={wrappedComps.NotMatch} />
      <S name={PageName.InsertCode} component={wrappedComps.InsertCode} />

      <S name={PageName.Question} component={wrappedComps.Question} />
      <S name={PageName.EditUser} component={wrappedComps.EditUser} />
      <S name={PageName.GoAnswer} component={wrappedComps.GoAnswer} />
      <S name={PageName.UserInfo} component={wrappedComps.UserInfo} />
      <S name={PageName.FamilyInfo} component={wrappedComps.FamilyInfo} />
      <S name={PageName.FamilyItem} component={wrappedComps.FamilyItem} />
    </N>
  );
};
