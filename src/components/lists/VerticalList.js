import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FlatCard from "../cards/FlatCard";
import { useNavigation } from "@react-navigation/native";

const VerticalList = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <FlatCard
          onPress={() => navigation.navigate("Article", { item })}
          item={item}
          key={item.id}
          keyExtractor={(item) => item.toString()}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
});

export default VerticalList;
