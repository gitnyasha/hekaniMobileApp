import React from 'react'
import Card from './cards/Card'
import { useNavigation } from '@react-navigation/native'

const Featured = ({item }) => {
    const navigation = useNavigation();
    return <Card onPress={() => navigation.navigate('Article', {item})} item={item} style={{ marginVertical: 15 }} title="Featured" />;
}

export default Featured
