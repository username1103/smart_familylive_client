import React from 'react';
import { Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../styles/colors';
import CustomButton from '../../components/custom-button';
import stateful from '../../utils/stateful';
import PageName from '../../navs/page-name';

const Dumb = ({ showTestModal }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomButton
          title="오늘의 질문"
          titleColor={Colors.M2}
          onPress={goAlert}
          accessible={true}
        />
        <Text>This is home</Text>
        <CustomButton
          title="테스트 모달 버튼"
          titleColor={Colors.M2}
          onPress={showTestModal}
          accessible={true}
        />
      </View>
    </>
  );
};

const goAlert = () =>
     Alert.alert(                    
      "오늘의 질문",                    
      "이번 생일에 받고싶은 선물은?",                       
      [                             
        {
          text: "OK",                             
          onPress: () => console.log("OK Pressed"),     
          style: "cancel"
        },
      ],
    );

const Logic = () => {
  const navigation = useNavigation();

  const showTestModal = () => {
    navigation.navigate(PageName.TestModal);
  };

  return {
    showTestModal,
  };
};

let Home = stateful(Dumb, Logic);
Home.displayName = 'Home';

export default Home;
