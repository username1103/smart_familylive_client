import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.M1,
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
  answerText: { 
    fontSize: 20,
    color: 'black',
  }
});

  const Dumb = (p, route) => {
    React.useEffect(() => {
      if (route.params?.text){

      }
    },[route.params?.text]);

    return (
      <SafeAreaPlatfrom
        backgroundColor={colors.M1}
        components={
          <>
            <CustomHeader headerTitle="오늘의 질문답변" />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}
            >
              <View style={styles.container}>
               <View style={styles.question}>
                  <Text style={styles.questionText}>
                      {' '}
                     8. 이번 여름 휴가는 어디가 좋을까요?{' '}
                  </Text>
                  </View>
                </View>
                <Text style={styles.answerText}> 이름 : {route.params?.text}</Text>
              </View>
          </>
        }
      />
    );
  };
  
  const Logic = () => {
    return {};
  };
  
  let Answers = stateful(Dumb, Logic);
  Answers.displayName = 'Answers';
  
  export default Answers;