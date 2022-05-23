import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AnswerCard from "./cards/AnswerCard";
import ActivityIndicator from "./extras/ActivityIndicator";
import AnswerApi from "../api/AnswerApi";
import Screen from "./Screen";

const Answers = () => {
  const navigation = useNavigation();

  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnswers = async () => {
    try {
      const myAnswers = await AnswerApi.getAnswers();
      setAnswers(myAnswers);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [answers]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Screen>
        <View style={styles.content}>
          {answers.map((item) => (
            <AnswerCard
              onPress={() => navigation.navigate("Answer", { item })}
              item={item}
              key={item.id}
            />
          ))}
        </View>
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    marginVertical: 0,
  },
});

export default Answers;
