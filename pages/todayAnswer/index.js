import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';

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
    height: 50,
    marginLeft: 30,
    borderLeftColor: Colors.M4,
    borderLeftWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: { 
    marginLeft: 3,
    fontSize: 10,
    color: 'black',
    textAlign: 'center'
  },
  elem: {
    flex: 1,
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7bca8',
    borderBottomWidth: 0.5,
    padding: 5,
    paddingVertical: 20,
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 15,
    paddingLeft: 10,
  }
});

  const Dumb = (p) => {
    const { users, answers } = p;

    return (
      <SafeAreaPlatfrom
        backgroundColor={Colors.M1}
        components={
          <>
            <CustomHeader headerTitle="오늘의 질문답변" />
           
              <View style={styles.container}>
               <View style={styles.question}>
                  <Text style={styles.questionText}>
                      {' '}
                     8. 이번 여름 휴가는 어디가 좋을까요?{' '}
                  </Text>
                  </View>
                <ScrollView>
                 {users.map((user) => (            
                  <View style={styles.elem}>
                    <View style={styles.userInfo}>
                      <View style={styles.profile}>
                        {user.thumbnail !== '' ? (
                          <Image
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'contain',
                           }}
                            source={{
                              uri: user.thumbnail,
                            }}
                         />
                        ) : (
                          <View
                            style={{  
                              height: '100%',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: Colors.M1,
                              borderRadius: 50,
                              borderWidth: 0.3,
                              borderColor: Colors.DISABLE,
                            }}
                         >
                            <SimpleLineIcons name="user" size={30} color="black" />
                         </View>
                       )}
                      </View>
                      <Text style={styles.name}>{user.name}</Text>
                    </View>
                    <ScrollView>
                     {answers.map((answer) => (
                      <View style={styles.answer}>
                        <Text style={styles.answerText}>{answer}</Text>
                      </View>
                      ))}
                    </ScrollView>
                    
                  </View>
                    ))}
                </ScrollView>
              </View>
                
              
          </>
        }
      />
    );
  };
  
  const Logic = () => {
    const answers = [
      '오사카 갈래,,,',
    ];

    const groupHook = useGroup();
    const authHook = useAuth();
    const userHook = useUser();
  
    const [users, setUsers] = useState([]);
  
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
      setUsers(users);
    };

    useRefreshOnFocus({ isInitialized: users !== [], refresh: init });

    useEffect(() => init(), []);
  
    return { users, answers };
  };
  
  let TodayAnswer = stateful(Dumb, Logic);
  TodayAnswer.displayName = 'TodayAnswer';
  
  export default TodayAnswer;