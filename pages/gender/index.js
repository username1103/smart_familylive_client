import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import PageName from '../../navs/page-name';

const Dumb = (p) => {
  const { goNext, gender, setGender } = p;

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            color: Colors.M3,
          }}
        >
          성별을 선택해주세요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {['M', 'W'].map((type) => (
            <TouchableOpacity onPress={() => setGender(type)}>
              <Text
                style={{
                  fontSize: 30,
                  marginHorizontal: 15,
                  color: type === gender ? Colors.M2 : Colors.M3,
                }}
              >
                {type === 'M' ? '남' : '여'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {gender && (
          <TouchableOpacity onPress={goNext} disabled={gender === null}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 15,
                borderColor: Colors.M3,
                borderWidth: 1,
                marginHorizontal: 50,
                marginBottom: 120,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.M3,
                  paddingVertical: 10,
                }}
              >
                다음
              </Text>
              <AntDesign name="arrowright" size={24} color={Colors.M3} />
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
  const [gender, setGender] = useState(null);

  const goNext = () => {
    navigation.navigate(PageName.Birthday, { ...payload, gender });
  };
  return {
    goNext,
    gender,
    setGender,
  };
};

let Gender = stateful(Dumb, Logic);
Gender.displayName = 'Gender';

export default Gender;
