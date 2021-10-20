import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'

const QuestionCard = ({style, item, onPress}) => {
    const { question, date, answers } = item;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container, style}>
            <View style={styles.content}>
                <Title>
                    {question}
                </Title>
                <Text>{date}</Text>
                <Text>Answers: {answers}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 5,
    }
})

export default QuestionCard
