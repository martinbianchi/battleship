import { render } from '@testing-library/react'
import Menu from './index';

describe('[MenuComponent]', () => {
    test('render options', () => {
        const { getByText } = render(<Menu options={['oneOption', 'anotherOption', 'lastOption']} />)

        expect(getByText('oneOption')).toBeInTheDocument();
        expect(getByText('anotherOption')).toBeInTheDocument();
        expect(getByText('lastOption')).toBeInTheDocument();
    })
})