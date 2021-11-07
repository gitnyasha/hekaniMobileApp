import React from 'react'
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'

const FlatCard = ({style, imageStyle, item, onPress}) => {
    const { title, image } = item;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container, style}>
            <Image 
            source={{ uri: image }} 
            style={[styles.image, imageStyle]} 
            />
            <View style={styles.content}>
                <Title>
                    {title}
                </Title>
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
