import React, { useState } from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater('');
    }, 3000);
}

const isValidEmail = (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value)
}

const SignUpForm = () => {
    const [ user, setUser ] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        error: '',
    })

    const [ error, setError ] = useState('');

    const { email, password, passwordConfirm } = user;

    const signUp = async () => {
        const response = await server.post(
            `/registrations`,
            {
                user: {
                    email: email,
                    password: password,
                    passwordConfirm: passwordConfirm
                }
            },
            { withCredentials: true },
            {headers: { 'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com'},} 
        ).then(response => {
            if (response.data.status === "created") {
                this.handleSuccess(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setUser({ ...user, [fieldName]: value });
    };

    const isValidForm = () => {
       
        if (!isValidEmail(email)) return updateError('Invalid email', setError)

        if (!password.trim() || password.length < 8) return updateError('Enter minimum of 8 characters', setError)

        if (password !== passwordConfirm) return updateError('Passwords do not match', setError)

        return true;
    }

    const submitForm = () => {
        if (isValidForm()) {
            signUp();
        }
    }

    return (
        <FormContainer>
            {error ? <Text style={{ color: 'red', fontSize: 14, textAlign: 'center' }}>{error}</Text> : null}
            <FormInput value={email} onChangeText={value => handleOnChangeText(value, 'email')} autoCapitalize='none' label="Email" placeholder="Enter email" />
            <FormInput value={password} onChangeText={(value) => handleOnChangeText(value, 'password')} secureTextEntry autoCapitalize='none' label="Password" placeholder="Enter password" />
            <FormInput value={passwordConfirm} onChangeText={(value) => handleOnChangeText(value, 'passwordConfirm')} secureTextEntry autoCapitalize='none' label="Confirm Password" placeholder="Confirm password" />
            <FormButton onPress={submitForm} label="Sign Up" />
        </FormContainer>
    )
}

export default SignUpForm
