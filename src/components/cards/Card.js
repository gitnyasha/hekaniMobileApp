import React from 'react'
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'

const Card = ({style, imageStyle, item, onPress}) => {
    const { title, body } = item;
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View style={styles.container, style}>
                <Image 
                source={{ uri: "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg" }} 
                style={[styles.image, imageStyle]} 
                />
                <View style={styles.content}>
                    <Title>
                        {title}
                    </Title>
                    <Title>{body}</Title>
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
        height: 200,
    },
    content: {
        padding: 5,
    }
})

export default Card
