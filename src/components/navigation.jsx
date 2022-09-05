import React, { useState } from 'react'
import { Link } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Flex } from '../styles/global'
import { NavHeader, CloseNav, NavList, Nav, NavFooter, NavVideos } from '../styles/navigation'

import featuredVideo from '../assets/video/featured-video.mp4'
import easyVideo from '../assets/video/easy.mp4'
import makeItZeroVideo from '../assets/video/make-it-zero.mp4'
import itTakesAnIslandVideo from '../assets/video/it-takes-an-island.mp4'
import beachesVideo from '../assets/video/50-beaches.mp4'

const navRoutes = [
    { id: 0, title: 'not humble', path: 'not-humble', video: featuredVideo },
    { id: 1, title: 'bleeping easy', path: 'bleeping-easy', video: easyVideo },
    { id: 2, title: 'make it zero', path: 'make-it-zero', video: makeItZeroVideo },
    { id: 3, title: 'it takes an island', path: '/it-takes-an-island', video: itTakesAnIslandVideo },
    { id: 4, title: '50 beaches', path: '50-beaches', video: beachesVideo },
]

const Navigation = ({ toggleMenu, setToggleMenu, addCursor, removeCursor }) => {
    const [revealVideo, setRevealVideo] = useState({
        show: false,
        video: featuredVideo,
        key: 0,
    })

    return (
        <>
            <AnimatePresence>
                {toggleMenu && (
                    <Nav
                        initial={{ x: '-100%' }}
                        exit={{ x: '-100%' }}
                        animate={{ x: toggleMenu ? 0 : '-100%' }}
                        transition={{
                            duration: .8,
                            ease: [.6, .05, -.01, .9],
                        }}
                    >
                        <Container>
                            <NavHeader>
                                <Flex
                                    spaceBetween
                                    noHeight
                                >
                                    <h2>Projects</h2>
                                    <CloseNav
                                        onClick={() => setToggleMenu(!toggleMenu)}
                                        onMouseEnter={() => addCursor('pointer')}
                                        onMouseLeave={() => removeCursor('pointer')}
                                    >
                                        <button>
                                            <span/>
                                            <span/>
                                        </button>
                                    </CloseNav>
                                </Flex>
                            </NavHeader>
                            <NavList>
                                <ul>
                                    {
                                        navRoutes.map(route => (
                                            <motion.li
                                                key={route.id}
                                                onHoverStart={() => setRevealVideo({
                                                    show: true,
                                                    video: route.video,
                                                    key: route.id,
                                                })}
                                                onHoverEnd={() => setRevealVideo({
                                                    show: false,
                                                    video: route.video,
                                                    key: route.id,
                                                })}
                                                onMouseEnter={() => addCursor('pointer')}
                                                onMouseLeave={() => removeCursor('pointer')}
                                            >
                                                <Link to={`/projects/${route.path}`}>
                                                    <motion.div
                                                        initial={{
                                                            x: '-108px',
                                                        }}
                                                        whileHover={{
                                                            x: -40,
                                                            transition: {
                                                                duration: .4,
                                                                ease: [.6, .05, -.01, .9],
                                                            },
                                                        }}
                                                        className='link'
                                                    >
                                                        <span className='arrow'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                viewBox='0 0 101 57'
                                                            >
                                                                <path
                                                                    d='M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z'
                                                                    fill='#FFF'
                                                                    fillRule='evenodd'
                                                                />
                                                            </svg>
                                                        </span>
                                                        {route.title}
                                                    </motion.div>
                                                </Link>
                                            </motion.li>
                                        ))
                                    }
                                </ul>
                            </NavList>
                            <NavFooter></NavFooter>
                            <NavVideos>
                                <motion.div
                                    animate={{ width: revealVideo.show ? 0 : '100%' }}
                                    className='reveal'
                                />
                                <div className='video'>
                                    <AnimatePresence initial={false} exitBeforeEnter>
                                        <motion.video
                                            key={revealVideo.key}
                                            src={revealVideo.video}
                                            initial={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            animate={{ opacity:1 }}
                                            transition={{
                                                duration: .2,
                                                ease: 'easeInOut',
                                            }}
                                            loop
                                            muted
                                            autoPlay
                                        />
                                    </AnimatePresence>
                                </div>
                            </NavVideos>
                        </Container>
                    </Nav>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navigation