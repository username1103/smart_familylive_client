import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import PageName from '../../navs/page-name';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.M1,
    alignItems: 'flex-end',
  },
  question: {
    borderRadius: 10,
    backgroundColor: '#ffb486',
    marginTop: 10,
    paddingVertical: 25,
    paddingHorizontal: 25,
    alignSelf: "stretch",
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: 'black',
  },
  answerInput: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignSelf: "stretch",
  },
  answerText: {
    fontSize: 16,
    color: 'black',
  },
  goAnswer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
   }
});

const STORAGE_KEY = '@answer';

const Dumb = (p) => {
  const { goTodayAnswer } = p;
  const navigation = useNavigation();

  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    loadAnswer();
  }, []);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveAnswer = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadAnswer = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setAnswer(JSON.parse(s));
  };
  const addAnswer = async () => {
    if (text === '') {
      return;
    }
    const newAnswer = {
      ...answer,
      [Date.now()]: { text, working },
    };
    setAnswer(newAnswer);
    await saveAnswer(newAnswer);
    setAnswer('');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>
            {' '}
            8. 이번 여름 휴가는 어디가 좋을까요?{' '}
          </Text>
        </View>
        <TextInput
          onSubmitEditing={addAnswer}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={'답변을 작성해주세요.'}
          multiline={true}
          style={styles.answerInput}
        />
        <TouchableOpacity style={styles.goAnswer} onPress={() => {navigation.navigate(PageName.TodayAnswer), {text:text}}}>
          <View style={styles.goAnswer}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}> 확인 </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Logic = (p) => {
  const navigation = useNavigation();
  const goTodayAnswer = () => {
    navigation.navigate(PageName.TodayAnswer);
  };
  return {};
};

let QNA = stateful(Dumb, Logic);
QNA.displayName = 'Q&A';

export default QNA;
