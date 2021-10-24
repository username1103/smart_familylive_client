import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NonModalPages from './non-modal-pages';
import PageName from './page-name';
import wrapper from './wrapper';
import { TestModal } from '../pages/test-modal';

const RootNav = createStackNavigator();

// Modal warpper
const wrappedComps = {
  TestModal: wrapper.modalWrap(TestModal),
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
    </N>
  );
};
