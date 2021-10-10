import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import FlatCard from '../cards/FlatCard'
import Title from '../Title'
import { useNavigation } from '@react-navigation/native'

const VerticalList = ({title, data}) => {
    const navigation = useNavigation();

    return (
        <>
            <Title size={20}>
                {title}
            </Title>
            <View style={styles.container}>
                {data.map((item) => <FlatCard onPress={() => navigation.navigate('Article', {item})} item={item} key={item.id} />)}
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
