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
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import CustomHeader from '../../components/custom-header';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.M1,
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
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7bca8',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 8,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 15,
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
  const { users, goQuestion, question, questionNum } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Home" />

          <View style={styles.container}>
            {users.map((user) => (
              <View style={styles.elem}>
                <View style={styles.userInfo}>
                  <View style={styles.profile}>
                    {user.thumbnail !== '' ? (
                      <Image
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: user.thumbnail,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: Colors.M1,
                          borderRadius: 50,
                          borderWidth: 0.3,
                          borderColor: Colors.DISABLE,
                        }}
                      >
                        <SimpleLineIcons name="user" size={30} color="black" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.name}>{user.name}</Text>
                </View>
                {user.statusMessage !== '' ? (
                  <View style={styles.userComment}>
                    <Text>{user.statusMessage}</Text>
                  </View>
                ) : (
                  <></>
                )}
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
  const [users, setUsers] = useState([]);

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
    const familyWithoutMe = users.filter(
      (user) => user._id !== authHook.userId
    );

    const setOrderUsers = [...me, ...familyWithoutMe];

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
    setUsers(setOrderUsers);
  };

  const goQuestion = () => {
    navigation.navigate(PageName.Question, {
      groupQuestion,
      questionNum,
      question,
    });
  };

  useRefreshOnFocus({ isInitialized: users !== [], refresh: init });

  return { users, goQuestion, question, questionNum };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
