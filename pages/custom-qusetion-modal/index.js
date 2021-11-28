import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import { useAuth } from '../../hooks/auth';
import { useGroup } from '../../hooks/group';
import pageName from '../../navs/page-name';

const _width = Dimensions.get('screen').width;

export const CustomQuestionModal = (p) => {
  const { item } = p.route.params;

  const navigation = useNavigation();

  const authHook = useAuth();
  const groupHook = useGroup();

  const [answer, setAnswer] = useState('');
  const [invalidAnswer, setInvalidAnswer] = useState(false);

  const onPress = async () => {
    if (answer.trim() === '') {
      return setInvalidAnswer(true);
    }
    try {
      await groupHook.createCustomQuestion({
        groupId: item.group,
        contents: answer,
        authorId: authHook.userId,
        groupItemId: item._id,
      });
    } catch (e) {
      if (e.response.status === 400) {
        navigation.goBack();

        return navigation.navigate(pageName.AlertModal, {
          message: '이미 사용된 아이템이거나 적합하지 않은 아이템입니다.',
        });
      }
    }

    navigation.goBack();

    navigation.navigate(pageName.AlertModal, {
      message:
        '질문이 등록되었습니다. 등록된 질문은 다음 질문 시간에 받아보실 수 있어요.\n(단, 앞선 질문이 모두 답변되어야 합니다.)',
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
            원하시는 질문을 입력해주세요.
          </Text>

          <TextInput
            style={{
              width: '80%',
              marginTop: 10,
              height: 50,
              borderWidth: 0.3,
              borderColor: invalidAnswer ? 'red' : 'white',
            }}
            backgroundColor={'#FFF'}
            placeholder={'원하시는 질문을 입력해주세요.'}
            value={answer}
            onChangeText={setAnswer}
            multiline={true}
          />
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

CustomQuestionModal.displayName = 'CustomQuestionModal';
