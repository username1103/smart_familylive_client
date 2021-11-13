import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import PageName from '../../navs/page-name';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import DateTimePicker from '@react-native-community/datetimepicker';

const Dumb = (p) => {
  const { goNext, date, setDate } = p;

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
        }}
      >
        <View style={{ marginTop: -91 }}>
          <DateTimePicker
            mode={'date'}
            display={'spinner'}
            value={date}
            locale={'ko'}
            maximumDate={new Date(2021, 12, 31)}
            onChange={(event, selectedDate) => setDate(selectedDate)}
          />
        </View>

        {date && (
          <TouchableOpacity onPress={goNext}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 15,
                borderColor: Colors.M3,
                borderWidth: 1,
                marginHorizontal: 50,
                marginTop: 106,
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

  const navigation = useNavigation();
  const userHook = useUser();
  const authHook = useAuth();

  const [date, setDate] = useState(new Date());

  const goNext = async () => {
    await userHook.update({
      userId: authHook.userId,
      ...payload,
      birthday: moment(date).format('YYYY-MM-DD'),
    });

    navigation.navigate(PageName.Main);
  };
  return {
    goNext,
    date,
    setDate,
  };
};

let Birthday = stateful(Dumb, Logic);
Birthday.displayName = 'Birthday';

export default Birthday;
