import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

const ActivityIndicator = () => {
    return (
        <View style={{ height: "100%", width: "100%",flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LottieView 
            source={require('../../../assets/8707-loading.json')} 
            autoPlay 
            loop 
            />
        </View>
    )
}

export default ActivityIndicator
