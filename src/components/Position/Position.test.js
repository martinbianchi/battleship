import { render, fireEvent, getByTestId } from '@testing-library/react'
import Position from './index';

import spaceStatusEnum from '../../enums/spaceStatusEnum'

describe('[PositionComponent]', () => {
    test('should call onClick after click on the element', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Position column={1} row={1} onClick={onClick} status={spaceStatusEnum.SEA} />)

        fireEvent.click(getByTestId('position'));

        expect(onClick).toHaveBeenCalledTimes(1)
    });

    test('should have class [initial] when status is [SEA]', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Position column={1} row={1} onClick={onClick} status={spaceStatusEnum.SEA} />)

        expect(getByTestId('position')).toHaveClass('initial');

    });

    test('should have class [shoot] when status is [SHOOT]', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Position column={1} row={1} onClick={onClick} status={spaceStatusEnum.SHOOT} />)

        expect(getByTestId('position')).toHaveClass('shoot');
    });

    test('should have class [missed] when status is [MISSED]', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Position column={1} row={1} onClick={onClick} status={spaceStatusEnum.MISSED} />)

        expect(getByTestId('position')).toHaveClass('missed');

    });

    test('should have class [sunk] when status is [SUNK]', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Position column={1} row={1} onClick={onClick} status={spaceStatusEnum.SUNK} />)

        expect(getByTestId('position')).toHaveClass('sunk');
    });
})