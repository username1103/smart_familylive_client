import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import stateful from '../../utils/stateful';
import Colors from '../../styles/colors';
import PageName from '../../navs/page-name';

const Dumb = (p) => {
  const { goNext, name, setName } = p;

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 25,
            color: Colors.M3,
          }}
        >
          이름을 작성해주세요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder={'이름을 작성해주세요'}
          value={name}
          onChangeText={setName}
          style={{
            fontSize: 30,
            marginHorizontal: 15,
            borderBottomWidth: 1,
            borderColor: 'gray',
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {name ? (
          <TouchableOpacity
            style={{ marginHorizontal: 50 }}
            onPress={goNext}
            disabled={name === ''}
          >
            <View
              style={{
                width: '80%',
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
                {'다음'}
              </Text>
              <AntDesign name="arrowright" size={24} color={Colors.M3} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const Logic = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');

  const goNext = async () => {
    navigation.navigate(PageName.BloodType, { name });
  };
  return {
    goNext,
    name,
    setName,
  };
};

let Name = stateful(Dumb, Logic);
Name.displayName = 'Name';

export default Name;
