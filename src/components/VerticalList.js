import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import FlatCard from './FlatCard'
import Title from './Title'

const VerticalList = ({title, data}) => {
    return (
        <>
            <Title size={20}>
                {title}
            </Title>
            <View style={styles.container}>
                {data.map((item) => <FlatCard item={item} key={item.id} />)}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    }
})

export default VerticalList
