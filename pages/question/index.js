import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.M1,
  },
  question: {
    flex: 0.1,
    borderRadius: 10,
    backgroundColor: '#ffb486',
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: 'black',
  },
  answerInput: {
    flex: 0.1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  answerText: {
    fontSize: 16,
    color: 'black',
  },
});

const STORAGE_KEY = '@answer';

const Dumb = (p) => {
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
          style={styles.answerInput}
        />
      </View>
    </>
  );
};

const Logic = () => {
  return {};
};

let QNA = stateful(Dumb, Logic);
QNA.displayName = 'Q&A';

export default QNA;
