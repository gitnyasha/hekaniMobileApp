import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { FontAwesome5 } from "@expo/vector-icons";
import Moment from "moment";
import axios from "axios";
import UserApi from "../../api/UserApi";
import ActivityIndicator from "../extras/ActivityIndicator";

const AnswerCard = ({ item, onPress }) => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = async () => {
    try {
      const getUser = await UserApi.getCurrentUser();
      setUser(getUser);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  const {
    answer,
    question,
    author,
    relationship,
    author_id,
    bio,
    propic,
    comments,
    votes,
    created,
  } = item;

  const followUser = async () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: author_id,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/follow",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      if (response.data.status === "Successfully followed") {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Alert", response.data.message);
      }
    });
  };

  const unfollowUser = async () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: author_id,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/unfollow",
      method: "DELETE",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      console.log(response.data);
      if (response.data.status === "Successfully followed") {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Alert", response.data.message);
      }
    });
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: propic }}
              style={styles.image}
              resizeMode="center"
            ></Image>
            <View style={styles.author}>
              <Text style={{ fontWeight: "bold" }}>{author}</Text>
              <Text style={{ color: "#aaa", fontSize: 11 }}>{bio}</Text>
            </View>
            <View style={styles.rightside}>
              {user.id !== author_id ? (
                <View>
                  {relationship === "follow" ? (
                    <Text>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        enabled
                      >
                        <Pressable style={styles.button} onPress={followUser}>
                          <Text style={{ color: "navy" }}>Follow</Text>
                        </Pressable>
                      </KeyboardAvoidingView>{" "}
                    </Text>
                  ) : (
                    <Text>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        enabled
                      >
                        <Pressable style={styles.button} onPress={unfollowUser}>
                          <Text style={{ color: "red" }}>Unfollow</Text>
                        </Pressable>
                      </KeyboardAvoidingView>{" "}
                    </Text>
                  )}
                </View>
              ) : (
                <View>
                  <Text>{}</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.title}>{question}?</Text>
          {/* add body for rich text */}
          <HTMLView value={answer.body} stylesheet={styles.description} />
          <Text style={styles.btm}>
            <Text style={styles.btmFields}>
              <FontAwesome5
                style={styles.icons}
                name="comments"
                size={18}
                color="#aaa"
              />{" "}
              {comments}{" "}
            </Text>
            <Text style={styles.btmFields}>
              <FontAwesome5
                style={styles.icons}
                name="thumbs-up"
                size={18}
                color="#aaa"
              />{" "}
              {votes}{" "}
            </Text>
            <Text style={styles.btmFields}>
              <FontAwesome5
                style={styles.icons}
                name="calendar-alt"
                size={18}
                color="#aaa"
              />{" "}
              {Moment(created).format("MMMM Do YYYY, h:mm:ss a")}{" "}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 5,
    borderBottomColor: "#ddd",
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
    fontSize: 14,
    marginTop: 10,
    color: "#222",
    padding: 7,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  btmFields: {
    color: "#222",
  },
  profileImage: {
    width: "100%",
    flexDirection: "row",
  },
  rightside: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 5,
    fontSize: 12,
  },
});

export default AnswerCard;
