import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import articlesApi from '../api/articlesApi';
import ActivityIndicator from './extras/ActivityIndicator';
import ArticleForm from './forms/ArticleForm';
import LikesForm from './forms/LikesForm';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const Article = ({route}) => {
    const [post, setPost] = useState([]);
    const { id: id } = route.params.item;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticle = async (id) => {
            try {
            const myArticle = await articlesApi.getArticleById(id);
            setPost(myArticle);
            setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchArticle(id);
    },);

    if (loading) {
        return (
        <View>
            <ActivityIndicator visible={true}/>
        </View>
        );
    }

    return (<>
        <WebView 
        style={styles.container}
        source={{ uri: post.article.link }}
      />
        <ScrollView  style={styles.container}>
           
            <View style={styles.contentContainer}>
                <ArticleForm articleId={post.article.id} />
                <LikesForm articleId={post.article.id}/>
                <Text style={styles.text}>
                Likes: {post.likes}
                </Text>
                <Text style={styles.text}>
                Replies:
                </Text>
                <View style={styles.contentContainer}>
                    {post.replies.map(reply => <Text style={styles.text} key={reply.id}>{reply.user}: {reply.reply}</Text>)}
                </View>
            </View>
        </ScrollView></>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
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

export default Article
