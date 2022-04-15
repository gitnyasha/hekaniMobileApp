import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import Answers from '../Answers';
import UserProfile from '../UserProfile';
import Navigation from './Navigation';
import Authenticate from '../Authenticate'
import Notifications from '../Notifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab({handleLogin, handleLogout, isLoggedIn}) {
    return (
      <>
      {isLoggedIn === "Yes" ? (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
         let iconName;
         if (route.name === 'Profile') {
            iconName = focused
            ? 'user'
            : 'user';
          } else if (route.name === 'Q&A') {
            iconName = focused
            ? 'profile'
            : 'profile';
          } else if (route.name === 'News') {
            iconName = focused
            ? 'filetext1'
            : 'filetext1';
          } else if (route.name === 'Notifications') {
            iconName = focused
            ? 'notification'
            : 'notification';
          }
          return <AntDesign name={iconName} size={size} color={color}     />;
            },
          })
        }
        >
            <Tab.Screen name="News" component={Navigation} />
            <Tab.Screen name="Q&A" component={Answers} />
            <Tab.Screen name="Profile" component={UserProfile} />
            <Tab.Screen name="Notifications" component={Notifications} />
        </Tab.Navigator>
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

export default BottomTab
