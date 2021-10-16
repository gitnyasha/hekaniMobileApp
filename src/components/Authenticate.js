import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import FormHeader from './forms/FormHeader';
import FormSelect from './forms/FormSelect';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import axios from 'axios';

const width = Dimensions.get('window').width;

const Authenticate = ({handleLogin, isLoggedIn, handleLogout}) => {

    handleLogoutButton = () => {
        axios.delete("https://hekani-social-media.herokuapp.com/logout", {withCredentials: true})
        .then(response => {
            handleLogout();
        })
        .catch(error => {
            console.log("Logout error ", error);
        });
    }

    const scrollView = React.useRef();

    return (
         <View style={{ flex: 1, paddingTop: 80 }}>
             {isLoggedIn === "Yes" ? <TouchableWithoutFeedback onPress={handleLogoutButton}><Text>Logout</Text></TouchableWithoutFeedback> : <Text>You are not logged in</Text>}
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
                <LoginForm handleLogin={handleLogin} /> 
                <ScrollView>
                    <SignUpForm handleLogin={handleLogin}/>
                </ScrollView>
            </ScrollView>
        </View>
    )
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

export default Authenticate
