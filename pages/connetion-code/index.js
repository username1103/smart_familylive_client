import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import CustomHeader from '../../components/custom-header';
import { useGroup } from '../../hooks/group';
import { useUser } from '../../hooks/user';
import { useAuth } from '../../hooks/auth';
import { Ionicons } from '@expo/vector-icons';

const Dumb = (p) => {
  const { goBack, copyCode, groupCode } = p;

  return (
    <>
      <CustomHeader
        headerTitle="연결 코드"
        leftButton={true}
        onLeftButton={goBack}
        leftButtonComponent={
          <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
        }
      />
      <View
        style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: '7%',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>연결 코드</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>{groupCode}</Text>
          </View>
          <View style={{ marginHorizontal: 2 }}>
            <TouchableOpacity onPress={copyCode}>
              <Ionicons name="copy-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const groupHook = useGroup();
  const userHook = useUser();
  const authHook = useAuth();

  const [groupCode, setGroupCode] = useState('');

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const group = await groupHook.get({ groupId });

    setGroupCode(group.code);
  };

  useEffect(() => init(), []);

  const copyCode = () => {
    Clipboard.setString(groupCode);
    Alert.alert('복사되었습니다');
  };

  const goBack = async () => {
    navigation.goBack();
  };

  return {
    goBack,
    copyCode,
    groupCode,
  };
};

let ConnectionCode = stateful(Dumb, Logic);
ConnectionCode.displayName = 'ConnectionCode';

export default ConnectionCode;
