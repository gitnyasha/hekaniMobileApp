import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'

const QuestionCard = ({style, item, onPress}) => {
    const { title, desc } = item;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container, style}>
            <View style={styles.content}>
                <Title>
                    {title}
                </Title>
                <Text>{desc}</Text>
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
