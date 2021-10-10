import React from 'react'
import HorizontalList from './HorizontalList'
import VerticalList from './VerticalList'

const Articles = ({ data }) => {
    return (
        <>
        <HorizontalList title="Featured" data={data} />
        <VerticalList title="Recent" data={data} />
        </>
    )
}

export default Articles
