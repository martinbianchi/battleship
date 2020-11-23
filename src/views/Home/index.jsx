import React from 'react';
import {home} from './Home.module.scss';

import Menu from '../../components/Menu';
import Button from '../../components/Button';

const options = [
    <Button link='/game'>New game</Button>,
    <Button link='/settings'>Settings</Button>,
    <Button link='/history'>Past games</Button>,
]

const Home = () => {
    return (
        <>
            <div className={home}>
                <h1 className="headline">Battleship</h1>
                <Menu options={options} />
            </div>
        </>
    )
}

export default Home
