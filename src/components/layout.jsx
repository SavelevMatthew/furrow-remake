import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'

import { lightTheme, darkTheme } from '../themes'

import Header from './header'
import CustomCursor from './customCursor'

import { useGlobalStateContext, useGlobalDispatchContext } from '../context/global'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    cursor: none;
  }
  
  html {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`

const Layout = ({ children }) => {
    const dispatch = useGlobalDispatchContext()
    const { currentTheme } = useGlobalStateContext()

    const addCursor = (cursor) => {
        dispatch({ type: 'ADD_CURSOR_TYPE', payload: cursor })
    }

    const removeCursor = (cursor) => {
        dispatch({ type: 'REMOVE_CURSOR_TYPE', payload: cursor })
    }

    return (
        <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle/>
            <CustomCursor/>
            <Header addCursor={addCursor} removeCursor={removeCursor} />
            <main>{children}</main>
        </ThemeProvider>
    )
}


Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
