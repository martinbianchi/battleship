import React from 'react';

import { board as boardClass, coord } from './Board.module.scss';
import Position from '../Position';

const Board = ({ board, shootToPosition }) => {
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ''];
  const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']


  return (
    <>
      <div className={boardClass}>
        {board && board.map((row, i) => {
          return row.map((pos, j) => {
            return (
              <Position key={`${i}${j}`} onClick={() => shootToPosition(i, j)} row={i + 1} column={j + 1} status={pos.status}></Position>
            )
          })
        })}

        {rows.map((val, i) => (
          <div key={`row${i}`} className={coord} style={{ gridColumn: 11 / 12, gridRow: `${i + 1}/${i + 2}` }}>{val}</div>
        ))}
        {columns.map((val, i) => (
          <div key={`col${i}`} className={coord} style={{ gridRow: 11 / 12, gridColumn: `${i + 1}/${i + 2}` }}>{val}</div>
        ))}
      </div>
    </>
  )
}

export default Board
