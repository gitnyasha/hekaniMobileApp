import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const FormButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{ fontSize: 16, color: "#fff" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});

export default FormButton;
