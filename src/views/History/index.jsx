import React from 'react'
import usePastGames from '../../hooks/usePastGames'
import CardGame from '../../components/CardGame';
import { history as historyClass, games as gamesClass } from './History.module.scss';
import BackHome from '../../components/BackHome';

const History = () => {
    const games = usePastGames();
    const filteredGames = games ? Object.values(games)?.filter(game => game.finishAt) : [];
    
    return (
        <>
            <BackHome />
            <div className={historyClass}>
                <h1 className="headline">Past games</h1>
                <div className={gamesClass}>
                    {filteredGames.map((game, i) => (
                        <CardGame 
                            finishAt={game.finishAt}
                            numberGame={i + 1}
                            startAt={game.startAt}
                            turns={game.turns}
                            won={game.won}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default History
