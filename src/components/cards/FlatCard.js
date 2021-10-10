import React from 'react'
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'

const FlatCard = ({style, imageStyle, item, onPress}) => {
    const { title, desc } = item;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container, style}>
            <Image 
            source={{ uri: "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg" }} 
            style={[styles.image, imageStyle]} 
            />
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

export default FlatCard
