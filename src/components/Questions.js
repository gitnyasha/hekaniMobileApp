import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QuestionCard from "./cards/OuestionCard";
import ActivityIndicator from "./extras/ActivityIndicator";
import QuestionApi from "../api/QuestionApi";
import { FontAwesome5 } from "@expo/vector-icons";

const Questions = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const myQuestions = await QuestionApi.getQuestions();
      setQuestions(myQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [questions]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.contain}>
      <ScrollView>
        <View style={styles.container}>
          {questions.map((item) => (
            <QuestionCard
              onPress={() => navigation.navigate("Question", { item })}
              item={item}
              key={item.id}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ position: "absolute", ...styles.button }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("QuestionForm")}
        >
          <FontAwesome5 name="plus" size={30} color="#fff" />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    marginVertical: 15,
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
});

export default Questions;
