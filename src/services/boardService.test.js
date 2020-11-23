import * as boardService from './boardService';
import * as utils from '../utils';
jest.mock('../utils', () => ({
    deepCopy: jest.fn()
}))

describe('[BoardService]', () => {
    describe('[generateBoard]', () => {
        it('should generate an array of length 15 when [dimX]=15', () => {
            const dimX = 15;
            const dimY = 10;

            const board = boardService.generateBoard(dimX, dimY);

            expect(board).toHaveLength(15);
        });

        it('should generate an array inside the array of length 15 when [dimY]=15', () => {
            const dimX = 10;
            const dimY = 15;

            const board = boardService.generateBoard(dimX, dimY);

            expect(board[0]).toHaveLength(15);
            expect(board[1]).toHaveLength(15);
            expect(board[2]).toHaveLength(15);
        })
    });
})

