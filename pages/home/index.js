import React from 'react';
import { Text, View } from 'react-native';
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
