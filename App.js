import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import Article from './src/components/Article'
import axios from 'axios';
import Authenticate from './src/components/Authenticate';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cookies, setCookies] = useState({
    isLoggedIn: "No",
    user: {}
  });


  checkLogin = () => {
    axios.get('https://hekani-social-media.herokuapp.com/logged_in', {withCredentials: true}).then(res => {
      console.log("User? ",res);
      if (res.data.logged_in && cookies.isLoggedIn === "No") {
        setCookies({
          isLoggedIn: "Yes",
          user: res.data.user
        });
      } else if (!res.data.logged_in && cookies.isLoggedIn === "Yes") {
        setCookies({
          isLoggedIn: "No",
          user: {}
        });
      }
    }).catch(err => {
      console.log("No", err);
    });
  }

  handleLogin = (data) => {
    setCookies({
      isLoggedIn: "Yes",
      user: data.user
    });
  }

  useEffect(() => {
    checkLogin();
  }, []);

  handleLogout = () => {
    setCookies({
      isLoggedIn: "No",
      user: {}
    });
  }


  return (
    <>
    {cookies.isLoggedIn === "Yes" ? (
    <NavigationContainer>
      <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',

            }}
        >          
            <><Stack.Screen options={{ headerShown: false }} name="Home">
            {props => <Home handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn} />}
          </Stack.Screen><Stack.Screen name="Article">
              {props => <Article handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn} />}
            </Stack.Screen></>
      </Stack.Navigator>
    </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator
              screenOptions={{
                  headerTransparent: true,
                  headerTitle: '',
              }}
          >
              <Stack.Screen name="Authenticate">
                {props => <Authenticate handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn} />}
              </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )}
    </>
  );
}