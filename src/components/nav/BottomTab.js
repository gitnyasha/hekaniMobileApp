import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import Questions from '../Questions';
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
          tabBarIcon: ({ focused, color, size }) => {
         let iconName;
         if (route.name === 'Profile') {
            iconName = focused
            ? 'profile'
            : 'profile';
          } else if (route.name === 'Following') {
            iconName = focused
            ? 'addusergroup'
            : 'addusergroup';
          } else if (route.name === 'Articles') {
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
          tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Articles" component={Navigation} />
            <Tab.Screen name="Profile" component={UserProfile} />
            <Tab.Screen name="Following" component={Questions} />
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
