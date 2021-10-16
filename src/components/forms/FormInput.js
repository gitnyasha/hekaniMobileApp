import React from 'react'
import { TextInput, Text, StyleSheet, Button } from 'react-native'

const FormInput = (props) => {
    const {placeholder, label } = props;
    return (
        <>
           <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{label}</Text>
            <TextInput
            {...props}
            style={styles.input}
            placeholder={placeholder}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        marginBottom: 10
    }
});

export default FormInput
