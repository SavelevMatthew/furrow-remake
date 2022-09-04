import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Cursor } from '../styles/global'
import { useGlobalStateContext } from '../context/global'

const CustomCursor = () => {
    const { cursorTypes } = useGlobalStateContext()
    const [mousePos, setMousePos] = useState({
        x: 400,
        y: 400,
    })

    const onMouseMove = (event) => {
        const { pageX: x, pageY: y } = event
        setMousePos({ x, y })
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    const cursorClass = classNames({
        'cursor-hover': Array.isArray(cursorTypes) && cursorTypes.includes('hover'),
        'cursor-pointer': Array.isArray(cursorTypes) && cursorTypes.includes('pointer'),
    })

    return (
        <Cursor
            className={cursorClass}
            style={{ left: mousePos.x, top: mousePos.y }}
        />
    )
}

export default CustomCursor