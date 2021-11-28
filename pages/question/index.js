import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import { useNavigation } from '@react-navigation/native';
import PageName from '../../navs/page-name';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.M1,
  },
  question: {
    borderRadius: 10,
    backgroundColor: '#ffb486',
    marginTop: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: 'black',
  },
  answer: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 15,
    color: 'black',
  },
  elem: {
    paddingVertical: 20,
    marginHorizontal: 5,
  },
  userInfo: {
    margin: 5,
    justifyContent: 'center',
  },
  userComment: {
    padding: 8,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  name: {
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: '600',
  },
});

const Dumb = (p) => {
  const { data, question, questionNum, goback } = p;

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
        headerTitle="Question"
        leftButton={true}
        onLeftButton={goback}
        leftButtonComponent={
          <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
        }
      />

      <View style={styles.container}>
        <View style={styles.question}>
          <Text
            style={styles.questionText}
          >{`#${questionNum} ${question.contents}`}</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {data.userAnswers.map((user, idx) => (
            <View style={styles.elem} key={user._id}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}</Text>
              </View>

              <TouchableOpacity onPress={user.onPress} disabled={idx !== 0}>
                <View style={styles.answer}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: !user.answer || !data.isReplied ? 'gray' : '#000',
                    }}
                  >
                    {!user.answer
                      ? '아직 입력되지 않았어요'
                      : data.isReplied
                      ? user.answer.contents
                      : '자신의 답변을 작성해야 확인 가능합니다'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const Logic = (p) => {
  const { groupQuestion, questionNum, question } = p.route.params;

  const navigation = useNavigation();

  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [data, setData] = useState(null);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });
    const groupQuestioninfo = await groupHook.getGroupQuestion({
      groupQuestionId: groupQuestion._id,
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

    const myAnswer = me.map((user) => {
      const [userAnswer] = groupQuestioninfo.answers.filter(
        (answer) => answer.author === user._id
      );

      return {
        ...user,
        answer: userAnswer,
        onPress: () =>
          navigation.navigate(PageName.SelectModal, {
            message: userAnswer
              ? '답변을 수정하시겠어요?'
              : '답변을 작성하시겠어요?',
            onSuccess: () =>
              navigation.navigate(PageName.GoAnswer, {
                question,
                questionNum,
                groupQuestion: groupQuestioninfo,
                answer: userAnswer,
              }),
          }),
      };
    });

    const isReplied = myAnswer[0].answer ? true : false;

    const familyAnswers = familyWithoutMe.map((user) => {
      const [userAnswer] = groupQuestioninfo.answers.filter(
        (answer) => answer.author === user._id
      );

      return {
        ...user,
        answer: userAnswer,
        onPress: () => {},
      };
    });

    setData({
      userAnswers: [...myAnswer, ...familyAnswers],
      isReplied,
    });
  };

  const goback = () => {
    navigation.goBack();
  };

  useRefreshOnFocus({ isInitialized: data !== null, refresh: init });

  useEffect(init, []);

  return { data, question, questionNum, goback };
};

let Question = stateful(Dumb, Logic);
Question.displayName = 'Question';

export default Question;
