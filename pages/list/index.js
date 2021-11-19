import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';

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
                {questions.map((question) => (
                  <TouchableOpacity style={styles.questionLists}>
                    <View>
                      <Text style={styles.listText}>{question}</Text>
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
  const questions = [
    '#8. 이번 여름 휴가는 어디가 좋을까요?',
    '#7. 가족과 함께 했던 가장 재미있던 일은 무엇인가요?',
    '#6. 이번 겨울에 놀러가고 싶은 곳이 있을까요?',
    '#5. 나의 좌우명은 무엇인가요?',
    '#4. 요즘 생각나는 노래가 있나요?',
    '#3. 최근 가장 재미있게 봤던 영화는 무엇인가요?',
    '#2. 제일 좋아하는 음식은 무엇인가요?',
    '#1. 이번 생일에 받고 싶은 선물이 있을까요?',
  ];
  return { questions };
};

let Lists = stateful(Dumb, Logic);
Lists.displayName = 'Lists';

export default Lists;
