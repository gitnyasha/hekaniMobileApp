import React from 'react'
import { Text } from 'react-native'

const Title = ({children, numberOfLines = 2, size = 18}) => {
    return <Text style={{ fontWeight: 'bold', fontSize: size }} numberOfLines={numberOfLines}>{children}</Text>
}

export default Title;
