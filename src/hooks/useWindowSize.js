import { useState, useEffect, useCallback } from 'react'

export default function useWindowSize () {
    function getSize () {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    const handleResize = useCallback(() => {
        setWindowSize(getSize())
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return windowSize
}

