import React, { FC } from 'react'
import Chess from 'chess'
import { makeStyles } from '@material-ui/styles'
import { getChessSymbol } from '../utils'

const useStyles = makeStyles({
    list: {
        width: 100,
        display: 'inline-block',
        '& > div': {
            fontSize: 100,
            display: 'inline-block'
        },
    }
})

const CapturedPieces: FC<{ pieces: Chess.Piece[] }> = ({ pieces }) => {
    const classes = useStyles()
    return <>
        <div className={classes.list} data-testid="captured-pieces-list">
            {
                pieces.map((piece, index) => <div data-testid="captured-piece" key={`piece${index}`}>{getChessSymbol(piece)}</div>)
            }
        </div>
    </>
}

export default CapturedPieces