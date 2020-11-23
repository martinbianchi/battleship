import React, { useContext } from 'react'
import difficultyEnum from '../../enums/difficultyEnum'
import { settings } from './Settings.module.scss'

import RadioButton from '../../components/RadioButton'
import Menu from '../../components/Menu'
import DifficultyContext from '../../contexts/DifficultyContext'
import BackHome from '../../components/BackHome'

const Settings = () => {
    const {difficulty, setDifficulty} = useContext(DifficultyContext);

    const options = [
        <RadioButton name="difficulty" handleSelect={() => setDifficulty(difficultyEnum.EASY)} selected={difficultyEnum.EASY === difficulty} value={difficultyEnum.EASY}>Easy</RadioButton>,
        <RadioButton name="difficulty" handleSelect={() => setDifficulty(difficultyEnum.MEDIUM)} selected={difficultyEnum.MEDIUM === difficulty} value={difficultyEnum.MEDIUM}>Medium</RadioButton>,
        <RadioButton name="difficulty" handleSelect={() => {console.log("AS"); setDifficulty(difficultyEnum.HARD)}} selected={difficultyEnum.HARD === difficulty} value={difficultyEnum.HARD}>Hard</RadioButton>,
    ]

    return (
        <>
            <BackHome />
            <div className={settings}>
                <h1 className="headline">How good you are?</h1>
                <Menu options={options} />
            </div>
        </>
    )
}

export default Settings
