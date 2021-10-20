import React, {useState} from 'react'
import { Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const ArticleForm = ({articleId}) => {
    const [ article, setArticle ] = useState({
        title: '',
    })

    const { title } = article;
    const submitForm = async () => {
        const response = await server.post(
            `/articles/${articleId}/replies`,
            {
                title: title,
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

            if (response.data.status === 'success') {
                console.log('success')             
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setArticle({ ...article, [fieldName]: value });
    };

    return (
        <FormContainer>
            <FormInput value={title} onChangeText={value => handleOnChangeText(value, 'title')} autoCapitalize='none' label="Comment" placeholder="Comment..." />
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

export default ArticleForm
