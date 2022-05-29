import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from "react-native";
import AnswerApi from "../api/AnswerApi";
import ActivityIndicator from "./extras/ActivityIndicator";
import HTMLView from "react-native-htmlview";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Moment from "moment";
import server from "../api/server";
import FormInput from "./forms/FormInput";

const { width, height } = Dimensions.get("window");

const Answer = ({ route }) => {
  const [post, setPost] = useState([]);
  const { id: id } = route.params.item;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [comment, setComment] = useState({
    title: "",
  });

  const { title } = comment;
  const submitForm = async () => {
    const response = await server
      .post(
        `/answers/${id}/comments`,
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
          fetchAnswer(id);
          setComment({ title: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChangeText = (value, fieldName) => {
    setComment({ ...comment, [fieldName]: value });
  };

  const submitVote = async () => {
    const response = await server
      .post(
        `/answers/${id}/votes`,
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
          fetchAnswer(id);
        } else {
          Alert.alert("Alert", response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAnswer = async (id) => {
    try {
      const myAnswer = await AnswerApi.getAnswerById(id);
      setPost(myAnswer);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let cleanUp = false;
    fetchAnswer(id);
    return () => {
      cleanUp = true;
    };
  }, []);

  const { votes, comments } = post;

  if (loading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.profileImage}>
              <Image source={{ uri: post.propic }}></Image>
              <View style={styles.author}>
                <Text style={{ fontWeight: "bold" }}>{post.author}</Text>
                <Text style={{ color: "#aaa", fontSize: 11 }}>{post.bio}</Text>
              </View>
            </View>
            <Text style={styles.title}>{post.question}?</Text>
            {/* add body for rich text */}
            <HTMLView
              value={post.answer.body}
              stylesheet={styles.description}
            />
            <Text style={styles.btm}>
              <Text style={styles.btmFields}>
                <FontAwesome5
                  style={styles.icons}
                  name="comments"
                  size={18}
                  color="#aaa"
                />{" "}
                {comments.length}{" "}
              </Text>
              <Text>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : null}
                  enabled
                >
                  <FontAwesome5
                    style={styles.voteBtn}
                    onPress={submitVote}
                    name="thumbs-up"
                    size={28}
                    color="#aaa"
                  />
                </KeyboardAvoidingView>
                {votes}
              </Text>
              <Text style={styles.btmFields}>
                <FontAwesome5
                  style={styles.icons}
                  name="calendar-alt"
                  size={18}
                  color="#aaa"
                />{" "}
                {Moment(post.created).format("MMMM Do YYYY, h:mm:ss a")}{" "}
              </Text>
            </Text>
          </View>

          <View>
            {comments.map((comment) => (
              <View style={styles.comment} key={comment.id}>
                <View style={styles.profileImage}>
                  <Image source={{ uri: comment.propic }}></Image>
                  <View style={styles.author}>
                    <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>
                    <Text style={{ color: "#aaa", fontSize: 11 }}>
                      {Moment(comment.created).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Text>
                  </View>
                </View>
                <Text style={styles.text}>{comment.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboard}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.inputContainer}>
                  <FormInput
                    style={{ justifyContent: "flex-start" }}
                    value={title}
                    onChangeText={(value) => handleOnChangeText(value, "title")}
                    autoCapitalize="none"
                    placeholder="Comment..."
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Pressable
                    style={{ justifyContent: "flex-end" }}
                    onPress={submitForm}
                  >
                    <Text style={{ fontSize: 16, color: "#fff" }}>
                      <FontAwesome
                        style={styles.icons}
                        name="send"
                        size={18}
                        color="#fff"
                      />
                    </Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </Modal>

      <View style={{ position: "absolute", ...styles.button }}>
        <Pressable
          style={[styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="plus" size={30} color="#fff" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
  textInput: {
    color: "#aaa",
  },
  inputContainer: {
    width: "80%",
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
    overflow: "hidden",
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
    color: "#333",
    marginBottom: 5,
    flexDirection: "column",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  btm: {
    marginTop: 10,
    color: "#222",
    backgroundColor: "#eee",
    padding: 8,
  },

  profileImage: {
    width: "100%",
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    color: "#222",
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  icons: {
    fontSize: 20,
    marginLeft: 15,
  },
  textbox: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    bottom: 0,
    elevation: 5,
    flex: 1,
  },
  voteBtn: {
    marginBottom: -10,
    paddingLeft: 15,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0080ff",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
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
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Answer;
