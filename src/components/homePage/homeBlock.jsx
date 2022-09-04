import React, { useEffect, useRef } from 'react'
import { Block, Video, Title, Canvas, HeadLine } from '../../styles/home'
import videoSource from '../../assets/video/video.mp4'
import useWindowSize from '../../hooks/useWindowSize'
import { useGlobalStateContext } from '../../context/global'
import { darkTheme, lightTheme } from '../../themes'

const parentAnimation = {
    initial: { y: 800 },
    animate: {
        y: 0,
        transition: {
            staggerChildren: .2,
        },
    },
}

const childAnimation = {
    initial: { y: 800 },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [.6, .05, -.01, .9],
        },
    },
}


const HomeBlock = ({ addCursor, removeCursor }) => {
    const { currentTheme } = useGlobalStateContext()
    const size = useWindowSize()
    const canvas = useRef(null)

    useEffect(() => {
        const theme = currentTheme === 'dark' ? darkTheme : lightTheme
        const renderCanvas = canvas.current
        const drawingCanvas = renderCanvas.cloneNode()

        const drawingCtx = drawingCanvas.getContext('2d')
        const renderingCtx = renderCanvas.getContext('2d')

        let lastX
        let lastY
        let moving = false

        renderingCtx.globalCompositeOperation = 'source-over'
        renderingCtx.fillStyle = theme.background
        renderingCtx.fillRect(0, 0, size.width, size.height)

        const moveStartHandle = (e) => {
            moving = true
            lastX = e.pageX - renderCanvas.offsetLeft
            lastY = e.pageY - renderCanvas.offsetTop
        }

        const moveEndHandle = (e) => {
            moving = false
            lastX = e.pageX - renderCanvas.offsetLeft
            lastY = e.pageY - renderCanvas.offsetTop
        }

        const drawHandle = (e) => {
            if (moving) {
                drawingCtx.globalCompositeOperation = 'source-over'
                renderingCtx.globalCompositeOperation = 'destination-out'
                let currentX = e.pageX - renderCanvas.offsetLeft
                let currentY = e.pageY - renderCanvas.offsetTop
                drawingCtx.lineJoin = 'round'
                drawingCtx.moveTo(lastX, lastY)
                drawingCtx.lineTo(currentX, currentY)
                drawingCtx.closePath()
                drawingCtx.stroke()
                drawingCtx.lineWidth = 120
                lastX = currentX
                lastY = currentY
                renderingCtx.drawImage(drawingCanvas, 0, 0)
            }
        }

        renderCanvas.addEventListener('mouseover', moveStartHandle)
        renderCanvas.addEventListener('mouseup', moveEndHandle)
        renderCanvas.addEventListener('mousemove', drawHandle)

        return () => {
            renderCanvas.removeEventListener('mouseover', moveStartHandle)
            renderCanvas.removeEventListener('mouseup', moveEndHandle)
            renderCanvas.removeEventListener('mousemove', drawHandle)
        }
    }, [size, currentTheme])

    return (
        <Block>
            <Video>
                <video
                    width='100%'
                    height='100%'
                    loop
                    autoPlay
                    muted
                    src={videoSource}
                />
            </Video>
            <Canvas
                ref={canvas}
                width={size.width}
                height={size.height}
                onMouseEnter={() => addCursor('hover')}
                onMouseLeave={() => removeCursor('hover')}
            />
            <Title variants={parentAnimation} initial='initial' animate='animate'>
                <HeadLine variants={childAnimation}>DIG</HeadLine>
                <HeadLine variants={childAnimation}>DEEP</HeadLine>
            </Title>
        </Block>
    )
}

export default HomeBlock