import spaceStatusEnum from '../enums/spaceStatusEnum';
import directionEnum from '../enums/directionEnum';
import { getRndInteger, deepCopy } from '../utils';

/**
 * 
 * @param {number} dimX X axis long
 * @param {number} dimY Y axis long
 * 
 * @returns {Array} board filled with initial values
 */
const generateBoard = (dimX, dimY) => {
  let board = [];

  for (let i = 0; i < dimX; i++) {
    board[i] = Array(dimY).fill({ status: spaceStatusEnum.SEA })
  }

  return board;
}

/**
 * 
 * @param {Array} board game board
 * @param {Array} ships Array of ships longitude to add to the board
 * 
 * @returns {Array} board with the ships set randomly
 */
const setShips = (board, ships) => {
  const updatedBoard = deepCopy(board)
  ships.forEach(ship => {
    placeShip(updatedBoard, ship)
  })

  return updatedBoard;
}

const placeShip = (board, ship, intents = 0) => {
  const directions = [directionEnum.TOP, directionEnum.RIGHT, directionEnum.BOTTOM, directionEnum.LEFT];
  const posX = getRndInteger(0, board.length);
  const posY = getRndInteger(0, board[0].length);

  const direction = directions[getRndInteger(0, directions.length)];
  const goThroughDirection = getGoThroughDirection(board, posX, posY, ship.shipLongitude, direction);

  if (goThroughDirection && canPlaceShip(goThroughDirection)) {
    placeShipInBoard(goThroughDirection, board, ship.id)
    return board
  } else {
    intents++;
    return placeShip(board, ship, intents)
  }
}

const getGoThroughDirection = (board, posX, posY, shipLongitude, direction) => {
  switch (direction) {
    case directionEnum.BOTTOM:
      if (posX + shipLongitude < board[0].length) {
        return (cb) => {
          for (let i = 0; i < shipLongitude; i++) {
            cb(posX + i, posY, board[posX + i][posY])
          }
        }
      }
      return null

    case directionEnum.RIGHT:
      if (posY + shipLongitude < board.length) {
        return (cb) => {
          for (let i = 0; i < shipLongitude; i++) {
            cb(posX, posY + i, board[posX][posY + i])
          }
        }
      }
      return null

    case directionEnum.TOP:
      if (posX - shipLongitude >= 0) {
        return (cb) => {
          for (let i = 0; i < shipLongitude; i++) {
            cb(posX - i, posY, board[posX - i][posY])
          }
        }
      }
      return null

    case directionEnum.LEFT:
      if (posY - shipLongitude >= 0) {
        return (cb) => {
          for (let i = 0; i < shipLongitude; i++) {
            cb(posX, posY - i, board[posX][posY - i])
          }
        }
      }
      return null;

    default:
      return null;
  }
}

const canPlaceShip = (goThroughDirection) => {
  let canPlace = true;
  goThroughDirection((x, y, position) => {
    if (position.id) {
      canPlace = false;
    }
  })

  return canPlace
}

const placeShipInBoard = (goThroughDirection, board, id) => {
  goThroughDirection((posX, posY, _) => {
    board[posX][posY] = { id, status: spaceStatusEnum.SEA }
  })
}

export {
  generateBoard,
  setShips
}