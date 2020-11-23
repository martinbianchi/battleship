import spaceStatusEnum from '../enums/spaceStatusEnum'

/**
 * 
 * @param {Array} board board of the game 
 * @param {number} posX X-axis position
 * @param {number} posY Y-axis position
 * 
 * @returns {boolean} indicates if there are a ship/part of them in the position.
 */
const isLandShoot = (board, posX, posY) => {
    return !!board[posX][posY].id
}

/**
 * 
 * @param {Array} board board of the game
 * @param {number} x X-axis position
 * @param {number} y Y-axis position
 * 
 * @returns {Array | boolean} If the ship is sunk returns an array with the positions of the ship in the board: {posX:number, posY:number}[]
 * if the ship isn't sunk returns false.
 */
const isShipSunk = (board, x, y) => {
    let isSink = true;
    let shipPosition = [];
    const shipId = board[x][y].id
    board.forEach((xPositions, posX) => {
        xPositions.forEach((position, posY) => {
            if (position.id === shipId) {
                shipPosition.push({ posX, posY })
                if (posX !== x || posY !== y) {
                    if (position.status !== spaceStatusEnum.SHOOT) {
                        isSink = false
                    }
                }
            }
        })
    })
    return isSink ? shipPosition : isSink;
}

export {
    isLandShoot,
    isShipSunk
}