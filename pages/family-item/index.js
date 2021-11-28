import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';
import { useGroup } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../components/custom-header';
import { GridView } from '../../components/grid-view';
import ShopItem from '../../components/shop-item';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.M1,
    marginHorizontal: 15,
  },
  title: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: Colors.M4,
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
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#f7bca8',
    borderBottomWidth: 0.5,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 5,
    backgroundColor: Colors.M4,
    borderRadius: 5,
  },
  profile: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 16,
    paddingLeft: 10,
  },
  answer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 15,
  },
});

const Dumb = (p) => {
  const { data, goBack } = p;

  if (data === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <>
      <CustomHeader
        headerTitle="아이템 보관함"
        leftButton={true}
        onLeftButton={goBack}
        leftButtonComponent={
          <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
        }
        rightButton={true}
        onRightButton={() => {}}
        rightButtonComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require('../../assets/coin.png')}
            />
            <Text>{data.group.coin}</Text>
          </View>
        }
      />
      <View style={{ paddingLeft: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>사용 전</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 20 }}>
        <GridView
          data={data.notUsedItems}
          renderItem={(item) => (
            <ShopItem
              key={item._id}
              image={item.item.image}
              name={item.item.name}
              price={item.item.price}
              onPress={item.onPress}
            />
          )}
          numColumns={3}
        />
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 10,
          borderTopColor: Colors.DISABLE,
          borderTopWidth: 1,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '600' }}>사용 완료</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 20 }}>
        <GridView
          data={data.usedItems}
          renderItem={(item) => (
            <ShopItem
              key={item._id}
              image={item.item.image}
              name={item.item.name}
              price={item.item.price}
              onPress={() => {}}
            />
          )}
          numColumns={3}
        />
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const groupHook = useGroup();
  const authHook = useAuth();
  const userHook = useUser();

  const [data, setData] = useState(null);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const groupinfo = await groupHook.get({ groupId });

    const { items } = await groupHook.getItems({ groupId });

    const usedItems = items.filter((item) => item.used);
    const notUsedItems = items
      .filter((item) => !item.used)
      .map((item) => ({
        ...item,
        onPress: () => {
          if ((item.item.name = '직접 질문 작성하기')) {
            navigation.navigate(PageName.CustomQuestionModal, {
              item,
            });
          } else if ((item.item.name = '질문 시간 변경')) {
            navigation.navigate(PageName.ChangeQuestionTime, { item });
          }
        },
      }));
    setData({
      usedItems,
      notUsedItems,
      group: groupinfo,
    });
  };

  useRefreshOnFocus({ isInitialized: data !== null, refresh: init });

  useEffect(init, []);

  const goBack = () => {
    navigation.goBack();
  };

  return {
    data,
    goBack,
  };
};

let FamilyItem = stateful(Dumb, Logic);
FamilyItem.displayName = 'FamilyItem';

export default FamilyItem;
