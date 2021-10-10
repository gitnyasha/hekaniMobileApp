import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SmallCard from '../cards/SmallCard'
import Title from '../Title'
import { useNavigation } from '@react-navigation/native'

const HorizontalList = ({title, data}) => {
    const navigation = useNavigation();
    return (
        <>
            <Title size={20}>
                {title}
            </Title>
            <FlatList 
            data={data} 
            keyExtractor={item => item.id} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <SmallCard onPress={() => navigation.navigate('Article', {item})} item={item}/>}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default HorizontalList
