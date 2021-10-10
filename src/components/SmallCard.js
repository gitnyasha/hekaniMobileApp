import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Card from './Card'

const { width } = Dimensions.get('window');

const SmallCard = ({item}) => {
    return (
        <Card
        item={item} 
        style={styles.container}
        imageStyle={styles.image}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        width: width / 2,
        height: 200,
        marginRight: 10,
    },

    image: {
        height: 100,
    }
});

export default SmallCard
