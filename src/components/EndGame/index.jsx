import React from 'react'
import Button from '../Button'

import {endGame, message, actions } from './EndGame.module.scss'

const Card = ({ header, text, restartGame }) => {
    return (
        <div className={endGame}>
            <h1 className="headline">{header}</h1>
            <p className={message}>{text}</p>
            <div className={actions}>
                <Button link="/">Back home</Button>
                <Button link="/game" handleClick={restartGame}>Try again</Button>
            </div>
        </div>
    )
}

export default Card
