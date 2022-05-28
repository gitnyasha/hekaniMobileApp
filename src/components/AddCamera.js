import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicator from "./extras/ActivityIndicator";

const AddCamera = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync(null);
      setImage(photo.uri);
    }
  };

  const uploadImage = async () => {
    setIsLoading(true);

    let filename = image.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: image, name: filename, type });
    fetch(
      "https://hekani-social-media.herokuapp.com/api/v1/upload_profile_image",
      {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        Alert.alert("Success", JSON.parse(data).status);
        setIsLoading(false);
        navigation.navigate("Profile");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
        ></Camera>
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Ionicons name="camera-reverse" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <Ionicons name="images" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
          <Ionicons name="camera" size={36} color="black" />
        </TouchableOpacity>
        {image && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              uploadImage();
              setImage(null);
            }}
          >
            <Ionicons name="cloud-upload" size={36} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "green",
  },
  image: {
    width: "100%",
    height: "90%",
  },
});

export default AddCamera;
