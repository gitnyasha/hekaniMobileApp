import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'
import HTMLView from "react-native-htmlview";

const AnswerCard = ({style, item, onPress}) => {
    const { answer, question, author, comments, votes, created } = item;
    console.log(item);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container, style}>
            <View style={styles.content}>
                <Title style={styles.title}>{author}</Title>
                <Title style={styles.title}>
                    {question}?
                </Title>
                <HTMLView value={answer.body} stylesheet={styles.description} />
                <Text style={styles.date}>Comments: {comments} Votes: {votes} {created}</Text>
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
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "600"
    },
    description: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 14,
        marginTop: 10,
    },
})

export default AnswerCard
