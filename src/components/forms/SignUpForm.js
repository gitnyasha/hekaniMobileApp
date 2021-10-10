import React from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const SignUpForm = () => {

    const signUp = async (values) => {
        const response = await server.post(
            `/registrations`,
            { 
                withCredentials: true 
            },
            {
                headers: { 
                    'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com' 
                },
            }, 
            {
                ...values
            }
        );
    }

    return (
        <FormContainer
            onSubmit={signUp}
        >
            <FormInput title="Email" placeholder="Enter email" />
            <FormInput title="Password" placeholder="Enter password" />
            <FormInput title="Confirm Password" placeholder="Confirm password" />
            <FormButton title="Sign Up" />
        </FormContainer>
    )
}

export default SignUpForm
