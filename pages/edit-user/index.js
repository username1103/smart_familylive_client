import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { Ionicons } from '@expo/vector-icons';

import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import CustomHeader from '../../components/custom-header';

const width = Dimensions.get('window').width;

const Dumb = (p) => {
  const { goback, confirm } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader
            headerTitle="내 정보 수정"
            leftButton={true}
            onLeftButton={goback}
            leftButtonComponent={
              <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
            }
            rightButton={true}
            onRightButton={confirm}
            rightButtonComponent={
              <Text style={{ color: Colors.M3, fontSize: 18 }}>완료</Text>
            }
          />
        </>
      }
    />
  );
};

const Logic = (p) => {
  console.log(p.route.params);
  const navigation = useNavigation();
  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const init = async () => {};

  const goback = () => {
    navigation.goBack();
  };

  const confirm = () => {
    navigation.goBack();
  };

  return { goback, confirm };
};

let EditUser = stateful(Dumb, Logic);
EditUser.displayName = 'EditUser';

export default EditUser;
