import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import AnswerCard from '../cards/AnswerCard'
import Title from '../Title'
import { useNavigation } from '@react-navigation/native'

const AnswersList = ({title, data}) => {
    const navigation = useNavigation();
    return (
        <>
            <Title size={20}>
                {title}
            </Title>
            <FlatList 
            data={data} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => <AnswerCard onPress={() => navigation.navigate('Answer', {item})} item={item} key={item.id} keyExtractor={(item) => item.toString()}/>}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default AnswersList
