import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

const FormSelect = ({title, backgroundColor, style, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, style, {backgroundColor}]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
})

export default FormSelect
