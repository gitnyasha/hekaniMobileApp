import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AnswerCard from './cards/AnswerCard'
import ActivityIndicator from './extras/ActivityIndicator';
import AnswerApi from '../api/AnswerApi';
import Screen from './Screen';

const Answers = () => {
    const navigation = useNavigation();

    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnswers = async () => {

        try {
            const myAnswers = await AnswerApi.getAnswers();
            setAnswers(myAnswers);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    fetchAnswers();
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
                {answers.map((item) => <AnswerCard onPress={() => navigation.navigate('Answer', {item})} item={item} key={item.id} />)}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    }
})

export default Answers
