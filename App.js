import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/nav/Navigation';
import axios from 'axios';
import { View } from 'react-native';
import Authenticate from './src/components/Authenticate';

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
    // <NavigationContainer>
    //   <Navigation handleLogin={handleLogin} />
    // </NavigationContainer>
    <Authenticate handleLogin={handleLogin} isLoggedIn={cookies.isLoggedIn} handleLogout={handleLogout} />
  );
}