import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QuestionCard from './cards/OuestionCard'
import ActivityIndicator from './extras/ActivityIndicator';
import QuestionApi from '../api/QuestionApi';
import Screen from './Screen';

const Questions = () => {
    const navigation = useNavigation();

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {

        try {
            const myQuestions = await QuestionApi.getQuestions();
            setQuestions(myQuestions);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    fetchQuestions();
    }, [])

    if (isLoading) {
        return (
          <View>
            <ActivityIndicator visible={true}/>
          </View>
        );
      }

    return (
        <Screen>
            <View style={styles.container}>
                {questions.map((item) => <QuestionCard onPress={() => navigation.navigate('Question', {item})} item={item} key={item.id} />)}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    }
})

export default Questions
