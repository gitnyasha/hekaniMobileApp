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
import ActivityIndicator from "./extras/ActivityIndicator";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ handleLogout }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(1);

  const fetchArticles = async () => {
    try {
      const myArticles = await articlesApi.getArticles(offset);
      setArticles([...articles, ...myArticles]);
      setIsLoading(false);
      setOffset(offset + 5);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
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
        {/* <Featured
        title="Featured"
        item={{
          title: "React Native",
          body: "A framework for building native apps using React",
          image:
            "https://user-images.githubusercontent.com/45620987/136694624-3c9f9b2d-dc9d-418c-b522-15be6d2eea4b.jpg",
        }}
      /> */}
        <Articles data={articles} />
        <RefreshControl isLoading={isLoading} onRefresh={fetchArticles} />
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={fetchArticles}
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

export default Home;
