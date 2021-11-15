import React, { useState } from 'react';
import moment from 'moment';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import DateTimePicker from '@react-native-community/datetimepicker';

const Dumb = (p) => {
  const { goNext, date, setDate, setBirthday, showDate, setShowDate } = p;

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            color: Colors.M3,
          }}
        >
          생일을 입력해주세요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {Platform.OS === 'ios' ? (
          <DateTimePicker
            mode={'date'}
            display={'spinner'}
            value={date}
            locale={'ko'}
            maximumDate={new Date(2021, 12, 31)}
            onChange={(event, selectedDate) => setDate(selectedDate)}
          />
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
                <Text style={{ fontSize: 20 }}>
                  {moment(date).format('YYYY년 MM월 DD일')}
                </Text>
              </TouchableOpacity>
            </View>
            {showDate && (
              <DateTimePicker
                mode={'date'}
                display={'default'}
                value={date}
                locale={'ko'}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => setBirthday(selectedDate)}
              />
            )}
          </>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {date && (
          <TouchableOpacity style={{ marginHorizontal: 50 }} onPress={goNext}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 15,
                borderColor: Colors.M3,
                borderWidth: 1,
                paddingHorizontal: 80,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.M3,
                  paddingVertical: 10,
                }}
              >
                시작하기
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const Logic = (p) => {
  const payload = p.route.params;

  const userHook = useUser();
  const authHook = useAuth();

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const setBirthday = (date) => {
    if (date !== undefined) {
      setDate(date);
    }
    setShowDate(false);
  };

  const goNext = async () => {
    await userHook.update({
      userId: authHook.userId,
      ...payload,
      birthday: moment(date).format('YYYY-MM-DD'),
    });

    const user = await userHook.get({ userId: authHook.userId });

    await authHook.updateInfo({
      isMatched: user.isMatched,
      needInit: !user.birthday,
      status: 'authed',
      userId: user._id.toString(),
    });
  };
  return {
    goNext,
    date,
    setDate,
    setBirthday,
    showDate,
    setShowDate,
  };
};

let Birthday = stateful(Dumb, Logic);
Birthday.displayName = 'Birthday';

export default Birthday;
