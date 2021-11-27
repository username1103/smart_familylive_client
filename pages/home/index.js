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
  const { data, goQuestion, goShop, goEditUser, disableClick } = p;

  if (data === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader
            headerTitle="Home"
            leftButton={true}
            onLeftButton={goShop}
            leftButtonComponent={
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
            }
          />
          <View style={styles.container}>
            {data.myinfo._id ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: Colors.M2,
                  borderBottomWidth: 0.3,
                  paddingVertical: 15,
                }}
              >
                <View>
                  {data.myinfo.thumbnail !== '' ? (
                    <Image
                      style={{
                        width: 60,
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
                        width: 60,
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
                      <SimpleLineIcons name="user" size={40} color="black" />
                    </View>
                  )}
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17 }}>{data.myinfo.name}</Text>
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
                <View>
                  <TouchableOpacity
                    style={{
                      borderBottomColor: Colors.DISABLE,
                      borderBottomWidth: 0.5,
                    }}
                    onPress={user.onClick}
                    disabled={disableClick}
                  >
                    <Text style={{ color: Colors.DISABLE, fontSize: 13 }}>
                      콕 찌르기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          {data.question ? (
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <TouchableOpacity style={styles.answer} onPress={goQuestion}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.M4,
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    alignContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flex: 0.9,
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 0.05 * width, color: 'black' }}>
                      오늘의 질문
                    </Text>

                    <Text style={{ fontSize: 0.04 * width, color: 'black' }}>
                      {`#${data.questionNum} ${data.question.contents}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <AntDesign name="rightcircleo" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      }
    />
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [data, setData] = useState(null);

  const [disableClick, setDisableClick] = useState(false);

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
        onClick: async () => {
          setDisableClick(true);
          await userHook.click({ userId: user._id });
          navigation.navigate(PageName.AlertModal, {
            message: `${user.name}님을 콕 찔렀습니다.`,
          });
          setDisableClick(false);
        },
      }));

    const { groupQuestions } = await groupHook.getQuestions({ groupId });

    let homeGroupQuestion;
    let questionNum = 0;

    for (const [idx, question] of groupQuestions.entries()) {
      if (!question.allReplied) {
        homeGroupQuestion = question;
        questionNum = groupQuestions.length - idx;
      }
    }

    let homeQuestion;
    if (homeGroupQuestion) {
      if (homeGroupQuestion.questionType === 'normal') {
        homeQuestion = await groupHook.getQuestion({
          questionId: homeGroupQuestion.question,
        });
      } else {
        homeQuestion = await groupHook.getCustomQuestion({
          customQuestionid: homeGroupQuestion.question,
        });
      }
    }

    setData({
      groupQuestion: homeGroupQuestion,
      question: homeQuestion,
      group: groupinfo,
      myinfo: me[0],
      familyinfo: familyWithoutMe,
      questionNum,
    });
  };

  useRefreshOnFocus({ isInitialized: data !== null, refresh: init });

  useEffect(init, []);

  const goQuestion = () => {
    navigation.navigate(PageName.Question, {
      groupQuestion: data.groupQuestion,
      questionNum: data.questionNum,
      question: data.question,
    });
  };

  const goEditUser = () => {
    navigation.navigate(PageName.EditUser, {
      user: data.myinfo,
    });
  };

  const goShop = () => {
    navigation.navigate(PageName.Shop);
  };

  return {
    data,
    goQuestion,
    goEditUser,
    disableClick,
    goShop,
  };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
