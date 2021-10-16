import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Authenticate from '../Authenticate';
import Home from '../Home';

const Drawer = createDrawerNavigator();

export default function MyApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Authenticate" component={Authenticate} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}