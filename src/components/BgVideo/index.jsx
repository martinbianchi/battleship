import React from 'react'
import {bgVideo, bgVideoContent } from './BgVideo.module.scss';
import video from '../../assets/Sail-Away.mp4'

const BgVideo = () => {
    return (
        <div className={bgVideo}>
        <video className={bgVideoContent} autoPlay muted loop>
            <source src={video} type="video/mp4" />
            Your browser is not supported!
        </video>
    </div>
    )
}

export default BgVideo
