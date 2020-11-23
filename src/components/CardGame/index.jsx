import React from 'react'
import { card, title, success, failure, statistic, statisticContainer, statisticSection} from './CardGame.module.scss';

const getFormattedDate = (date) => {
    const jsDate = new Date(date)
    const formattedDate = jsDate.toLocaleDateString('en-US');
    const formattedTime = jsDate.toLocaleTimeString('en-US');

    return `${formattedDate} - ${formattedTime}`;
}

const getAccuracy = (turns) => {
    const NUMBER_SHIPS_POSITION = 20;

    const accuracy = (NUMBER_SHIPS_POSITION / turns) * 100;

    return accuracy.toFixed(2);
}

const CardGame = ({startAt, finishAt, won, turns, numberGame}) => {
    return (
        <div className={card}>
            <p className={title}>Game {numberGame} - <span className={won ? success : failure}>{won ? 'WIN' : 'LOOSE'}</span></p>
            <div className={statisticContainer}>
                <div className={statisticSection}>
                    <p className={statistic}>Started at: <span>{getFormattedDate(startAt)}</span></p>
                    <p className={statistic}>Finished at: <span>{getFormattedDate(finishAt)}</span></p>
                </div>
                <div className={statisticSection}>
                    <p className={statistic}>Turns: <span>{turns}</span></p>
                    <p className={statistic}>Accuracy: <span>{getAccuracy(turns)}%</span></p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardGame)
