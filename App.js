import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import Navigation from './src/components/nav/Navigation';
import Questions from './src/components/Questions';
import Answers from './src/components/Answers';

const Drawer = createDrawerNavigator();

export default function App() {
  const [cookies, setCookies] = useState({
    isLoggedIn: "No",
    user: {}
  });


  checkLogin = () => {
    axios.get('https://hekani-social-media.herokuapp.com/api/v1/logged_in', {withCredentials: true}).then(res => {
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
    <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name="ShoApp">
            {()  => <Navigation handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn} />}
          </Drawer.Screen>
          <Drawer.Screen name="Questions">
              {() => <Questions handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn}/>}
          </Drawer.Screen>
          <Drawer.Screen name="Answers">
              {() => <Answers handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={cookies.isLoggedIn}/>}
          </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}