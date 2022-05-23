import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ActivityIndicator from "./extras/ActivityIndicator";
import ArticleCategoryApi from "../api/ArticleCategoryApi";
import CategoryCard from "./cards/CategoryCard";

const ArticleCategories = () => {
  const [articleCategories, setArticleCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticleCategories = async () => {
    try {
      const myArticleCategories =
        await ArticleCategoryApi.getArticleCategories();
      setArticleCategories(myArticleCategories);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let cleanUp = false;
    fetchArticleCategories();
    return () => {
      cleanUp = true;
    };
  }, [articleCategories]);

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
          {articleCategories.map((item) => (
            <CategoryCard item={item} type={"article"} key={item.id} />
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

export default ArticleCategories;
