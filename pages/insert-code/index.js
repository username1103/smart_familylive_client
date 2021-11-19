import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/custom-header';
import { useUser } from '../../hooks/user';
import { useAuth } from '../../hooks/auth';
import { TextInput } from 'react-native-gesture-handler';

const Dumb = (p) => {
  const { goBack, code, changeCode, sendCode } = p;

  return (
    <>
      <CustomHeader
        headerTitle="슬기로운 가족생활"
        backButton={true}
        goback={goBack}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, marginVertical: 20 }}>
            다른 가족의 코드를 입력해주세요
          </Text>
        </View>
        <View
          style={{
            flex: 1,

            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{ fontSize: 20 }}
            placeholder={'코드를 입력해주세요'}
            value={code}
            onChangeText={changeCode}
          />
          <View>
            <TouchableOpacity
              style={{
                width: 300,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.M2,
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 50,
              }}
              onPress={sendCode}
            >
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const userHook = useUser();
  const authHook = useAuth();

  const [code, setCode] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const changeCode = (value) => {
    setCode(value.trim());
  };

  const sendCode = async () => {
    if (code.length !== 8) {
      return Alert.alert('코드는 8자리입니다');
    }

    try {
      await userHook.sendCode({ userId: authHook.userId, code });
    } catch (err) {
      if (err.response.status === 400) {
        return Alert.alert('존재하지 않거나 잘못된 코드입니다');
      }
    }
    const user = await userHook.get({ userId: authHook.userId });
    await authHook.updateInfo({
      isMatched: user.isMatched,
      needInit: !user.birthday,
      status: 'authed',
      userId: user._id,
    });
  };

  return {
    goBack,
    code,
    changeCode,
    sendCode,
  };
};

let InsertCode = stateful(Dumb, Logic);
InsertCode.displayName = 'InsertCode';

export default InsertCode;
