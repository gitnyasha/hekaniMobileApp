import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { StyleSheet,Alert, Modal, Pressable, Text, View, ScrollView, Dimensions } from 'react-native'
import articlesApi from '../api/articlesApi';
import ActivityIndicator from './extras/ActivityIndicator';
import ArticleForm from './forms/ArticleForm';
import LikesForm from './forms/LikesForm';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Article = ({route}) => {
    const [post, setPost] = useState([]);
    const { id: id } = route.params.item;
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const fetchArticle = async (id) => {
        try {
        const myArticle = await articlesApi.getArticleById(id);
        setPost(myArticle);
        setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchArticle(id);
    },[post]);

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <ScrollView>
                    <View style={styles.centeredView}>
                        <Text style={styles.text}>
                        Likes: {post.likes}
                        </Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        <ArticleForm articleId={post.article.id} />
                        <LikesForm articleId={post.article.id}/>
                        <View style={styles.contentContainer}>
                        <Text style={styles.text}>
                        Replies:
                        </Text>
                            {post.replies.map(reply =>
                                <View key={reply.id} style={styles.commentContainer}>
                                    <Text style={styles.text} key={reply.id}>{reply.user}</Text>
                                    <Text>{reply.reply}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}><FontAwesome5 style={styles.icons} name="thumbs-up" size={18} color="#aaa" /> {post.likes} </Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        height: height,
    },
    image: {
        width: width,
        height: height / 2,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 20,
    },
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,
        backgroundColor: '#fff',
        height: height,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#ddd",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default Article
