import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import CapturedPieces from './CapturedPieces'
import Game from './Game'

const mockBoard = <div data-testid="board"></div>

jest.mock('./Board.tsx', () => jest.fn())
const boardMocker = require('./Board')

describe('Game.tsx', () => {

    beforeEach(() => {
        boardMocker.mockReturnValue(mockBoard)
    })

    it('should call board', () => {
        const { getByTestId } = render(<Game />)
        expect(boardMocker).toHaveBeenCalled()
        expect(getByTestId('board')).toBeInTheDocument()
    })

})