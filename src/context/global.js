import React, { createContext, useReducer, useContext } from 'react'

const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

const INITIAL_STATE = {
    currentTheme: (typeof window !== 'undefined' && window.localStorage.getItem('theme')) || 'dark',
}

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME': {
            return {
                ...state,
                currentTheme: action.payload,
            }
        }
        default: {
            throw new Error('unhandled action.type')
        }
    }
}

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, INITIAL_STATE)

    return (
        <GlobalDispatchContext.Provider value={dispatch}>
            <GlobalStateContext.Provider value={state}>
                {children}
            </GlobalStateContext.Provider>
        </GlobalDispatchContext.Provider>
    )
}

export const useGlobalStateContext = () => useContext(GlobalStateContext)
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)