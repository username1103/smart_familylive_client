import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  _View,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import stateful from '../../utils/stateful';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import SafeAreaPlatfrom from '../../components/safe-area-platfrom';
import CustomHeader from '../../components/custom-header';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import PageName from '../../navs/page-name';

const _width = Dimensions.get('window').width;

const Dumb = (p) => {
  const {
    goback,
    confirm,
    name,
    setName,
    gender,
    setGender,
    bloodType,
    setBloodType,
    showDate,
    setShowDate,
    birthday,
    setBirthday,
    customSetBirthday,
    thumbnail,
    setThumbnail,
  } = p;

  return (
    <SafeAreaPlatfrom
      backgroundColor={Colors.M1}
      components={
        <>
          <CustomHeader
            headerTitle="내 정보 수정"
            leftButton={true}
            onLeftButton={goback}
            leftButtonComponent={
              <Ionicons name="arrow-back-outline" size={30} color={Colors.M3} />
            }
            rightButton={true}
            onRightButton={confirm}
            rightButtonComponent={
              <Text style={{ color: Colors.M3, fontSize: 18 }}>완료</Text>
            }
          />

          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ marginTop: 15 }}>
              {thumbnail !== '' ? (
                <Image
                  style={{
                    width: 50,
                    aspectRatio: 1,
                    backgroundColor: Colors.M1,
                    borderRadius: 50,
                    borderWidth: 0.3,
                    borderColor: Colors.DISABLE,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: thumbnail,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 50,
                    borderWidth: 0.3,
                    borderColor: Colors.DISABLE,
                  }}
                >
                  <SimpleLineIcons name="user" size={35} color="black" />
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Text
                style={{ marginVertical: 15, color: Colors.M2, fontSize: 17 }}
              >
                프로필 사진 바꾸기
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.75,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                width: _width * 0.85,
              }}
            >
              <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 17 }}>이름</Text>
              </View>

              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.DISABLE,
                }}
              >
                <TextInput
                  style={{ fontSize: 17 }}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                width: _width * 0.85,
              }}
            >
              <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 17 }}>성별</Text>
              </View>

              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                  flexDirection: 'row',
                }}
              >
                {['M', 'W'].map((type) => (
                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'space-evenly' }}
                    onPress={() => setGender(type)}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: 'center',
                        color: type === gender ? Colors.M2 : Colors.M3,
                      }}
                    >
                      {type === 'M' ? '남' : '여'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                width: _width * 0.85,
              }}
            >
              <View style={{ flex: 0.2 }}>
                <Text style={{ fontSize: 17 }}>혈액형</Text>
              </View>

              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                  flexDirection: 'row',
                }}
              >
                {['A', 'B', 'O', 'AB'].map((type) => (
                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'space-evenly' }}
                    onPress={() => setBloodType(type)}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: 'center',
                        color: type === bloodType ? Colors.M2 : Colors.M3,
                      }}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                width: _width * 0.85,
              }}
            >
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 17 }}>생일</Text>
              </View>

              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                }}
              >
                {Platform.OS === 'ios' ? (
                  <>
                    <DateTimePicker
                      mode={'date'}
                      display={'spinner'}
                      value={new Date(birthday)}
                      locale={'ko'}
                      maximumDate={new Date(2021, 12, 31)}
                      onChange={(event, selectedDate) =>
                        setBirthday(selectedDate)
                      }
                    />
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.DISABLE,
                        }}
                        onPress={() => setShowDate(true)}
                      >
                        <Text style={{ fontSize: 17 }}>
                          {moment(birthday).format('YYYY년 MM월 DD일')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {showDate && (
                      <DateTimePicker
                        mode={'date'}
                        display={'default'}
                        value={new Date(birthday)}
                        locale={'ko'}
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) =>
                          customSetBirthday(selectedDate)
                        }
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </>
      }
    />
  );
};

const Logic = (p) => {
  const { user } = p.route.params;
  const navigation = useNavigation();

  const authHook = useAuth();
  const userHook = useUser();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [birthday, setBirthday] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [showDate, setShowDate] = useState(false);

  const customSetBirthday = (date) => {
    if (date !== undefined) {
      setBirthday(date);
    }
    setShowDate(false);
  };
  const init = async () => {
    setName(user.name);
    setGender(user.gender);
    setBloodType(user.bloodType);
    setBirthday(user.birthday);
    setThumbnail(user.thumbnail);
  };

  useEffect(init, []);

  const goback = () => {
    navigation.goBack();
  };

  const confirm = async () => {
    await userHook.update({
      userId: authHook.userId,
      name,
      bloodType,
      gender,
      birthday,
    });
    navigation.navigate(PageName.AlertModal, {
      message: '정보가 변경되었습니다.',
    });
    navigation.goBack();
  };

  return {
    goback,
    confirm,
    name,
    setName,
    gender,
    setGender,
    bloodType,
    setBloodType,
    showDate,
    setShowDate,
    birthday,
    setBirthday,
    customSetBirthday,
    thumbnail,
    setThumbnail,
  };
};

let EditUser = stateful(Dumb, Logic);
EditUser.displayName = 'EditUser';

export default EditUser;
