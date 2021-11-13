import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import config from '../../config';
import { useAuth } from '../../hooks/auth';

const KakaoSignin = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  const LogInProgress = async (event) => {
    navigation.goBack();

    let result = JSON.parse(event.nativeEvent.data);
    const accessToken = result.access.token;
    const refreshToken = result.refresh.token;

    await auth.saveTokens({
      userId: result.userId,
      needInit: result.needInit,
      accessToken,
      refreshToken,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.apiKey}&response_type=code&redirect_uri=${config.apiAddr}/v1/auth/kakao/login`,
        }}
        injectedJavaScript={
          '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();'
        }
        onMessage={LogInProgress}
      />
    </View>
  );
};

export default KakaoSignin;
