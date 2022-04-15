import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import articlesApi from "../api/articlesApi";
import ActivityIndicator from "./extras/ActivityIndicator";
import server from "../api/server";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import FormContainer from "../components/forms/FormContainer";
import FormInput from "../components/forms/FormInput";
import Moment from "moment";

const { width, height } = Dimensions.get("window");

const Article = ({ route }) => {
  const [post, setPost] = useState([]);
  const { id: id } = route.params.item;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [article, setArticle] = useState({
    title: "",
  });

  const { title } = article;
  const submitCommentForm = async () => {
    const response = await server
      .post(
        `/articles/${id}/replies`,
        {
          title: title,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://hekani-social-media.herokuapp.com/api/v1",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setModalVisible(false);
          fetchArticle(id);
          setArticle({
            title: "",
          });
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChangeText = (value, fieldName) => {
    setArticle({ ...article, [fieldName]: value });
  };

  const likeForm = async () => {
    const response = await server
      .post(
        `/articles/${id}/likes`,
        {},
        {
          withCredentials: true,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://hekani-social-media.herokuapp.com/api/v1",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          Alert.alert("Success", response.data.message);
          setModalVisible(false);
          fetchArticle(id);
          setArticle({
            title: "",
          });
        } else {
          Alert.alert("Alert", response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchArticle = async (id) => {
    try {
      const myArticle = await articlesApi.getArticleById(id);
      setPost(myArticle);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticle(id);
  }, [post]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <>
      <WebView style={styles.container} source={{ uri: post.article.link }} />
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>
                <FontAwesome5 name="window-close" size={25} color="#2196F3" />
              </Text>
            </Pressable>
            {/* Comment form */}
            <FormContainer>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.inputContainer}>
                  <FormInput
                    style={styles.input}
                    value={title}
                    onChangeText={(value) => handleOnChangeText(value, "title")}
                    autoCapitalize="none"
                    placeholder="Comment...."
                  />
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={submitCommentForm}>
                    <View style={styles.articleButton}>
                      <Text style={{ fontSize: 16, color: "#fff" }}>
                        <FontAwesome
                          style={styles.icons}
                          name="send"
                          size={18}
                          color="#fff"
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </FormContainer>
            {/* like form */}
            <FormContainer>
              <TouchableOpacity onPress={likeForm}>
                <View style={styles.likeButton}>
                  <Text style={{ fontSize: 18, color: "#222" }}>
                    Like {"  "}
                    <FontAwesome name="thumbs-up" style={styles.icons} />
                  </Text>
                </View>
              </TouchableOpacity>
            </FormContainer>
            <View style={styles.contentContainer}>
              <Text style={styles.text}>Replies: {post.replies.length}</Text>
              {post.replies.map((reply) => (
                <View key={reply.id} style={styles.commentContainer}>
                  <Text style={{ fontWeight: "bold" }} key={reply.id}>
                    {reply.user}
                  </Text>
                  <Text style={{ color: "#aaa", fontSize: 11 }}>
                    {Moment(reply.created).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Text>
                  <Text style={styles.text}>{reply.reply}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          <FontAwesome5 name="comment" size={18} color="#aaa" />{" "}
          {post.replies.length}
          {"                "}
          <FontAwesome5 name="thumbs-up" size={18} color="#aaa" /> {post.likes}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    height: height,
  },
  inputContainer: {
    width: "80%",
  },
  btnContainer: {
    flex: 1,
    height: 55,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    marginTop: 10,
  },
  likeButton: {
    height: 50,
    width: 150,
    borderRadius: 5,
    marginTop: 10,
  },
  icons: {
    fontSize: 28,
    marginLeft: 15,
    color: "#2196F3",
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
    marginTop: 2,
    backgroundColor: "#fff",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#ddd",
  },
  buttonClose: {
    width: 50,
    top: 20,
    left: 20,
    position: "absolute",
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Article;
