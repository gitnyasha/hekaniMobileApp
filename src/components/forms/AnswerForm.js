import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import server from "../../api/server";
import * as ImagePicker from "expo-image-picker";

const AnswerForm = ({ questionid }) => {
  // useRef
  const _editor = React.createRef();
  const [answer, setAnswer] = useState({
    title: "",
  });
  const [image, setImage] = useState(null);

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

  // const uploadImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }

  //   let filename = image.split("/").pop();

  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = match ? `image/${match[1]}` : `image`;

  //   let formData = new FormData();
  //   formData.append("image", { uri: image, name: filename, type });
  //   fetch("https://hekani-social-media.herokuapp.com/api/v1/gallery", {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   })
  //     .then(function (response) {
  //       return response.text();
  //     })
  //     .then(function (data) {
  //       return JSON.parse(data).image_url;
  //     });
  // };

  // const customHandler = (name, value) => {
  //   if (name === "image") {
  //     _editor.current?.insertEmbed(
  //       0,
  //       "image",
  //       "https://hekani-social-media.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ab424364224c96a4f9f7f168e932f9cbcdfcc1cf/825DD737-D8BA-4044-8B60-9F529F7B3726.jpg"
  //     );
  //   } else {
  //     console.log(`${name} clicked with value: ${value}`);
  //   }
  // };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <FormContainer>
          <FormInput
            style={styles.input}
            value={title}
            onChangeText={(value) => handleOnChangeText(value, "title")}
            autoCapitalize="none"
            label="Answer"
            placeholder="Answer..."
          />
          <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
        {/* <StatusBar style="auto" />
        <QuillToolbar
          editor={_editor}
          options="full"
          theme="light"
          custom={{
            handler: customHandler,
            actions: ["image"],
          }}
        />

        <QuillEditor
          autoSize
          container={true}
          style={styles.editor}
          ref={_editor}
          initialHtml="<h1>Add answer</h1>"
        /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: "#eaeaea",
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
    height: 200,
  },
});

export default AnswerForm;
