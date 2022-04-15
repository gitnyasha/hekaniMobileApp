import React from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const FormButton = ({label, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View  style={styles.container}>
            <Text style={{ fontSize: 16, color: "#fff" }}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    }
})

export default FormButton
