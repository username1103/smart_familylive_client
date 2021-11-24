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
  const { goQuestion, question, questionNum, familyinfo, myinfo } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Home" />
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '13%',
                borderBottomColor: Colors.M2,
                borderBottomWidth: 0.3,
              }}
            >
              <View>
                {myinfo.thumbnail !== '' ? (
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: myinfo.thumbnail,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: Colors.M1,
                      borderRadius: 15,
                      borderWidth: 0.3,
                      borderColor: Colors.DISABLE,
                    }}
                  >
                    <SimpleLineIcons name="user" size={45} color="black" />
                  </View>
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 17 }}>{myinfo.name}</Text>
                {myinfo.statusMessage !== '' ? (
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 3,
                      color: Colors.DISABLE,
                    }}
                  >
                    {myinfo.statusMessage}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity>
                <FontAwesome5 name="user-edit" size={24} color={Colors.M4} />
              </TouchableOpacity>
            </View>

            {familyinfo.map((user) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '11%',
                  borderBottomColor: Colors.M2,
                  borderBottomWidth: 0.3,
                }}
              >
                <View>
                  {myinfo.thumbnail !== '' ? (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                      }}
                      source={{
                        uri: user.thumbnail,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        backgroundColor: Colors.M1,
                        borderRadius: 15,
                        borderWidth: 0.3,
                        borderColor: Colors.DISABLE,
                      }}
                    >
                      <SimpleLineIcons name="user" size={40} color="black" />
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
                  >
                    <Text style={{ color: Colors.DISABLE }}>콕 찌르기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          {question ? (
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
                      {`#${questionNum} ${question.contents}`}
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

  const [question, setQuestion] = useState();
  const [questionNum, setQuestionNum] = useState(0);
  const [groupQuestion, setGroupQuestion] = useState();
  const [myinfo, setMyinfo] = useState({});
  const [familyinfo, setFamilyinfo] = useState([]);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

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
          await userHook.click({ userId: user._id });
        },
      }));

    const { groupQuestions } = await groupHook.getQuestions({ groupId });

    let homeGroupQuestion;

    for (const [idx, question] of groupQuestions.entries()) {
      if (!question.allReplied) {
        homeGroupQuestion = question;
        setQuestionNum(groupQuestions.length - idx);
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

    setGroupQuestion(homeGroupQuestion);
    setQuestion(homeQuestion);

    setMyinfo(me[0]);
    setFamilyinfo(familyWithoutMe);
  };

  const goQuestion = () => {
    navigation.navigate(PageName.Question, {
      groupQuestion,
      questionNum,
      question,
    });
  };

  useRefreshOnFocus({ isInitialized: familyinfo !== [], refresh: init });

  return { goQuestion, question, questionNum, myinfo, familyinfo };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
