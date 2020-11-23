import React, { useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './views/Home'
import Game from './views/Game'
import Settings from './views/Settings'
import DifficultyContext from './contexts/DifficultyContext'
import difficultyEnum from './enums/difficultyEnum'
import BgVideo from './components/BgVideo'
import History from './views/History'

const App = () => {
    const [difficulty, setDifficulty] = useState(difficultyEnum.EASY)

    return (
        <DifficultyContext.Provider value={{
            difficulty,
            setDifficulty
        }}>
            <BgVideo />
            <BrowserRouter>
                <Switch>
                    <Route path='/game'>
                        <Game />
                    </Route>
                    <Route path='/settings'>
                        <Settings />
                    </Route>
                    <Route path='/history'>
                        <History />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </BrowserRouter>
        </DifficultyContext.Provider>
    )
}

export default App
