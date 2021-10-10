import React from 'react'
import { StyleSheet } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'

const LoginForm = () => {
    return (
        <FormContainer>
            <FormInput title="Email" placeholder="Enter email" />
            <FormInput title="Password" placeholder="Enter password" />
            <FormButton title="Login" />
        </FormContainer>
    )
}

export default LoginForm
