import React from 'react'
import { View, Text } from 'react-native'
import Card from './Card'

const Featured = ({item}) => {
    return <Card item={item} style={{ marginVertical: 15 }} title="Featured" />;
}

export default Featured
