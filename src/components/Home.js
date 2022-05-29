import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import Screen from "./Screen";
import articlesApi from "../api/articlesApi";
import Articles from "./Articles";
import Featured from "./Featured";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicator from "./extras/ActivityIndicator";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AnswerCard from "./cards/AnswerCard";
import AnswerApi from "../api/AnswerApi";

const Home = ({ handleLogout }) => {
  const navigation = useNavigation();

  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchAnswers = async () => {
    try {
      const myAnswers = await AnswerApi.getAnswers(offset);
      setAnswers([...answers, ...myAnswers]);
      setIsLoading(false);
      setOffset(offset + 10);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

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
        {answers.length > 0 ? (
          <View style={styles.content}>
            {answers.map((item) => (
              <AnswerCard
                onPress={() => navigation.navigate("Answer", { item })}
                item={item}
                key={item.id}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.text}>
            No posts go to settings and follow question topics
          </Text>
        )}
        <RefreshControl isLoading={isLoading} onRefresh={fetchAnswers} />

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={fetchAnswers}
            //On Click of button calling getData function to load more data
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load More</Text>
            {isLoading ? <ActivityIndicator visible={true} /> : null}
          </TouchableOpacity>
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
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
