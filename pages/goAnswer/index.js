import React,{ useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import stateful from '../../utils/stateful';
import colors from '../../styles/colors';
import PageName from '../../navs/page-name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../../components/custom-header';
import SafeAreaPlatfrom from '../../components/safe-area-platfrom';

const STORAGE_KEY = '@answer';

const Dumb = (p) => {
    const { gooQuestion } = p;
    const navigation = useNavigation();

    const [working, setWorking] = useState(true);
    const [text, setText] = useState('');
    const [answer, setAnswer] = useState({});
    useEffect(() => {
        loadAnswer();
     }, []);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);
    const saveAnswer = async (toSave) => {
     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };
    const loadAnswer = async () => {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        setAnswer(JSON.parse(s));
    };
    const addAnswer = async () => {
        if (text === '') {
            return;
        }
        const newAnswer = {
            ...answer,
            [Date.now()]: { text, working },
        };
        setAnswer(newAnswer);
        await saveAnswer(newAnswer);
        setAnswer('');
    };

    return (
    <SafeAreaPlatfrom
      backgroundColor={colors.M1}
      components={
        <>
          <CustomHeader headerTitle="Answer" />
        
            <View style={styles.container}>
                <View style={styles.question}>
                    <Text>질문 어쩌구</Text>
                </View>
                <TextInput
                    placeholder="답변을 작성해주세요."
                    onSubmitEditing={addAnswer}
                    onChangeText={onChangeText}
                    returnKeyType="done"
                    value={text}
                    multiline={true}
                    style={styles.answerInput}
                    
                >
                </TextInput>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Button color={colors.M3} title={'완료'} 
                        onPress={() => Alert.alert ( null, "답변을 다 작성하셨나요?", [
                            { text: "아니요", onPress: () => console.log('no'), style: "cancel"},
                            { text: "예", onPress:() => navigation.navigate(PageName.Question)},
                            ], { cancelable: false } 
                        )} 
                    />
                </TouchableOpacity>
            </View>
        </>
      }
    />
    )
}

const Logic = (p) => {
    const navigation = useNavigation();
    const gooQuestion = () => {
        navigation.navigate(PageName.Question);
      };
    
    return{ gooQuestion };
};

const styles = StyleSheet.create({
    modal: {
        flex: 5,
        alignItems: 'flex-end',
    },
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: colors.M1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
    question: {
        borderRadius: 10,
        backgroundColor: '#ffb486',
        marginTop: 10,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerInput: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignSelf: "stretch",
    },
    buttonStyle: {
        width: '20%',
        marginTop: 10,
    }
})

let Answer = stateful(Dumb, Logic);
Answer.displayName = 'Answer';

export default Answer;