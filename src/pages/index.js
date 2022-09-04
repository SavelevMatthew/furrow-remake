import React from 'react'
import Layout from '../components/layout'
import HomeBlock from '../components/homePage/homeBlock'
import { useGlobalDispatchContext } from '../context/global'

const IndexPage = () => {
    const dispatch = useGlobalDispatchContext()

    const addCursor = (cursor) => {
        dispatch({ type: 'ADD_CURSOR_TYPE', payload: cursor })
    }

    const removeCursor = (cursor) => {
        dispatch({ type: 'REMOVE_CURSOR_TYPE', payload: cursor })
    }

    return (
        <Layout>
            <HomeBlock addCursor={addCursor} removeCursor={removeCursor} />
        </Layout>
    )
}

export default IndexPage
