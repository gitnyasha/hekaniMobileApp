import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions,Modal, Pressable } from 'react-native'
import AnswerApi from '../api/AnswerApi';
import ActivityIndicator from './extras/ActivityIndicator';
import VotesForm from './forms/VotesForm';
import HTMLView from "react-native-htmlview";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Moment from 'moment';
import server from '../api/server';
import FormContainer from './forms/FormContainer';
import FormInput from './forms/FormInput'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Answer = ({route}) => {
    const [post, setPost] = useState([]);
    const { id: id } = route.params.item;
    const [loading, setLoading] = useState(true)
     const [ comment, setComment ] = useState({
        title: '',
    })

    const { title } = comment;
    const submitForm = async () => {
        const response = await server.post(
            `/answers/${id}/comments`,
            {
                title: title,
            },
            { 
                withCredentials: true 
            },
            {
                headers: { 
                    'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com/api/v1' 
                },
            }
        ).then(response => {
            if (response.data.status === 'success') {
                fetchAnswer(id);
                setComment({ title: '' });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setComment({ ...comment, [fieldName]: value });
    };


    const fetchAnswer = async (id) => {
        try {
        const myAnswer = await AnswerApi.getAnswerById(id);
        setPost(myAnswer);
        setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
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
        <>
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
                
                <View>
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
        <View style={styles.textbox}>
            <FormContainer>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.inputContainer}>
                        <FormInput style={{ justifyContent: 'flex-start', }} value={title} onChangeText={value => handleOnChangeText(value, 'title')} autoCapitalize='none' placeholder="Comment..." />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', }} onPress={submitForm}>
                            <Text style={{ fontSize: 16, color: "#fff" }}><FontAwesome style={styles.icons} name="send" size={18} color="#fff" /></Text>
                        </TouchableOpacity>    
                    </View>
                </View>
            </FormContainer>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    textInput: {
        color: '#aaa',
    },
     inputContainer: {
        width: '80%',
    },
    btnContainer: {
        flex: 1,
        height: 55,
        backgroundColor: "#2196F3",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        width: 50,
        marginTop: 10,
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
        marginTop: 10,
        color: '#222',
        backgroundColor: '#eee',
        padding: 8,
    },

    profileImage: {
        width: '100%',
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        color: '#222',
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
    },
    contentContainer: {
        padding: 5,
        marginBottom: 60,
    },
    comment: {
        padding: 5,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    icons: {
        fontSize: 28,
        paddingLeft: 15,
    },
     textbox: {
        width: '100%',
        height: 55,
        backgroundColor: '#fff',
        justifyContent: 'center',
        bottom: 0,
        elevation: 5,
        position: 'absolute',
        flex: 1,        
    },
  

})

export default Answer
