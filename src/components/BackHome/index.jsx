import React from 'react'
import { Link } from 'react-router-dom';
import { back } from './BackHome.module.scss';

const BackHome = () => {
    return (
        <Link to="/" className={back}><span>&larr;</span></Link>
    )
}

export default BackHome
