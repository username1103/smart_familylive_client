import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './main';
import PageName from './page-name';
import wrapper from './wrapper';

const wrappedComps = {
  Main: wrapper.commonWrapNoSafeAreaView({
    Component: Main,
    isStatusBarDark: true,
  }),
};

const NonModalPagesNav = createStackNavigator();

export default () => {
  const N = NonModalPagesNav.Navigator;
  const S = NonModalPagesNav.Screen;

  return (
    <N
      screenOptions={{
        headerShown: false,
      }}
    >
      <S name={PageName.Main} component={wrappedComps.Main} />
    </N>
  );
};
