import React from 'react'
import spaceStatusEnum from '../../enums/spaceStatusEnum';
import styles from './Position.module.scss';

const getClass = (status) => {
    switch(status) {
        case spaceStatusEnum.SEA:
            return styles.initial;
        case spaceStatusEnum.MISSED:
            return styles.missed;
        case spaceStatusEnum.SHOOT:
            return styles.shoot;
        case spaceStatusEnum.SUNK:
            return styles.sunk;

        default:
            return styles.initial
    }
}
 
const Position = ({ status, onClick, column, row }) => {
    const positionInGrid = {
        gridColumn: `${column}/${column + 1}`,
        gridRow: `${row}/${row + 1}`,
    }
 
    return (
        <div onClick={onClick} style={positionInGrid} className={`${styles.position} ${getClass(status)}`}>
            &nbsp;
        </div>
    )
}

export default React.memo(Position)
