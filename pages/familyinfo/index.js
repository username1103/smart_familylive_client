import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import CustomHeader from '../../components/custom-header';
import moment from 'moment';

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
  const { data, goBack, goEditUser, copyCode } = p;

  if (data === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <>
      <CustomHeader
        headerTitle="가족 정보"
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
            <Text style={{ fontSize: 15, fontWeight: '600' }}>연결 코드</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>{data.group.code}</Text>
          </View>
          <View style={{ marginHorizontal: 2 }}>
            <TouchableOpacity onPress={copyCode}>
              <Ionicons name="copy-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
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
            <Text style={{ fontSize: 15, fontWeight: '600' }}>보유한 코인</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 45, height: 45 }}
                source={require('../../assets/coin.png')}
              />
              <Text>{data.group.coin}</Text>
            </View>
          </View>
        </View>
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
            <Text style={{ fontSize: 15, fontWeight: '600' }}>시작 날짜</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {moment(data.group.createdAt).format('YYYY년 MM월 DD일')}
            </Text>
          </View>
        </View>
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
            <Text style={{ fontSize: 15, fontWeight: '600' }}>
              질문 받는 시간
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>{data.group.questionTime}</Text>
          </View>
        </View>

        <View style={styles.container}>
          {data.myinfo._id ? (
            <View
              style={{
                width: width * 0.95,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: Colors.M2,
                borderBottomWidth: 0.3,
                paddingVertical: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={data.myinfo.goInfo}
              >
                <View>
                  {data.myinfo.thumbnail !== '' ? (
                    <Image
                      style={{
                        width: 50,
                        aspectRatio: 1,
                        backgroundColor: Colors.M1,
                        borderRadius: 100,
                        borderWidth: 0.3,
                        borderColor: Colors.DISABLE,
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri: data.myinfo.thumbnail,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 50,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        backgroundColor: Colors.M1,
                        borderRadius: 100,
                        borderWidth: 0.3,
                        borderColor: Colors.DISABLE,
                      }}
                    >
                      <SimpleLineIcons name="user" size={35} color="black" />
                    </View>
                  )}
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontSize: 15 }}>{data.myinfo.name}</Text>
                  {data.myinfo.statusMessage !== '' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        color: Colors.DISABLE,
                      }}
                    >
                      {data.myinfo.statusMessage}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goEditUser}>
                <FontAwesome5 name="user-edit" size={22} color={Colors.M4} />
              </TouchableOpacity>
            </View>
          ) : null}

          {data.familyinfo.map((user) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: Colors.M2,
                borderBottomWidth: 0.3,
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={user.goInfo}
              >
                <View>
                  {user.thumbnail !== '' ? (
                    <Image
                      style={{
                        width: 50,
                        aspectRatio: 1,

                        borderRadius: 100,
                        borderWidth: 0.3,
                        borderColor: Colors.DISABLE,
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri: user.thumbnail,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 50,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.M1,
                        borderRadius: 100,
                        borderWidth: 0.3,
                        borderColor: Colors.DISABLE,
                      }}
                    >
                      <SimpleLineIcons name="user" size={35} color="black" />
                    </View>
                  )}
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontSize: 15 }}>{user.name}</Text>
                  {user.statusMessage !== '' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 3,
                        color: Colors.DISABLE,
                      }}
                    >
                      {user.statusMessage}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [data, setData] = useState(null);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const groupinfo = await groupHook.get({ groupId });

    const { groupMembers } = await groupHook.getMembers({ groupId });

    const users = await Promise.all(
      groupMembers.map((groupMember) =>
        userHook.get({ userId: groupMember.user })
      )
    );

    const me = users.filter((user) => user._id === authHook.userId);
    const familyWithoutMe = users
      .filter((user) => user._id !== authHook.userId)
      .map((user) => ({
        ...user,
        goInfo: () => {
          navigation.navigate(PageName.UserInfo, {
            user,
          });
        },
      }));

    setData({
      group: groupinfo,
      myinfo: {
        ...me[0],
        goInfo: () => {
          navigation.navigate(PageName.UserInfo, {
            user: me[0],
          });
        },
      },
      familyinfo: familyWithoutMe,
    });
  };

  useRefreshOnFocus({ isInitialized: data !== null, refresh: init });

  useEffect(init, []);

  const goEditUser = () => {
    navigation.navigate(PageName.EditUser, {
      user: data.myinfo,
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const copyCode = () => {
    Clipboard.setString(data.group.code);
    navigation.navigate(PageName.AlertModal, { message: '복사되었습니다.' });
  };
  return {
    data,
    goBack,
    goEditUser,
    copyCode,
  };
};

let FamilyInfo = stateful(Dumb, Logic);
FamilyInfo.displayName = 'FamilyInfo';

export default FamilyInfo;
