import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FormHeader = ({ leftHeading, rightHeading }) => {
  return (
    <>
      <View style={styels.container}>
        <Text style={styels.text}>Hekani</Text>
      </View>
    </>
  );
};

const styels = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default FormHeader;
