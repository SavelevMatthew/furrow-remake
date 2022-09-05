import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import { HeaderNav, Logo, Menu } from '../styles/header'
import { Container, Flex } from '../styles/global'

import { useGlobalDispatchContext, useGlobalStateContext } from '../context/global'

const Header = ({ addCursor, removeCursor, toggleMenu, setToggleMenu }) => {
    const { currentTheme } = useGlobalStateContext()
    const dispatch = useGlobalDispatchContext()

    const handleThemeSwitch = () => {
        dispatch({
            type: 'TOGGLE_THEME',
            payload: currentTheme === 'dark' ? 'light' : 'dark',
        })
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('theme', currentTheme)
        }
    }, [currentTheme])

    return (
        <HeaderNav
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -72, opacity: 0 }}
            transition={{ duration: 1, ease: [.6, .05, -.01, .9] }}
        >
            <Container>
                <Flex spaceBetween noHeight>
                    <Logo
                        onMouseEnter={() => addCursor('hover')}
                        onMouseLeave={() => removeCursor('hover')}
                    >
                        <Link to='/'>FURR</Link>
                        <span
                            onClick={handleThemeSwitch}
                            onMouseEnter={() => addCursor('pointer')}
                            onMouseLeave={() => removeCursor('pointer')}
                        />
                        <Link to='/'>W</Link>
                    </Logo>
                    <Menu
                        onClick={() => setToggleMenu(!toggleMenu )}
                        onMouseEnter={() => addCursor('pointer')}
                        onMouseLeave={() => removeCursor('pointer')}
                    >
                        <button>
                            <span/>
                            <span/>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    )
}

export default Header