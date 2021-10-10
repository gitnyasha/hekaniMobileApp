import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/nav/Navigation';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import FormHeader from './src/components/forms/FormHeader';
import FormSelect from './src/components/forms/FormSelect';


export default function App() {
  return (
    // <NavigationContainer>
    //   <Navigation />
    // </NavigationContainer>
    <View style={{ flex: 1, paddingTop: 80 }}>
      <View style={{ height: 100}}>
        <FormHeader leftHeading='Left' rightHeading="Right" />
      </View>
      <View style={{ flexDirection:  "row", padding: 10 }}>
        <FormSelect style={styles.borderLeft} backgroundColor="navy" title="Login" />
        <FormSelect style={styles.borderRight} backgroundColor="grey" title="Signup" />
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        
        <View style={{ width: Dimensions.get('window').width, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Sign Up
          </Text>
        </View>
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