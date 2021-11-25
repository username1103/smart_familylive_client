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
import { SimpleLineIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import CustomHeader from '../../components/custom-header';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.M1,
    marginHorizontal: 15,
  },
  title: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: Colors.M4,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#d6ca1a',
  },
  footer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#1ad657',
  },
  elem: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7bca8',
    borderBottomWidth: 0.5,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 5,
    backgroundColor: Colors.M4,
    borderRadius: 5,
  },
  profile: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 16,
    paddingLeft: 10,
  },
  answer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 15,
  },
});

const Dumb = (p) => {
  const { goback } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader
            headerTitle="내 정보 수정"
            backButton={true}
            goback={goback}
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

  // useRefreshOnFocus({ isInitialized: familyinfo !== [], refresh: init });

  return { goback };
};

let EditUser = stateful(Dumb, Logic);
EditUser.displayName = 'EditUser';

export default EditUser;
