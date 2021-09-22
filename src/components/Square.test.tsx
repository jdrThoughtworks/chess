import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import Square from './Square'
import Chess from 'chess'
import { ChessContext } from './Game'

describe('Square.tsx', () => {
    const testPiece: Chess.Piece = {
        type: 'pawn',
        notation: '',
        side: {
            name: 'white',
        },
        moveCount: 0,
    }
    const testSquare: Chess.Square = {
        rank: 1,
        file: 'a',
        piece: testPiece,
    }

    const emptySquare = {
        ...testSquare,
        piece: null,
    }

    it('should render a square', () => {
        const { getByTestId } = render(<Square square={testSquare} />)
        expect(getByTestId('sq')).toBeInTheDocument()
    })

    it('should render a pawn in a square', () => {
        const { getByTestId } = render(<Square square={testSquare} />)
        expect(getByTestId('sq')).toHaveTextContent('♙')
    })

    it('should render an empty square', () => {
        const { getByTestId } = render(<Square square={emptySquare} />)
        expect(getByTestId('sq')).toHaveTextContent('')
    })

    it('should render a dark square', () => {
        const { getByTestId } = render(<Square square={testSquare} />)
        const square = getByTestId('sq')
        const computedStyle = window.getComputedStyle(square)
        expect(JSON.stringify(computedStyle)).toStrictEqual(expect.stringContaining('rgba(0, 0, 0, 0.8)'))
    })

    it('should render a light square', () => {
        const { getByTestId } = render(<Square square={{ ...testSquare, rank: 2 }} />)
        const square = getByTestId('sq')
        const computedStyle = window.getComputedStyle(square)
        expect(JSON.stringify(computedStyle)).toStrictEqual(expect.stringContaining('rgba(255, 255, 255, 0.8)'))
    })

    it('should highlight as a destination', () => {
        const { getByTestId } = render(<ChessContext.Provider value={{
            destinations: [JSON.stringify(testSquare)],
            tryMove: jest.fn(),
            source: undefined,
        }}>
            <Square square={testSquare} />
        </ChessContext.Provider >
        )
        expect(getByTestId('sq').className).toStrictEqual(expect.stringContaining('destination'))
    })

    it('should highlight as the source', () => {
        const { getByTestId } = render(<ChessContext.Provider value={{
            destinations: [],
            tryMove: jest.fn(),
            source: testSquare,
        }}>
            <Square square={testSquare} />
        </ChessContext.Provider >
        )
        expect(getByTestId('sq').className).toStrictEqual(expect.stringContaining('source'))
    })


})