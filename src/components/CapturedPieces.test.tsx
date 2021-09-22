import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import Square from './Square'
import Chess from 'chess'
import { ChessContext } from './Game'
import CapturedPieces from './CapturedPieces'

describe('CapturedPieces.tsx', () => {
    const testPiece: Chess.Piece = {
        type: 'pawn',
        notation: '',
        side: {
            name: 'white',
        },
        moveCount: 0,
    }

    it('should render a list', () => {
        const { getByTestId } = render(<CapturedPieces pieces={[]} />)
        expect(getByTestId('captured-pieces-list')).toBeInTheDocument()
    })

    it('should render multiple pieces in the list', () => {
        const { getAllByTestId } = render(<CapturedPieces pieces={[testPiece, testPiece]} />)
        expect(getAllByTestId('captured-piece').length).toBe(2)
    })


    it('should render a captured pawn', () => {
        const { getByTestId } = render(<CapturedPieces pieces={[testPiece]} />)
        expect(getByTestId('captured-piece')).toHaveTextContent('♙')
    })

})