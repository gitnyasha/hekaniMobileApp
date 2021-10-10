import React from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'

const SignUpForm = () => {
    return (
        <FormContainer>
            <FormInput title="Email" placeholder="Enter email" />
            <FormInput title="Password" placeholder="Enter password" />
            <FormInput title="Confirm Password" placeholder="Confirm password" />
            <FormButton title="Sign Up" />
        </FormContainer>
    )
}

export default SignUpForm
