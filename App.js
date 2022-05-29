import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ActivityIndicator from "./src/components/extras/ActivityIndicator";
import axios from "axios";
import Answers from "./src/components/Answers";
import UserProfile from "./src/components/UserProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import Navigation from "./src/components/nav/Navigation";
import Authenticate from "./src/components/Authenticate";
import Questions from "./src/components/Questions";
import Settings from "./src/components/Settings";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  const [cookies, setCookies] = useState({
    isLoggedIn: "No",
    user: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  checkLogin = () => {
    axios
      .get("https://hekani-social-media.herokuapp.com/api/v1/logged_in", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("User? ", res);
        if (res.data.logged_in && cookies.isLoggedIn === "No") {
          setCookies({
            isLoggedIn: "Yes",
            user: res.data.user,
          });
        } else if (!res.data.logged_in && cookies.isLoggedIn === "Yes") {
          setCookies({
            isLoggedIn: "No",
            user: {},
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("No", err);
      });
  };

  handleLogin = (data) => {
    setCookies({
      isLoggedIn: "Yes",
      user: data.user,
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  handleLogout = () => {
    setCookies({
      isLoggedIn: "No",
      user: {},
    });
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {cookies.isLoggedIn === "Yes" ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Profile") {
                  iconName = focused ? "user" : "user";
                } else if (route.name === "Q&A") {
                  iconName = focused ? "profile" : "profile";
                } else if (route.name === "Home") {
                  iconName = focused ? "filetext1" : "filetext1";
                } else if (route.name === "Questions") {
                  iconName = focused ? "question" : "question";
                } else if (route.name === "Settings") {
                  iconName = focused ? "setting" : "setting";
                }
                return <AntDesign name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={Navigation} />
            <Tab.Screen name="Profile" component={UserProfile} />
            <Tab.Screen name="Questions" component={Questions} />
            <Tab.Screen name="Settings">
              {() => <Settings handleLogout={handleLogout} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{ headerTransparent: true, headerTitle: "" }}
          >
            <Stack.Screen name="Authenticate">
              {() => (
                <Authenticate
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  isLoggedIn={cookies.isLoggedIn}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
