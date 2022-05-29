import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Settings = ({ handleLogout }) => {
  const navigation = useNavigation();

  handleLogoutButton = () => {
    axios
      .delete("https://hekani-social-media.herokuapp.com/api/v1/logout", {
        withCredentials: true,
      })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => {
        console.log("Logout error ", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Account")}>
        <View style={styles.card}>
          <Text style={styles.text}>Account</Text>
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Article Categories")}
      >
        <View style={styles.card}>
          <Text style={styles.text}>Article Topics</Text>
        </View>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Question Categories")}
      >
        <View style={styles.card}>
          <Text style={styles.text}>Question Topics</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleLogoutButton}>
        <View style={styles.card}>
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 15,
    borderBottomColor: "#ddd",
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    fontWeight: "bold",
    color: "#444",
  },
});

export default Settings;
