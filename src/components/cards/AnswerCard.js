import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { FontAwesome5 } from "@expo/vector-icons";
import Moment from "moment";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";

const AnswerCard = ({ style, item, onPress }) => {
  const { answer, question, author, author_id, bio, comments, votes, created } =
    item;
  const [isFollowing, setIsFollowing] = useState(false);

  const followUser = async () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: author_id,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/relationships",
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
      url: "https://hekani-social-media.herokuapp.com/api/v1/relationships/1",
      method: "DELETE",
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

  checkUserFollowing = async () => {
    try {
      const response = await server.get(
        `/does_user_follow_user`,
        {
          params: { followed_id: author_id },
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "following") {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    checkUserFollowing();
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../../assets/me.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
            <View style={styles.author}>
              <Text style={{ fontWeight: "bold" }}>{author}</Text>
              <Text style={{ color: "#aaa", fontSize: 11 }}>{bio}</Text>
            </View>
            <View style={styles.rightside}>
              {isFollowing ? (
                <Text>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                  >
                    <SimpleLineIcons
                      name="user-follow"
                      size={24}
                      onPress={followUser}
                      color="green"
                    />
                  </KeyboardAvoidingView>{" "}
                </Text>
              ) : (
                <Text>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                  >
                    <SimpleLineIcons
                      name="user-unfollow"
                      size={24}
                      onPress={unfollowUser}
                      color="red"
                    />
                  </KeyboardAvoidingView>{" "}
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.title}>{question}?</Text>
          {/* add body for rich text */}
          <HTMLView value={answer} stylesheet={styles.description} />
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
    marginTop: 5,
    marginLeft: 20,
  },
});

export default AnswerCard;
