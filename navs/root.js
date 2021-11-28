import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NonModalPages from './non-modal-pages';
import PageName from './page-name';
import wrapper from './wrapper';
import { TestModal } from '../pages/test-modal';
import KakaoSignin from '../pages/kakao-sign-in';
import { InitGroup } from '../pages/initGroup';
import { AlertModal } from '../pages/alert-modal';
import { SelectModal } from '../pages/select-modal';
import { BottomSelectModal } from '../pages/bottom-select-modal';
import { CustomQuestionModal } from '../pages/custom-qusetion-modal';
import { ChangeQuestionTimeModal } from '../pages/change-questiontime-modal';

const RootNav = createStackNavigator();

// Modal warpper
const wrappedComps = {
  TestModal: wrapper.modalWrap(TestModal),
  KakaoSignin: wrapper.modalWrap(KakaoSignin),
  InitGroup: wrapper.modalWrap(InitGroup),
  AlertModal: wrapper.modalWrap(AlertModal),
  SelectModal: wrapper.modalWrap(SelectModal),
  BottomSelectModal: wrapper.modalWrap(BottomSelectModal),
  CustomQuestionModal: wrapper.modalWrap(CustomQuestionModal),
  ChangeQuestionTimeModal: wrapper.modalWrap(ChangeQuestionTimeModal),
};

export default () => {
  const N = RootNav.Navigator;
  const S = RootNav.Screen;

  return (
    <N
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        presentation: 'transparentModal',
      }}
    >
      {/* 꼭 있어야 하는 비모달 페이지 */}
      <S name={PageName.NonModalPages} component={NonModalPages} />

      {/* 모달 목록 */}
      <S name={PageName.TestModal} component={wrappedComps.TestModal} />
      <S name={PageName.KakaoSignin} component={wrappedComps.KakaoSignin} />
      <S name={PageName.InitGroup} component={wrappedComps.InitGroup} />
      <S name={PageName.AlertModal} component={wrappedComps.AlertModal} />
      <S name={PageName.SelectModal} component={wrappedComps.SelectModal} />
      <S
        name={PageName.BottomSelectModal}
        component={wrappedComps.BottomSelectModal}
      />
      <S
        name={PageName.CustomQuestionModal}
        component={wrappedComps.CustomQuestionModal}
      />
      <S
        name={PageName.ChangeQuestionTimeModal}
        component={wrappedComps.ChangeQuestionTimeModal}
      />
    </N>
  );
};
