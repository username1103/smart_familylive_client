import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import { useGroup } from '../../hooks/group';
import pageName from '../../navs/page-name';
import { useAuth } from '../../hooks/auth';
import { Ionicons } from '@expo/vector-icons';

const Dumb = (p) => {
  const { goBack, setUserAnswer, userAnswer, submit, question, questionNum } =
    p;
  return (
    <>
      <CustomHeader
        headerTitle="Answer"
        leftButton={true}
        onLeftButton={goBack}
        leftButtonComponent={
          <Ionicons name="arrow-back-outline" size={30} color={colors.M3} />
        }
      />

      <View style={styles.container}>
        <View style={styles.question}>
          <Text
            style={{ fontSize: 16 }}
          >{`#${questionNum} ${question.contents}`}</Text>
        </View>
        <TextInput
          placeholder="답변을 작성해주세요."
          onChangeText={setUserAnswer}
          returnKeyType="done"
          value={userAnswer}
          multiline={true}
          style={styles.answerInput}
          textAlignVertical={'top'}
        ></TextInput>
        <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={submit}>
          <View
            style={{
              marginVertical: 10,
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              borderColor: colors.M2,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15 }}>완료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Logic = (p) => {
  const { groupQuestion, answer, question, questionNum } = p.route.params;

  const navigation = useNavigation();

  const authHook = useAuth();
  const groupHook = useGroup();

  const [userAnswer, setUserAnswer] = useState('');

  const init = async () => {
    setUserAnswer(answer ? answer.contents : '');
  };

  useEffect(init, []);

  const goBack = () => {
    navigation.goBack();
  };

  const submit = async () => {
    if (userAnswer.trim() === '') {
      return navigation.navigate(pageName.AlertModal, {
        message: '답변을 입력해주세요',
      });
    }

    await groupHook.replyQuestion({
      groupQuestionId: groupQuestion._id,
      userId: authHook.userId,
      answer: userAnswer.trim(),
    });
    navigation.goBack();
  };

  return {
    goBack,
    setUserAnswer,
    userAnswer,
    submit,
    question,
    questionNum,
  };
};

const styles = StyleSheet.create({
  modal: {
    flex: 5,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.M1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  answerInput: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    fontSize: 15,
    flex: 1,
  },
});

let Answer = stateful(Dumb, Logic);
Answer.displayName = 'Answer';

export default Answer;
