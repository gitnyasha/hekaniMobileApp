import React, {useState} from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native'
import server from '../../api/server'
import { FontAwesome5 } from '@expo/vector-icons';

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
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
        >        
        <FontAwesome5 style={styles.voteBtn} onPress={submitForm} name="thumbs-up" size={28} color="#aaa" />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    voteBtn: {
        marginBottom: -8,
        paddingLeft: 15,
    },
});

export default VotesForm
