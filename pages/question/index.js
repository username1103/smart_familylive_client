import React, { useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Modal, TextInput,Alert } from 'react-native';
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
import goAnswer from '../goAnswer';

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
  },
});

const Dumb = (p) => {
  const { answers, question, questionNum, goAnswer } = p;
  const navigation = useNavigation();

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Question" />

          <View style={styles.container}>
            <View style={styles.question}>
              <Text
                style={styles.questionText}
              >{`#${questionNum} ${question.contents}`}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              {answers.map((answer) => (
                <View style={styles.elem}>
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{answer.name}</Text>
                  </View>

                  <TouchableOpacity 
                    onPress={() => Alert.alert ( null, "작성하시겠습니까?", [
                      { text: "아니요", onPress: () => console.log('no'), style: "cancel"},
                      { text: "예", onPress:() => navigation.navigate(PageName.GoAnswer)},
                      ], { cancelable: false } 
                    )}
                  >
                  <View style={styles.answer}>
                    <Text style={styles.answerText}>
                      {answer.answer?.contetns
                        ? answer.answer?.contetns
                        : '아직 입력되지 않았어요'}
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      }
    />
  );
};

const Logic = (p) => {
  const { groupQuestion, questionNum, question } = p.route.params;

  const navigation = useNavigation();
  const goAnswer = () => {
    navigation.navigate(PageName.GoAnswer);
  };

  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [answers, setAnswers] = useState([]);

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
    const userAnswers = setOrderUsers.map((user) => {
      const [userAnswer] = groupQuestion.answers.filter(
        (answer) => answer.author === user._id
      );
      if (userAnswer) {
        user.answer = userAnswer;
      }
      return user;
    });

    setAnswers(userAnswers);
  };

  useRefreshOnFocus({ isInitialized: answers !== [], refresh: init });

  return { answers, question, questionNum, goAnswer };
};

let Question = stateful(Dumb, Logic);
Question.displayName = 'Question';

export default Question;
