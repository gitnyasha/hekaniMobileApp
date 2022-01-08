import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import AnswerApi from '../api/AnswerApi';
import ActivityIndicator from './extras/ActivityIndicator';
import VotesForm from './forms/VotesForm';
import HTMLView from "react-native-htmlview";
import { FontAwesome5 } from '@expo/vector-icons';
import Moment from 'moment';
import CommentForm from './forms/CommentForm';

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
                <View style={styles.content}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/me.jpg")} style={styles.image} resizeMode="center"></Image>
                        <View style={styles.author}>
                            <Text style={{ fontWeight: 'bold' }}>{post.author}</Text>
                            <Text style={{ color: '#aaa', fontSize: 11 }}>{post.bio}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        {post.question}?
                    </Text>
                    <HTMLView value={post.answer.body} stylesheet={styles.description} />
                    <Text style={styles.btm}>
                        <Text style={styles.btmFields}><FontAwesome5 style={styles.icons} name="comments" size={18} color="#aaa" /> {comments.length} </Text>
                        <Text><VotesForm answerid={post.id} /> {votes} </Text>
                        <Text style={styles.btmFields}><FontAwesome5 style={styles.icons} name="calendar-alt" size={18} color="#aaa" /> {Moment(post.created).format('MMMM Do YYYY, h:mm:ss a')} </Text>
                    </Text>
                </View>
                <CommentForm answerid={post.id}/>
                <View style={styles.contentContainer}>
                    {comments.map(comment => (
                    <View style={styles.comment} key={comment.id}>
                        <View style={styles.profileImage}>
                            <Image source={require("../../assets/me.jpg")} style={styles.image} resizeMode="center"></Image>
                            <View style={styles.author}>
                                <Text style={{ fontWeight: 'bold' }}>{comment.user}</Text>
                                <Text style={{ color: '#aaa', fontSize: 11 }}>{Moment(comment.created).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                        </View>
                        <Text style={styles.text} >{comment.comment}</Text>
                    </View>
                    ))}
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
    text: {
        fontSize: 15,
        fontFamily: "Roboto",
        color: '#222',
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
    },
    contentContainer: {
        padding: 5,
    },
    comment: {
        padding: 5,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
})

export default Answer
