import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, ScrollView, Dimensions } from 'react-native'
import articlesApi from '../api/articlesApi';

const { width, height } = Dimensions.get('window');

const Article = ({route}) => {
    const [article, setArticle] = useState({});
    const { id: postsId } = route.params.item;

    useEffect(() => {
        const fetchArticle = async (id) => {
        try {
          const myArticle = await articlesApi.getArticleById(id);
          setArticle(myArticle);
        } catch (error) {
            console.error(error);
        }
    }
    fetchArticle(postsId);
    }, []);

    const { title, body, image } = article;

    return (
        <ScrollView  style={styles.container}>
            <Image source={require('../../assets/me.jpg')} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.text}>
                    {body}
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
