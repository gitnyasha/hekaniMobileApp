import React from 'react'
import { ScrollView, StyleSheet, StatusBar } from 'react-native'

const Screen = ({children}) => {
    return (
        <ScrollView style={styles.container}>
            {
                children
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f3',
        flex: 1
    },
})

export default Screen
