import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
    backgroundColor: '#ffb486',
    marginTop: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  listText: {
    fontSize : 16,
    color: "black",
  }
});

const Dumb = (p) => {
  return (
    <>
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 8. 이번 여름 휴가는 어디가 좋을까요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 7. 가족과 함께 했던 가장 재미있던 일은 무엇인가요?</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 6. 이번 겨울에 놀러가고 싶은 곳이 있을까요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 5. 나의 좌우명은 무엇인가요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 4. 요즘 생각나는 노래가 있나요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 3. 최근 가장 재미있게 봤던 영화는 무엇인가요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 2. 제일 좋아하는 음식은 무엇인가요? </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.questionLists}>
      <View>
        <Text style={styles.listText}> 1. 이번 생일에 받고 싶은 선물이 있을까요? </Text>
      </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
    </>
  );
};

const Logic = () => {
  return {};
};

let Lists = stateful(Dumb, Logic);
Lists.displayName = 'Lists';

export default Lists;
