import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import server from "../../api/server";
import { useNavigation } from "@react-navigation/native";
import categoriesApi from "../../api/categoriesApi";
import PickerItem from "react-native/Libraries/Components/Picker/Picker";
import ActivityIndicator from "../extras/ActivityIndicator";

const QuestionForm = () => {
  const navigation = useNavigation();

  const [question, setQuestion] = useState({
    title: "",
    question_category_id: 1,
  });
  const [selectedValue, setSelectedValue] = useState();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const myCategories = await categoriesApi.getCategories();
      setCategories(myCategories);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  const { title } = question;
  const submitForm = async () => {
    const response = await server
      .post(
        `/questions`,
        {
          title: title,
          question_category_id: selectedValue,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://hekani-social-media.herokuapp.com/api/v1",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          Alert.alert(response.data.status);
          navigation.navigate("Questions");
          setQuestion({ title: "" });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleOnChangeText = (value, fieldName) => {
    setQuestion({ ...question, [fieldName]: value });
  };

  return (
    <FormContainer>
      <FormInput
        value={title}
        onChangeText={(value) => handleOnChangeText(value, "title")}
        label="Ask"
        placeholder="Question..."
      />
      <View style={styles.container}>
        <Picker
          style={styles.pickerStyles}
          selectedValue={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
        >
          {categories.map((item) => (
            <PickerItem label={item.name} value={item.id} key={item.id} />
          ))}
        </Picker>
      </View>
      <FormButton label="Submit" onPress={submitForm} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerStyles: {
    width: "70%",
    backgroundColor: "gray",
    color: "white",
    marginTop: 40,
  },
});

export default QuestionForm;
