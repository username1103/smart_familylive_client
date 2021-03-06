import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';
import { FontAwesome5 } from '@expo/vector-icons';
import ShopItem from '../../components/shop-item';
import { useRefreshOnFocus } from '../../utils/useRefreshOnFoucs';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { useGroup } from '../../hooks/group';
import { useItem } from '../../hooks/item';
import { useNavigation } from '@react-navigation/native';
import pageName from '../../navs/page-name';

const Dumb = (p) => {
  const { data, goFamilyItem } = p;

  if (data === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader
            headerTitle="Shop"
            leftButton={true}
            onLeftButton={() => {}}
            leftButtonComponent={
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
            rightButton={true}
            onRightButton={goFamilyItem}
            rightButtonComponent={
              <View style={{ marginRight: 5 }}>
                <FontAwesome5 name="shopping-bag" size={24} color={Colors.M2} />
              </View>
            }
          />
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginHorizontal: 10,
              }}
            >
              {data.items.map((item) => (
                <ShopItem
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </ScrollView>
        </>
      }
    />
  );
};

const Logic = () => {
  const navigation = useNavigation();
  const authHook = useAuth();
  const userHook = useUser();
  const itemHook = useItem();
  const groupHook = useGroup();

  const [data, setData] = useState(null);

  const init = async () => {
    const { groupId } = await userHook.getUserGroup({
      userId: authHook.userId,
    });

    const group = await groupHook.get({ groupId });

    const { items } = await itemHook.gets();

    setData({
      group,
      items: items.map((item) => ({
        ...item,
        onPress: () => {
          navigation.navigate(pageName.SelectModal, {
            message: '?????????????????????????',
            onSuccess: async () => {
              try {
                await groupHook.buyItem({
                  groupId,
                  itemId: item._id,
                  userId: authHook.userId,
                });

                Alert.alert('?????????????????????');
              } catch (e) {
                console.log(e.response.status);
                if (e.response.status === 400) {
                  Alert.alert('????????? ???????????????');
                }
              }
            },
            goBack: true,
          });
        },
      })),
    });
  };

  useRefreshOnFocus({ isInitialized: data !== null, refresh: init });

  useEffect(init, []);

  const goFamilyItem = () => {
    navigation.navigate(pageName.FamilyItem);
  };

  return { data, goFamilyItem };
};

let Shop = stateful(Dumb, Logic);
Shop.displayName = 'Shop';

export default Shop;
