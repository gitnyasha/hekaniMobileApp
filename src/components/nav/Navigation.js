import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from '../Article'
import Authenticate from '../Authenticate'
import Question from '../Question';
import Home from '../Home';
import Answer from '../Answer';

const Stack = createNativeStackNavigator();

const Navigation = ({handleLogin, handleLogout, isLoggedIn}) => {
    return (
        <>
    {isLoggedIn === "Yes" ? (
      <>
      <Stack.Navigator screenOptions={{ headerTransparent: true, headerTitle: '',}}>
          <Stack.Screen name="Home">
            {() => <Home handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Article" component={Article}/>
          <Stack.Screen name="Question" component={Question}/>
          <Stack.Screen name="Answer" component={Answer} />
      </Stack.Navigator>
    </>
    ) : (
        <Stack.Navigator screenOptions={{ headerTransparent: true,headerTitle: '',}}>
          <Stack.Screen name="Authenticate">
            {() => <Authenticate handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
    )}
    </>
    )
}

export default Navigation
