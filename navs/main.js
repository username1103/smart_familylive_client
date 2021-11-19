import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Fontisto,
} from '@expo/vector-icons';
import PageName from './page-name';
import Home from '../pages/home';
import Settings from '../pages/settings';
import Shop from '../pages/shop';
import Lists from '../pages/list';
import Colors from '../styles/colors';

const MainNav = createBottomTabNavigator();

const notFocusedSize = 24;
const focusedSize = 28;

export default () => {
  const N = MainNav.Navigator;
  const S = MainNav.Screen;

  return (
    <N
      sceneContainerStyle={{ backgroundColor: Colors.M1 }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.M1,
          borderTopColor: Colors.M1,
        },
        tabBarActiveBackgroundColor: Colors.M1,
        tabBarInactiveBackgroundColor: Colors.M1,
        tabBarShowLabel: false,
      }}
    >
      <S
        name={PageName.Home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-home" size={focusedSize} color={Colors.M2} />
            ) : (
              <Ionicons
                name="ios-home-outline"
                size={notFocusedSize}
                color={Colors.M2}
              />
            ),
        }}
      />
      <S
        name={PageName.QuestionList}
        component={Lists}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="list-sharp"
                size={focusedSize + 4}
                color={Colors.M2}
              />
            ) : (
              <Ionicons
                name="list-outline"
                size={notFocusedSize + 4}
                color={Colors.M2}
              />
            ),
        }}
      />
      <S
        name={PageName.Shop}
        component={Shop}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="shopping"
                size={focusedSize + 1}
                color={Colors.M2}
              />
            ) : (
              <MaterialCommunityIcons
                name="shopping-outline"
                size={notFocusedSize + 1}
                color={Colors.M2}
              />
            ),
        }}
      />
      <S
        name={PageName.Settings}
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Fontisto
                name="player-settings"
                size={focusedSize}
                color={Colors.M2}
              />
            ) : (
              <SimpleLineIcons
                name="settings"
                size={notFocusedSize}
                color={Colors.M2}
              />
            ),
        }}
      />
    </N>
  );
};
