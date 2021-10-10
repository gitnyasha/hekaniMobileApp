import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home'
import Article from '../Article'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',

            }}
        >
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen name="Article" component={Article} />
        </Stack.Navigator>
    )
}

export default Navigation
