import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Title from "../Title";
import Moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";

const QuestionCard = ({ style, item, onPress }) => {
  const { question, date, answers } = item;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Title>{question}?</Title>
          <Text style={styles.btm}>
            <Text style={styles.btmFields}>
              <FontAwesome5
                style={styles.icons}
                name="comments"
                size={18}
                color="#aaa"
              />{" "}
              {answers}{" "}
            </Text>
            <Text style={styles.btmFields}>
              <FontAwesome5
                style={styles.icons}
                name="calendar-alt"
                size={18}
                color="#aaa"
              />{" "}
              {Moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}{" "}
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
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 5,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 5,
  },
  btm: {
    marginTop: 10,
  },
});

export default QuestionCard;
