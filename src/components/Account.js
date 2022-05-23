import { Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import FormContainer from "./forms/FormContainer";
import FormInput from "./forms/FormInput";
import FormButton from "./forms/FormButton";
import server from "../api/server";
import UserApi from "../api/UserApi";
import ActivityIndicator from "./extras/ActivityIndicator";
import { useNavigation } from "@react-navigation/native";

const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 3000);
};

const isValidEmail = (value) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value);
};

const Account = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: "",
    name: "",
    birth: "",
    bio: "",
    error: "",
  });

  const [error, setError] = useState("");

  const { name, email, birth, bio } = user;

  const [currentUserAccount, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = async () => {
    try {
      const getUser = await UserApi.getCurrentUser();
      setCurrentUser({ ...currentUserAccount, ...getUser });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const update = async () => {
    const response = await server
      .patch(
        `/users/${currentUserAccount.id}`,
        {
          user: {
            name: name,
            email: email,
            birth: birth,
            bio: bio,
          },
        },
        { withCredentials: true },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://hekani-social-media.herokuapp.com/api/v1",
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "Successfully updated your account") {
          Alert.alert("Message", response.data.status);
          navigation.navigate("UserProfile");
        }
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  const handleOnChangeText = (value, fieldName) => {
    setUser({ ...user, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidEmail(email)) return updateError("Invalid email", setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      update();
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  console.log(currentUserAccount);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value) => handleOnChangeText(value, "email")}
        autoCapitalize="none"
        placeholder="Enter email"
      />
      <FormInput
        value={name}
        onChangeText={(value) => handleOnChangeText(value, "name")}
        autoCapitalize="none"
        placeholder="Enter name"
      />
      <FormInput
        value={birth}
        onChangeText={(value) => handleOnChangeText(value, "birth")}
        autoCapitalize="none"
        placeholder="2000-01-28"
      />
      <FormInput
        value={bio}
        onChangeText={(value) => handleOnChangeText(value, "bio")}
        autoCapitalize="none"
        placeholder="Enter bio"
      />
      <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
        {error}
        {currentUserAccount.error}
      </Text>
      <FormButton onPress={submitForm} label="Update" />
    </FormContainer>
  );
};

export default Account;
