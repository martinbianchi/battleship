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
  let updatedBoard = deepCopy(board)
  ships.forEach(ship => {
    updatedBoard = placeShip(updatedBoard, ship)
  })

  return updatedBoard;
}

/**
 * 
 * @param {Array} board game board to modify
 * @param {{id, shipLongitude}} ship Ship to place in board
 * @param {number} intents Used to manage the recursivity of the function
 * 
 * @returns {Array} board with the ship placed.
 */
const placeShip = (board, ship, intents = 0) => {

  if (intents === 30) {
    // TODO: place ship manually
  }

  const directions = [directionEnum.TOP, directionEnum.RIGHT, directionEnum.BOTTOM, directionEnum.LEFT];
  const posX = getRndInteger(0, board.length);
  const posY = getRndInteger(0, board[0].length);

  const direction = directions[getRndInteger(0, directions.length)];
  const goThroughDirection = getGoThroughDirection(board, posX, posY, ship.shipLongitude, direction);

  if (goThroughDirection && canPlaceShip(goThroughDirection)) {
    return placeShipInBoard(goThroughDirection, board, ship.id)
  } else {
    intents++;
    return placeShip(board, ship, intents)
  }
}

/**
 * 
 * @param {Array} board Game board
 * @param {number} posX X-axis position of the ship
 * @param {number} posY Y-axis position of the ship
 * @param {number} shipLongitude longitude of the ship
 * @param {directionsEnum} direction direction to place the ship
 * 
 * @returns {Function} Function that accepts a callback to execute on each position. 
 * Take as basis posX and posY and go through the specific direction
 */
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

/**
 * 
 * @param {Function} goThroughDirection 
 * 
 * @returns {boolean} true if the ship can be placed in the position.
 */
const canPlaceShip = (goThroughDirection) => {
  let canPlace = true;
  goThroughDirection((x, y, position) => {
    if (position.id) {
      canPlace = false;
    }
  })

  return canPlace
}

/**
 * 
 * @param {Function} goThroughDirection 
 * @param {Array} board game board
 * @param {string} id ship id
 * 
 * @returns {Array} updated board with the ship placed in it.
 */
const placeShipInBoard = (goThroughDirection, board, id) => {
  let updatedBoard = deepCopy(board);
  goThroughDirection((posX, posY, _) => {
    updatedBoard[posX][posY] = { id, status: spaceStatusEnum.SEA }
  })

  return updatedBoard;
}

export {
  generateBoard,
  setShips
}