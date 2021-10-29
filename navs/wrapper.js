import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import SafeAreaPlatform from '../components/safe-area-platfrom';
import Colors from '../styles/colors';

const FocusAwareStatusBar = (props) => {
  const isFoused = useIsFocused();

  return isFoused ? <StatusBar {...props} /> : null;
};

const commonWrap = (Component, backgroundColor = Colors.M1) => {
  const NewComp = (p) => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaPlatform
          backgroundColor={backgroundColor}
          components={
            <>
              <FocusAwareStatusBar
                style="dark"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
              />
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'padding'}
                enabled
              >
                <Component {...p} />
              </KeyboardAvoidingView>
            </>
          }
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaPlatform
          backgroundColor={backgroundColor}
          components={
            <>
              <FocusAwareStatusBar
                style="dark"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
              />
              <KeyboardAvoidingView style={{ flex: 1 }}>
                <Component {...p} />
              </KeyboardAvoidingView>
            </>
          }
        />
      );
    } else {
      return (
        <SafeAreaPlatform
          backgroundColor={backgroundColor}
          components={
            <>
              <FocusAwareStatusBar
                style="dark"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
              />
              <KeyboardAvoidingView style={{ flex: 1 }}>
                <Component {...p} />
              </KeyboardAvoidingView>
            </>
          }
        />
      );
    }
  };

  NewComp.displayName = Component.displayName || Component.name;

  return NewComp;
};

const commonWrapNoSafeAreaView = ({ Component, isStatusBarDark = false }) => {
  const statusBarStyle = isStatusBarDark ? 'dark' : 'light';

  const NewComp = (p) => {
    if (Platform.OS === 'ios') {
      return (
        <>
          <FocusAwareStatusBar
            style={statusBarStyle}
            hidden={false}
            translucent={true}
            backgroundColor="transparent"
          />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
            enabled
          >
            <Component {...p} />
          </KeyboardAvoidingView>
        </>
      );
    } else if (Platform.OS === 'android') {
      return (
        <>
          <FocusAwareStatusBar
            style={statusBarStyle}
            hidden={false}
            translucent={true}
            backgroundColor="transparent"
          />
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <Component {...p} />
          </KeyboardAvoidingView>
        </>
      );
    } else {
      return (
        <>
          <FocusAwareStatusBar
            style={statusBarStyle}
            hidden={false}
            translucent={true}
            backgroundColor="transparent"
          />
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <Component {...p} />
          </KeyboardAvoidingView>
        </>
      );
    }
  };
  NewComp.displayName = Component.displayName || Component.name;

  return NewComp;
};

const modalWrap = (Component) => {
  const NewComp = (p) => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
            enabled
          >
            <Component {...p} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    } else if (Platform.OS === 'android') {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 25,
            backgroundColor: 'transparent',
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <Component {...p} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <Component {...p} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  };
  NewComp.displayName = Component.displayName || Component.name;

  return NewComp;
};

export default {
  commonWrap,
  commonWrapNoSafeAreaView,
  modalWrap,
};
