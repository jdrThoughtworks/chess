import Chess from "chess"

export const squareEquals = (sq1: Chess.Square | undefined, sq2: Chess.Square | undefined) => JSON.stringify(sq1) === JSON.stringify(sq2)


export const getChessSymbol = (piece: Chess.Piece) => {
    const { side, type } = { ...piece }
    const piecesSymbols = {
        white: {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙',
        },
        black: {
            king: '♚',
            queen: '♛',
            rook: '♜',
            bishop: '♝',
            knight: '♞',
            pawn: '♟︎',
        }
    }

    return piecesSymbols[side.name][type]
}