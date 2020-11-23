import React from 'react'
import { menu } from './Menu.module.scss';

const Menu = ({ options }) => {
    return (
        <ul className={menu}>
            {options.map((opt, i) => (
                <li key={i}>{opt}</li>
            ))}
        </ul>
    )
}

export default Menu
