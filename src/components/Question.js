import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import QuestionApi from '../api/QuestionApi';
import ActivityIndicator from './extras/ActivityIndicator';

const { width, height } = Dimensions.get('window');

const Question = ({route}) => {
    const [myquestion, setQuestion] = useState({});
    const { id: postsId } = route.params.item;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQuestion = async (id) => {
            try {
            const myQuestion = await QuestionApi.getQuestionById(id);
            setQuestion(myQuestion);
            setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    fetchQuestion(postsId);
    }, []);

    const { answers } = myquestion;
    console.log(myquestion.question)

    if (loading) {
        return (
        <View>
            <ActivityIndicator visible={true}/>
        </View>
        );
    }

    return (
        <ScrollView  style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {myquestion.question.title}
                </Text>
                <Text style={styles.text}>
                    Comments: {answers}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: width,
        height: height / 2,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
})

export default Question
