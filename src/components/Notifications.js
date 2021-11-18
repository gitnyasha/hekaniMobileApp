import React from 'react'
import { Button, Text, View } from 'react-native';

function Notifications() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No New Notifications!</Text>
        <Button 
        onPress={() => navigation.goBack()}
        title="Go back home"
        />
        </View>
    )
}

export default Notifications
