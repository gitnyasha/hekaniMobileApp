import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const SearchBar = () => {
        return (
                <View style={styles.container}>
                    <TextInput style={styles.searchInput} placeholder="Search..." />
                </View>
        );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 30,
    },
    searchInput: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 16,
    }
})

export default SearchBar;