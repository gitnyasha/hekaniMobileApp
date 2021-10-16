import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home'
import Article from '../Article'
import Authenticate from '../Authenticate'

const Stack = createNativeStackNavigator();

const Navigation = ({ handleLogin, handleLogout, isLoggedIn }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',

            }}
        >
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen name="Article" component={Article} initialParams={{ handleLogin, handleLogout, isLoggedIn }} />
            <Stack.Screen name="Authenticate" component={Authenticate} initialParams={{ handleLogin, handleLogout, isLoggedIn }} />
        </Stack.Navigator>
    )
}

export default Navigation
