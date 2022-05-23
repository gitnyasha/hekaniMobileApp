import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Title from "../Title";
import axios from "axios";

const CategoryCard = ({ item, type }) => {
  const { id, name, relationship } = item;

  const followCategory = async () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: id,
    });

    let reqOptions = {
      url: `https://hekani-social-media.herokuapp.com/api/v1/follow_${type}`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      if (response.data.status === "Success") {
        Alert.alert("Success", "following was successful");
      }
    });
  };

  const unfollowCategory = async () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: id,
    });

    let reqOptions = {
      url: `https://hekani-social-media.herokuapp.com/api/v1/unfollow_${type}`,
      method: "DELETE",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      console.log(response.data);
      if (response.data.status === "Success") {
        console.log(response.data);
        Alert.alert("Success", "unfollowing was successful");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title>{name}</Title>
        {relationship === "follow" ? (
          <Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              enabled
            >
              <Pressable style={styles.button} onPress={followCategory}>
                <Text style={{ color: "navy", fontSize: 15, paddingLeft: 10 }}>
                  Follow
                </Text>
              </Pressable>
            </KeyboardAvoidingView>{" "}
          </Text>
        ) : (
          <Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              enabled
            >
              <Pressable style={styles.button} onPress={unfollowCategory}>
                <Text style={{ color: "red", fontSize: 15, paddingLeft: 10 }}>
                  Unfollow
                </Text>
              </Pressable>
            </KeyboardAvoidingView>{" "}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 5,
    padding: 10,
  },
  content: {
    padding: 5,
    flexDirection: "row",
  },
});

export default CategoryCard;
