import React, {useRef,useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/nav/Navigation';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import FormHeader from './src/components/forms/FormHeader';
import FormSelect from './src/components/forms/FormSelect';
import LoginForm from './src/components/forms/LoginForm';
import SignUpForm from './src/components/forms/SignUpForm';

const width = Dimensions.get('window').width;

export default function App() {
  const [cookies, setCookies] = useState({
    isLoggedIn: "No",
    user: {}
  });

  const checkLogin = () => {
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

  const handleLogin = (data) => {
    setCookie({
      isLoggedIn: "Yes",
      user: data.user
    });
  }

  const handleLogoutButton = () => {
    axios.delete("https://hekani-social-media.herokuapp.com/logout", {withCredentials: true})
    .then(response => {
        handleLogout();
    })
    .catch(error => {
        console.log("Logout error ", error);
    });
  }

  const handleLogout = () => {
    setCookie({
      isLoggedIn: "No",
      user: {}
    });
  }

  const scrollView = React.useRef();

  return (
    // <NavigationContainer>
    //   <Navigation />
    // </NavigationContainer>
    <View style={{ flex: 1, paddingTop: 80 }}>
      <View style={{ height: 100}}>
        <FormHeader leftHeading='Left' rightHeading="Right" />
      </View>
      <View style={{ flexDirection:  "row", padding: 10 }}>
        <FormSelect onPress={() => scrollView.current.scrollTo({x: 0})} style={styles.borderLeft} backgroundColor="navy" title="Login" />
        <FormSelect onPress={() => scrollView.current.scrollTo({x: width})} style={styles.borderRight} backgroundColor="grey" title="Signup" />
      </View>
      <ScrollView 
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false}
      ref={scrollView}
      >
        <LoginForm/> 
        <ScrollView>
          <SignUpForm/>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  borderRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  }
});