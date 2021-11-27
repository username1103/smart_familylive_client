import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import CustomHeader from '../../components/custom-header';

const _width = Dimensions.get('window').width;

const Dumb = (p) => {
  const { goback, user } = p;

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.M1 }}>
        <CustomHeader
          headerTitle="정보 보기"
          leftButton={true}
          onLeftButton={goback}
          leftButtonComponent={
            <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
          }
        />

        <View
          style={{
            flex: 0.4,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View>
            {user.thumbnail !== '' ? (
              <Image
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  backgroundColor: Colors.M1,
                  borderRadius: 200,
                  borderWidth: 0.3,
                  borderColor: Colors.DISABLE,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: user.thumbnail,
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 200,
                  borderWidth: 0.3,
                  borderColor: Colors.DISABLE,
                }}
              >
                <SimpleLineIcons name="user" size={35} color="black" />
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: _width * 0.85,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Text style={{ fontSize: 17, fontWeight: '600' }}>이름</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {user.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: _width * 0.85,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Text style={{ fontSize: 17, fontWeight: '600' }}>메시지</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {user.statusMessage}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: _width * 0.85,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Text style={{ fontSize: 17, fontWeight: '600' }}>성별</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {user.gender === 'M' ? '남' : '여'}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: _width * 0.85,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Text style={{ fontSize: 17, fontWeight: '600' }}>혈액형</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {user.bloodType}형
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              width: _width * 0.85,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: '600' }}>생일</Text>
            </View>

            <View
              style={{
                flex: 0.8,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: 'black',
                }}
              >
                {moment(user.birthday).format('YYYY년 MM월 DD일')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const Logic = (p) => {
  const { user } = p.route.params;
  const navigation = useNavigation();

  const goback = () => {
    navigation.goBack();
  };

  return {
    goback,
    user,
  };
};

let UserInfo = stateful(Dumb, Logic);
UserInfo.displayName = 'UserInfo';

export default UserInfo;
