import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";

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
                Alert.alert(response.data.status);
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
            <FormInput style={styles.input} value={title} onChangeText={value => handleOnChangeText(value, 'title')} autoCapitalize='none' label="Comment" placeholder="Answer..." />
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
    }
});

export default AnswerForm
