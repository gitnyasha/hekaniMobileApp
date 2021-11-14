import React from 'react'
import HorizontalList from './lists/HorizontalList'
import VerticalList from './lists/VerticalList'

const Articles = ({ data }) => {
    return (
        <>
        {/* <HorizontalList title="Featured" data={data} /> */}
        <VerticalList title="Recent" data={data} />
        </>
    )
}

export default Articles
