import React from 'react'
import { btn } from './Button.module.scss'
import { Link } from 'react-router-dom'


const Button = ({ link, handleClick = () => {}, children }) => {

    const primaryButton = (
        <button onClick={handleClick} className={btn}>
            <span>{children}</span>
        </button>
    )


    const renderBtn = () => {
        return link ? (
            <Link to={link}>
                {primaryButton}
            </Link>
            )
            : primaryButton
    }

    return (
        renderBtn()
    )
}

export default Button
