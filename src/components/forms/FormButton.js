import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const FormButton = ({title}) => {
    return (
        <TouchableWithoutFeedback>
            <View  style={styles.container}>
            <Text style={{ fontSize: 16, color: "#fff" }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'rgba(27,27,51,0.4)',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default FormButton
