import React, { createContext, FC, useState } from 'react'
import Chess from 'chess'
import Board from './Board'
import { squareEquals } from '../utils'
import CapturedPieces from './CapturedPieces'

export const ChessContext = createContext({
    tryMove: (_square: Chess.Square) => { },
    destinations: [] as string[],
    source: undefined as undefined | Chess.Square,
})

const Game: FC = () => {
    const [gameClient,] = useState(Chess.create())
    const [destinations, setDestinations] = useState([] as string[])
    const [source, setSource] = useState(undefined as Chess.Square | undefined)
    const [board, setBoard] = useState(gameClient.game.board)

    const tryMove = (square: Chess.Square) => {
        const allPossibleMoves = { ...gameClient.getStatus().notatedMoves }

        if (destinations.includes(JSON.stringify(square))) {
            const currentMove = Object.entries(allPossibleMoves).filter(move => (squareEquals(move[1].src, source) && squareEquals(move[1].dest, square)))[0][0]
            gameClient.move(currentMove)
            setSource(undefined)
            setDestinations([])
            setBoard(gameClient.game.board)
            console.error('move', gameClient.getStatus())
        } else if (!source) {
            setSource(square)
            const possibleDestinations = Object.values(allPossibleMoves).filter(move => move.src === square).map(move => move.dest).map(dest => JSON.stringify(dest))
            setDestinations(possibleDestinations)
            console.warn('set source', gameClient.getStatus())
        } else {
            setSource(undefined)
            setDestinations([])
            console.error('cancel move', gameClient.getStatus())
        }
    }

    return <ChessContext.Provider value={{ tryMove, destinations, source }}>
        <Board board={board} />
        <CapturedPieces pieces={[{
            "moveCount": 0,
            "notation": "N",
            "side": {
                "name": "white"
            },
            "type": "knight"
        }]} />
    </ChessContext.Provider>
}

export default Game