import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from 'react-native'
import HTMLView from "react-native-htmlview";
import { FontAwesome5 } from '@expo/vector-icons';
import Moment from 'moment';

const AnswerCard = ({style, item, onPress}) => {
    const { answer, question, author, bio, comments, votes, created } = item;
    console.log(item);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../../assets/me.jpg")} style={styles.image} resizeMode="center"></Image>
                        <View style={styles.author}>
                            <Text style={{ fontWeight: 'bold' }}>{author}</Text>
                            <Text style={{ color: '#aaa', fontSize: 11 }}>{bio}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        {question}?
                    </Text>
                    <HTMLView value={answer.body} stylesheet={styles.description} />
                    <Text style={styles.btm}>
                        <Text style={styles.btmFields}><FontAwesome5 style={styles.icons} name="comments" size={18} color="#aaa" /> {comments} </Text>
                        <Text style={styles.btmFields}><FontAwesome5 style={styles.icons} name="thumbs-up" size={18} color="#aaa" /> {votes} </Text>
                        <Text style={styles.btmFields}><FontAwesome5 style={styles.icons} name="calendar-alt" size={18} color="#aaa" /> {Moment(created).format('MMMM Do YYYY, h:mm:ss a')} </Text>
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
        backgroundColor: 'white',
        marginTop: 10,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
    },
    content: {
        padding: 5,
    },
    title: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#333",
    },
    author: {
        fontSize: 13,
        color: '#333',
        marginBottom: 5,
        flexDirection: 'column',
    },
    description: {
        fontSize: 16,
        marginTop: 10
    },
    btm: {
        fontSize: 14,
        marginTop: 10,
        color: '#222',
        fontFamily: "Roboto",
        backgroundColor: '#eee',
        padding: 7,
        flexDirection: 'row',
    },
    btmFields: {
        color: '#222',
        fontFamily: "Roboto",
    },
    profileImage: {
        width: '100%',
        flexDirection: 'row',
    },
})

export default AnswerCard
