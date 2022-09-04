import React from 'react'
import { GlobalProvider } from './src/context/global'

export const wrapRootElement = ({ element }) => {
    return (
        <GlobalProvider>
            {element}
        </GlobalProvider>
    )
}