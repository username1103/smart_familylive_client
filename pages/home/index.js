import React from 'react';
import { Text, View, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import CustomButton from '../../components/custom-button';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.M2,
  },
  header: {
    width: '100%',
    height: '1%',
  },
  title: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: '#ffb486',
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
    height: '16%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
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
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  name: {
    paddingLeft: 10,
  },
});

const Dumb = ({ showTestModal }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header} />
        <Text style={{ fontSize: 15, color: 'white' }}>
          {'공지 >> 11월 질문 업데이트 완료'}
        </Text>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, color: 'white' }}>
            {' '}
            ☆ 오늘의 질문{'\n'}
            {'\n'} 이번 여름 휴가는 어디가 좋을까요?
          </Text>
        </View>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <View style={styles.profile}>
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={require('../../assets/img1.jpeg')}
              />
            </View>
            <Text style={styles.name}>뽀로로</Text>
          </View>
          <View style={styles.userComment}>
            <Text>호기심이 많은 꼬마 펭귄</Text>
          </View>
        </View>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <View style={styles.profile}>
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={require('../../assets/img2.jpeg')}
              />
            </View>
            <Text style={styles.name}>크롱</Text>
          </View>
          <View style={styles.userComment}>
            <Text>재롱둥이 아기 공룡</Text>
          </View>
        </View>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <View style={styles.profile}>
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={require('../../assets/img3.jpeg')}
              />
            </View>
            <Text style={styles.name}>루피</Text>
          </View>
          <View style={styles.userComment}>
            <Text>다정한 꼬마 비버</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();

  const showTestModal = () => {
    navigation.navigate(PageName.TestModal);
  };

  const goAlert = () =>
    Alert.alert('오늘의 질문', '이번 생일에 받고싶은 선물은?', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
        style: 'cancel',
      },
    ]);

  return {
    showTestModal,
    goAlert,
  };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
