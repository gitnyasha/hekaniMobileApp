import React, {useState} from 'react'
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

const LoginForm = () => {
    const [ user, setUser ] = useState({
        email: '',
        password: '',
        error: '',
    })

    const [ error, setError ] = useState('');

    const { email, password } = user;
    const signin = async () => {
        const response = await server.post(
            `/sessions`,
            {
                user: {
                    email: email,
                    password: password,
                }
            },
            { 
                withCredentials: true 
            },
            {
                headers: { 
                    'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com' 
                },
            }
        ).then(response => {
            // if (response.data.logged_in) {
            //     handleLogin(response.data);
            // }
            console.log(response.data);

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

        return true;
    }

    const submitForm = () => {
        if (isValidForm()) {
            signin();
        }
    }
    return (
        <FormContainer>
            {error ? <Text style={{ color: 'red', fontSize: 14, textAlign: 'center' }}>{error}</Text> : null}
            <FormInput value={email} onChangeText={value => handleOnChangeText(value, 'email')} autoCapitalize='none' label="Email" placeholder="Enter email" />
            <FormInput value={password} onChangeText={(value) => handleOnChangeText(value, 'password')} secureTextEntry autoCapitalize='none' label="Password" placeholder="Enter password" />
            <FormButton label="Login" onPress={submitForm} />
        </FormContainer>
    )
}

export default LoginForm
