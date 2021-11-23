import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useGroup } from '../../hooks/group';
import { useUser } from '../../hooks/user';
import { useAuth } from '../../hooks/auth';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import { useNavigation } from '@react-navigation/native';
import PageName from '../../navs/page-name';

const _width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.M1,
  },
  questionLists: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.M4,
    marginTop: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    width: _width * 0.9,
  },
  listText: {
    fontSize: 16,
    color: 'black',
  },
});

const Dumb = (p) => {
  const { questions } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Lists" />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {questions.map((question, idx) => (
                  <TouchableOpacity
                    style={styles.questionLists}
                    onPress={question.onPress}
                  >
                    <View>
                      <Text style={styles.listText}>{`#${
                        questions.length - idx
                      }. ${question.contents}`}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </>
      }
    />
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const authHook = useAuth();
  const groupHook = useGroup();
  const userHook = useUser();

  const [questions, setQuestions] = useState([]);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const { groupQuestions } = await groupHook.getQuestions({ groupId });

    const validQuestions = [];
    for (const question of groupQuestions.reverse()) {
      validQuestions.push(question);
      if (!question.allReplied) {
        break;
      }
    }

    const questions = [];
    await validQuestions
      .reverse()
      .reduce(async (prevPromise, question, idx) => {
        await prevPromise;
        let data;
        if (question.questionType === 'normal') {
          data = await groupHook.getQuestion({
            questionId: question.question,
          });
        } else {
          data = await groupHook.getCustomQuestion({
            customQuestionid: question.question,
          });
        }
        questions.push({
          ...data,
          onPress: () =>
            navigation.navigate(PageName.Question, {
              groupQuestion: question,
              question: data,
              questionNum: idx + 1,
            }),
        });
      }, Promise.resolve());

    setQuestions(questions);
  };

  useRefreshOnFocus({ isInitialized: questions !== [], refresh: init });

  return { questions };
};

let Lists = stateful(Dumb, Logic);
Lists.displayName = 'Lists';

export default Lists;
