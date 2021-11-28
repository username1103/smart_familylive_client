import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useAuth } from '../../hooks/auth';
import { useGroup } from '../../hooks/group';
import pageName from '../../navs/page-name';
import RNPickerSelect from 'react-native-picker-select';

const _width = Dimensions.get('screen').width;

const timeFormat = (v) => {
  if (v.toString().length === 1) {
    return `0${v}`;
  }
  return v.toString();
};

const items = Array.from({ length: 24 }, (i, v) => ({
  label: `${timeFormat(v)}:00`,
  value: `${timeFormat(v)}:00`,
}));

export const ChangeQuestionTimeModal = (p) => {
  const { item, currentTime } = p.route.params;

  const navigation = useNavigation();

  const groupHook = useGroup();

  const [time, setTime] = useState(currentTime);
  const [invalidAnswer, setInvalidAnswer] = useState(false);

  const androidPickStyle = {
    width: '40%',
    borderBottomWidth: 1,
    borderBottomColor: invalidAnswer ? 'red' : Colors.DISABLE,
    marginTop: 30,
  };

  const onPress = async () => {
    if (time === null || time === currentTime) {
      return setInvalidAnswer(true);
    }
    try {
      await groupHook.updateGroupQuestionTime({
        groupId: item.group,
        time,
        groupItemId: item._id,
      });
    } catch (e) {
      if (e.response.status === 400) {
        navigation.goBack();

        return navigation.navigate(pageName.AlertModal, {
          message: '이미 사용된 아이템이거나 적합하지 않은 아이템입니다.',
        });
      }

      navigation.goBack();
      return navigation.navigate(pageName.AlertModal, {
        message: '서버 오류: 다시 시도해 주세요',
      });
    }

    navigation.goBack();

    navigation.navigate(pageName.AlertModal, {
      message: `질문 시간이 ${time}으로 변경되었습니다.`,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: _width * 0.8,
          backgroundColor: Colors.M1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}
      >
        <View
          style={{
            width: '100%',
            paddingVertical: 40,
            borderBottomWidth: 0.3,
            borderBottomColor: Colors.DISABLE,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '600',
            }}
          >
            {`변경하기 원하는 시간을 선택해주세요.\n (현재 시간: ${currentTime})`}
          </Text>
          <View style={androidPickStyle}>
            <RNPickerSelect value={time} onValueChange={setTime} items={items}>
              <Text style={{ textAlign: 'center', fontSize: 17 }}>{time}</Text>
            </RNPickerSelect>
          </View>

          {invalidAnswer ? (
            <Text style={{ fontSize: 13, marginTop: 10, color: 'red' }}>
              변경할 시간이 비었거나 이전과 같습니다
            </Text>
          ) : null}
        </View>
        <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 15, color: 'gray', fontWeight: '600' }}>
              취소
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onPress}
          >
            <Text style={{ fontSize: 15, color: Colors.M2, fontWeight: '600' }}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

ChangeQuestionTimeModal.displayName = 'ChangeQuestionTimeModal';
