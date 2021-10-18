import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import AnswerApi from '../api/AnswerApi';
import ActivityIndicator from './extras/ActivityIndicator';

const { width, height } = Dimensions.get('window');

const Answer = ({route}) => {
    const [post, setPost] = useState([]);
    const { id: id } = route.params.item;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnswer = async (id) => {
            try {
            const myAnswer = await AnswerApi.getAnswerById(id);
            setPost(myAnswer);
            setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAnswer(id);
    }, []);

    const { votes, comments } = post;

    if (loading) {
        return (
        <View>
            <ActivityIndicator visible={true}/>
        </View>
        );
    }

    return (
        <ScrollView  style={styles.container}>
            <Image source={require('../../assets/me.jpg')} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {post.question}
                </Text>
                <Text style={styles.text}>
                    {post.answer}
                </Text>
                <Text style={styles.text}>
                    Date: {post.created}
                </Text>
                <Text style={styles.text}>
                    Votes: {votes}
                </Text>
                <Text style={styles.text}>
                    Comments: {comments}
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

export default Answer
