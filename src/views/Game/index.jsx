import React, { useState, useEffect, useContext } from 'react'
import DifficultyContext from '../../contexts/DifficultyContext';

import { game, titleClass, finished } from './Game.module.scss';
import * as firebase from '../../firebase/index'

import spaceStatusEnum from '../../enums/spaceStatusEnum';
import { deepCopy } from '../../utils';
import { generateBoard, setShips } from '../../services/boardService';
import { isLandShoot, isShipSunk } from '../../services/gameService';

import Board from '../../components/Board'
import BackHome from '../../components/BackHome';
import EndGame from '../../components/EndGame';

const ships = [
  { id: 's1', shipLongitude: 4 },
  { id: 's2', shipLongitude: 3 },
  { id: 's3', shipLongitude: 3 },
  { id: 's4', shipLongitude: 2 },
  { id: 's5', shipLongitude: 2 },
  { id: 's6', shipLongitude: 2 },
  { id: 's7', shipLongitude: 1 },
  { id: 's8', shipLongitude: 1 },
  { id: 's9', shipLongitude: 1 },
  { id: 's10', shipLongitude: 1 }
]

const renderFinishGame = (hasWon, restartGame) => {
  const header = hasWon ? 'Congratulations!' : 'Probably bad luck';
  const text = hasWon ? 'You defeated me! But I bet you that you will not do it again' : 'Don\'t feel bad. Not too many can beat me'

  return <EndGame header={header} text={text} restartGame={restartGame} />
}

const Game = () => {
  const { difficulty } = useContext(DifficultyContext)
  const [boardId, setBoardId] = useState();
  const [board, setBoard] = useState();
  const [turn, setTurn] = useState(1);
  const [sunkedShips, setSunkedShips] = useState(0);

  const [finishedGame, setFinishedGame] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initGame();
  }, [])

  useEffect(() => {
    firebase.updateGame(board, boardId)
  }, [board, boardId])

  useEffect(() => {
    if (sunkedShips === ships.length) {
      finishGame(true)
    }
  }, [sunkedShips])

  const initGame = () => {
    const board = setShips(generateBoard(10, 10), ships)
    setBoard(board)
    firebase.createGame(board, setBoardId)

  }

  const shootToPosition = (posX, posY) => {
    if (board[posX][posY].status === spaceStatusEnum.SEA) {
      if (isLandShoot(board, posX, posY)) {
        setStatusInPosition(spaceStatusEnum.SHOOT, posX, posY);

        const shipPosition = isShipSunk(board, posX, posY)
        if (shipPosition) {
          setStatusInManyPositions(spaceStatusEnum.SUNK, shipPosition);
          setSunkedShips(sunkedShips => sunkedShips + 1);
        }
      } else {
        setStatusInPosition(spaceStatusEnum.MISSED, posX, posY);
      }

      if (hasWon()) {
        finishGame(true)
      }

      if (difficulty === turn) {
        finishGame(false)
      }

      setTurn(turn => turn + 1)
    }
  }

  const hasWon = () => sunkedShips === ships.length

  const finishGame = (hasWon) => {
    firebase.finishGame(boardId, hasWon, turn);
    setFinishedGame(true);
    setWon(hasWon);
  }

  const setStatusInManyPositions = (status, positions) => {
    setBoard((prevBoard) => {
      const board = deepCopy(prevBoard);
      positions.forEach(({ posX, posY }) => {
        board[posX][posY].status = status;
      })

      return board
    });
  }

  const setStatusInPosition = (status, posX, posY) => {
    setBoard((prevBoard) => {
      const board = deepCopy(prevBoard);
      board[posX][posY].status = status;
      return board
    });
  }

  const restartGame = () => {
    setTurn(1);
    setSunkedShips(0);
    setFinishedGame(false);
    setWon(false);

    initGame();
  }

  return (
    <>
      <BackHome />
      {!finishedGame && <div className={game}>
        <h3 className={titleClass}>Turn: <span>{turn}</span></h3>
        <Board shootToPosition={shootToPosition} board={board} />
      </div>}
      {finishedGame && <div className={finished}>{renderFinishGame(won, restartGame)}</div>}
    </>
  )
}

export default Game
