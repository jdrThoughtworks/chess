import React, { FC } from 'react'
import Chess from 'chess'
import Square from './Square'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    board: {
        width: 'calc(100vmin - 100px)',
        height: 'calc(100vmin - 100px)',
        display: 'inline-block',
    }
})

const Board: FC<{ board: Chess.ChessBoard }> = ({ board }) => {
    const classes = useStyles()
    return <>
        <div className={classes.board}>
            {
                board.squares.map((sq, i) => (
                    <Square key={`square${i}`} square={sq} />
                ))
            }
        </div>
    </>
}

export default Board