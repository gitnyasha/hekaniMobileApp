import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Test = () => {
    return (
        <View>
            <TouchableWithoutFeedback style={styles.button}>
                <FontAwesome5 name="plus" size={30} color="black" />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
    }
})

export default Test
