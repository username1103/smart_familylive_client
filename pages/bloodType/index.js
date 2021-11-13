import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import PageName from '../../navs/page-name';

const Dumb = (p) => {
  const { goNext, bloodType, setBloodType } = p;

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            color: Colors.M3,
          }}
        >
          혈액형을 선택해주세요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {['A', 'B', 'O', 'AB'].map((type) => (
            <View>
              <TouchableOpacity onPress={() => setBloodType(type)}>
                <Text
                  style={{
                    fontSize: 30,
                    marginHorizontal: 15,
                    color: type === bloodType ? Colors.M2 : Colors.M3,
                  }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {bloodType && (
          <TouchableOpacity onPress={goNext} disabled={bloodType === null}>
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
  const [bloodType, setBloodType] = useState(null);

  const goNext = () => {
    navigation.navigate(PageName.Gender, { ...payload, bloodType });
  };
  return {
    goNext,
    bloodType,
    setBloodType,
  };
};

let BloodType = stateful(Dumb, Logic);
BloodType.displayName = 'BloodType';

export default BloodType;
