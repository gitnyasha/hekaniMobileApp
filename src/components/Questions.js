import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  RefreshControl,
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
  const [offset, setOffset] = useState(0);

  const fetchQuestions = async () => {
    try {
      const myQuestions = await QuestionApi.getQuestions(offset);
      setQuestions([...questions, ...myQuestions]);
      setIsLoading(false);
      setOffset(offset + 5);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let cleanUp = false;
    fetchQuestions();
    return () => {
      cleanUp = true;
    };
  }, []);

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
        <RefreshControl isLoading={isLoading} onRefresh={fetchQuestions} />

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={fetchQuestions}
            //On Click of button calling getData function to load more data
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load More</Text>
            {isLoading ? <ActivityIndicator visible={true} /> : null}
          </TouchableOpacity>
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
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Questions;
