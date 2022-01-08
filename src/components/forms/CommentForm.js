import React, {useState, useRef} from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'

const CommentForm = ({answerid}) => {
    // useRef
    const _editor = useRef();
    const [ comment, setComment ] = useState({
        title: '',
    })

    const { title } = comment;
    const submitForm = async () => {
        const response = await server.post(
            `/answers/${answerid}/comments`,
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
        setComment({ ...comment, [fieldName]: value });
    };

    return (
        <FormContainer style={styles.commentForm}>
            <FormInput style={styles.input} value={title} onChangeText={value => handleOnChangeText(value, 'title')} autoCapitalize='none' label="Comment" placeholder="Comment..." />
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
      },
      root: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eaeaea',
      },
      editor: {
        flex: 1,
        padding: 0,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
        height: 300,
      },
      commentForm: {
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
        height: 300,
        flexDirection: 'row',
        },
});

export default CommentForm
