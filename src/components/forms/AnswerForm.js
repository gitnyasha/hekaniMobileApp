import React, {useState} from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const AnswerForm = ({questionid}) => {
    const [ answer, setAnswer ] = useState({
        title: '',
    })

    const { title } = answer;
    const submitForm = async () => {
        const response = await server.post(
            `/questions/${questionid}/answers`,
            {
                title: title,
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
                console.log('success')             
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setAnswer({ ...answer, [fieldName]: value });
    };

    return (
        <FormContainer>
            <FormInput value={title} onChangeText={value => handleOnChangeText(value, 'title')} autoCapitalize='none' label="Comment" placeholder="Answer..." />
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

export default AnswerForm
