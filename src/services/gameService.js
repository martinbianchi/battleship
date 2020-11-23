import spaceStatusEnum from '../enums/spaceStatusEnum'

const isLandShoot = (boardWithShips, posX, posY) => {
    return !!boardWithShips[posX][posY].id
}

const isShipSunk = (board, x, y) => {
    let isSunked = true;
    let shipPosition = [];
    const shipId = board[x][y].id
    board.forEach((xPositions, posX) => {
        xPositions.forEach((position, posY) => {
            if (position.id === shipId) {
                shipPosition.push({ posX, posY })
                if (posX !== x || posY !== y) {
                    if (position.status !== spaceStatusEnum.SHOOT) {
                        isSunked = false
                    }
                }
            }
        })
    })
    return isSunked ? shipPosition : isSunked;
}

export {
    isLandShoot,
    isShipSunk
}