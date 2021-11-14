import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import AnswerApi from '../api/AnswerApi';
import ActivityIndicator from './extras/ActivityIndicator';
import VotesForm from './forms/VotesForm';
import HTMLView from "react-native-htmlview";

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

    console.log(post);

    return (
        <ScrollView  style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>
                    {post.author }
                </Text>
                <Text style={styles.title}>
                    {post.question}
                </Text>
                <HTMLView value={post.answer.body} stylesheet={styles.description} />
                <Text style={styles.text}>
                    Date: {post.created}
                </Text>
                <Text style={styles.text}>
                    Votes: {votes}
                </Text>
                <VotesForm answerid={post.id} />
                <Text style={styles.text}>
                    Comments:
                </Text>
                <View style={styles.contentContainer}>
                    {comments.map(comment => <Text style={styles.text} key={comment.id}>{comment.user}: {comment.comment}</Text>)}
                </View>
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
    description: {
        fontSize: 16,
        marginTop: 10
    },
})

export default Answer
