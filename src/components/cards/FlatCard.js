import React from 'react'
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native'
import Title from '../Title'
import { FontAwesome5 } from '@expo/vector-icons';
import Moment from 'moment';

const FlatCard = ({style, imageStyle, item, onPress}) => {
    const { title, image, date, publisher, category } = item;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Image 
            source={{ uri: image }} 
            style={[styles.image, imageStyle]} 
            />
            <View style={styles.content}>
                <Title>
                    {title}
                </Title>
                <Text style={styles.btm}>
                    <Text style={styles.btmFields}>
                        <FontAwesome5 style={styles.icons} name="user" size={15} color="#000" /> {publisher} 
                    </Text>
                    <Text style={styles.btmFields}> <FontAwesome5 style={styles.icons} name="calendar-alt" size={18} color="#aaa" /> {Moment(date).format('MMMM Do YYYY')} </Text>
                </Text>
                <Text style={styles.btmFields}>
                    <FontAwesome5 style={styles.icons} name="tag" size={18} color="#aaa" /> {category}
                </Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        borderRadius: 10,
        overflow: 'hidden',
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 5,
    },
    btm: {
        fontSize: 14,
        marginTop: 10,
        color: '#222',
        flexDirection: 'row',
    },
    btmFields: {
        color: '#222',
    },
    profileImage: {
        width: '100%',
        flexDirection: 'row',
    },
    icons: {
        marginRight: 5,
        color: 'red',
    },
})

export default FlatCard
