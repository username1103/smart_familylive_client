import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { SimpleLineIcons } from '@expo/vector-icons';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import CustomHeader from '../../components/custom-header';

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
    borderRadius: 20,
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
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7bca8',
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 15,
    paddingLeft: 10,
  },
});

const Dumb = (p) => {
  const { users } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Home" />
          <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.title}>
              <Text
                style={{ marginHorizontal: 15, fontSize: 20, color: 'white' }}
              >
                {' '}
                ☆ 오늘의 질문{'\n'}
                {'\n'} 이번 여름 휴가는 어디가 좋을까요?
              </Text>
            </View>
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
                        }}
                      >
                        <SimpleLineIcons name="user" size={30} color="black" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.name}>{user.name}</Text>
                </View>
                {user.statusMessage !== '' ? (
                  <View style={styles.userComment}>
                    <Text>{user.statusMessage}</Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            ))}
          </View>
        </>
      }
    />
  );
};

const Logic = (p) => {
  const navigation = useNavigation();
  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const { groupMembers } = await groupHook.getMembers({ groupId });
    if (groupMembers.length === 1 && showModal) {
      navigation.navigate(PageName.InitGroup);
      setShowModal(false);
    }

    const users = await Promise.all(
      groupMembers.map((groupMember) =>
        userHook.get({ userId: groupMember.user })
      )
    );
    setUsers(users);
  };

  useRefreshOnFocus({ isInitialized: users !== [], refresh: init });

  useEffect(() => init(), []);

  return { users };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
