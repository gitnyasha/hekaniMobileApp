import React, { Children } from 'react'
import { View, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'

const FormContainer = ({children}) => {
    return (
        <KeyboardAvoidingView 
            style={styels.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
        >
           {children}
        </KeyboardAvoidingView>
    )
}

const styels = StyleSheet.create({
    container: { 
        width: Dimensions.get('window').width, 
        padding: 20,
    }
})

export default FormContainer
