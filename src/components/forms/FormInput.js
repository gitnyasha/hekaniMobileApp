import React from "react";
import { TextInput, Text, StyleSheet, Button } from "react-native";

const FormInput = (props) => {
  const { placeholder, label } = props;
  return (
    <>
      <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{label}</Text>
      <TextInput {...props} style={styles.input} placeholder={placeholder} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 55,
    fontSize: 16,
    padding: 15,
    width: "100%",
    color: "#222",
    borderBottomColor: "#aaa",
  },
});

export default FormInput;
