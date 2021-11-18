import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from '../Article'
import Question from '../Question';
import Home from '../Home';
import Answer from '../Answer';
import QuestionForm from '../forms/QuestionForm';

const Stack = createNativeStackNavigator();

const Navigation = ({handleLogin, handleLogout, isLoggedIn}) => {
    return (
      <Stack.Navigator screenOptions={{ headerTransparent: true, headerTitle: '',}}>
          <Stack.Screen name="Home">
            {() => <Home handleLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Article" component={Article}/>
          <Stack.Screen name="Question" component={Question}/>
          <Stack.Screen name="Answer" component={Answer} />
          <Stack.Screen name="QuestionForm" component={QuestionForm} />
      </Stack.Navigator>
    )
}

export default Navigation
