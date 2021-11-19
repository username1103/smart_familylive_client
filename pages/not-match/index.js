import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import CustomHeader from '../../components/custom-header';
import { useUser } from '../../hooks/user';
import { useAuth } from '../../hooks/auth';
import PageName from '../../navs/page-name';

const Dumb = (p) => {
  const { copyCode, userCode, goInsertCode } = p;

  return (
    <>
      <CustomHeader headerTitle="슬기로운 가족생활" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, marginVertical: 20 }}>당신의 코드</Text>
          <Text style={{ fontSize: 15 }}>{userCode}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
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
                marginVertical: 5,
              }}
              onPress={copyCode}
            >
              <Text>코드 복사하기</Text>
            </TouchableOpacity>
          </View>
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
                marginVertical: 5,
              }}
              onPress={goInsertCode}
            >
              <Text>다른 가족 코드 입력하기</Text>
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

  const [userCode, setUserCode] = useState('');

  const init = async () => {
    const user = await userHook.get({ userId: authHook.userId });

    setUserCode(user.code);
  };

  useEffect(() => init(), []);

  const copyCode = () => {
    Clipboard.setString(userCode);
    Alert.alert('복사되었습니다');
  };

  const goInsertCode = () => {
    navigation.navigate(PageName.InsertCode);
  };

  return {
    copyCode,
    userCode,
    goInsertCode,
  };
};

let NotMatch = stateful(Dumb, Logic);
NotMatch.displayName = 'NotMatch';

export default NotMatch;
