import React, {useState} from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const VotesForm = ({answerid}) => {
    const submitForm = async () => {
        const response = await server.post(
            `/answers/${answerid}/votes`,
            {
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
            console.log(response.data)             
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <FormContainer>
            <FormButton label="Upvote" onPress={submitForm} />
        </FormContainer>
    )
}

export default VotesForm
