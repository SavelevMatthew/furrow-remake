import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'

import { lightTheme, darkTheme } from '../themes'

import Header from './header'

import { useGlobalStateContext } from '../context/global'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    //cursor: none;
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
    const { currentTheme } = useGlobalStateContext()

    return (
        <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle/>
            <Header/>
            <main>{children}</main>
        </ThemeProvider>
    )
}


Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
