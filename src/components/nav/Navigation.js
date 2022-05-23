import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Article from "../Article";
import Question from "../Question";
import Home from "../Home";
import Answer from "../Answer";
import QuestionCategories from "../QuestionCategories";
import ArticleCategories from "../ArticleCategories";
import Account from "../Account";
import QuestionForm from "../forms/QuestionForm";
import { TouchableWithoutFeedback, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserProfile from "../UserProfile";

const Stack = createNativeStackNavigator();

const Navigation = ({ handleLogin, handleLogout, isLoggedIn }) => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerShown: true,
        headerTintColor: "navy",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="Hekani">
        {() => (
          <Home
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="Answer" component={Answer} />
      <Stack.Screen name="QuestionForm" component={QuestionForm} />
      <Stack.Screen name="QuestionCategories" component={QuestionCategories} />
      <Stack.Screen name="ArticleCategories" component={ArticleCategories} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0080ff",
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    right: 50,
    elevation: 5,
  },
});

export default Navigation;
