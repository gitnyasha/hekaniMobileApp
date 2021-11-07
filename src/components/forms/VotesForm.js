import React, {useState} from 'react'
import { Alert } from 'react-native'
import FormContainer from './FormContainer'
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
                    'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com/api/v1' 
                },
            }
        ).then(response => {
            if (response.data.status === 'success') {
                Alert.alert('Success', response.data.message);
            } else {
                Alert.alert('Error', response.data.message);
            }
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
