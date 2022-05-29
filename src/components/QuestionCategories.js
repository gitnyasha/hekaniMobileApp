import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ActivityIndicator from "./extras/ActivityIndicator";
import QuestionCategoryApi from "../api/QuestionCategoryApi";
import CategoryCard from "./cards/CategoryCard";

const QuestionCategories = () => {
  const [questionCategories, setQuestionCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestionCategories = async () => {
    try {
      const myQuestionCategories =
        await QuestionCategoryApi.getQuestionCategories();
      setQuestionCategories(myQuestionCategories);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // cancel all subscriptions when the component unmounts
    fetchQuestionCategories();
  }, [questionCategories]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {questionCategories.map((item) => (
            <CategoryCard item={item} type={"question"} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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

export default QuestionCategories;
