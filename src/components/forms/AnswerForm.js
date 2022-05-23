import React, { useState, useRef } from "react";
import { Alert, StyleSheet, StatusBar } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import server from "../../api/server";

const AnswerForm = ({ questionid }) => {
  // useRef
  const _editor = useRef();
  const [answer, setAnswer] = useState({
    title: "",
  });

  const { title } = answer;
  const submitForm = async () => {
    const response = await server
      .post(
        `/questions/${questionid}/answers`,
        {
          title: title,
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChangeText = (value, fieldName) => {
    setAnswer({ ...answer, [fieldName]: value });
  };

  return (
    <FormContainer>
      <FormInput
        style={styles.input}
        value={title}
        onChangeText={(value) => handleOnChangeText(value, "title")}
        autoCapitalize="none"
        label="Comment"
        placeholder="Answer..."
      />
      <FormButton label="Submit" onPress={submitForm} />
    </FormContainer>
    //     <SafeAreaView style={styles.root}>
    //     <StatusBar style="auto" />
    //     <QuillEditor
    //         autoSize
    //         container={true}
    //         style={styles.editor}
    //         ref={_editor}
    //         onChangeText={value => handleOnChangeText(value, 'title')}
    //         initialHtml="<h1>Add answer</h1>"
    //         style={{ minHeight: 300, maxHeight: 500 }}
    //     />
    //     <QuillToolbar editor={_editor} options="full" theme="light" />
    //   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eaeaea",
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: "white",
    height: 300,
  },
});

export default AnswerForm;
