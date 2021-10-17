import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import articlesApi from '../api/articlesApi';
import ActivityIndicator from './extras/ActivityIndicator';

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
    }, []);

    const { likes, replies } = post;

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
                    {post.article.title}
                </Text>
                <Text style={styles.text}>
                    {post.article.link}
                </Text>
                <Text style={styles.text}>
                Likes: {likes}
                </Text>
                <Text style={styles.text}>
                Replies: {replies}
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

export default Article
