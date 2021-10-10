import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/nav/Navigation';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import FormHeader from './src/components/forms/FormHeader';
import FormSelect from './src/components/forms/FormSelect';
import LoginForm from './src/components/forms/LoginForm';
import SignUpForm from './src/components/forms/SignUpForm';

const width = Dimensions.get('window').width;

export default function App() {
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