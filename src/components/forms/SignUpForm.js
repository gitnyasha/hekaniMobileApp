import React from 'react'
import { View, Text } from 'react-native'

const SignUpForm = () => {
    return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Sign Up Form
          </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container = { 
        width: Dimensions.get('window').width, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "navy" 
    }
})

export default SignUpForm
