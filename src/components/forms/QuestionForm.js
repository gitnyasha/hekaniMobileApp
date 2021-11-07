import React, {useState} from 'react'
import { Alert, Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'
import { useNavigation } from '@react-navigation/native'

const QuestionForm = () => {
    const navigation = useNavigation();

    const [ question, setQuestion ] = useState({
        title: '',
    })

    const { title } = question;
    const submitForm = async () => {
        const response = await server.post(
            `/questions`,
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
                Alert.alert(response.data.status);
                navigation.navigate('Questions');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setQuestion({...question, [fieldName]: value });
    };

    return (
        <FormContainer>
            <FormInput value={title} onChangeText={value => handleOnChangeText(value, 'title')} label="Ask" placeholder="Question..." />
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

export default QuestionForm
