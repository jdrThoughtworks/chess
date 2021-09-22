import React, { FC } from 'react'
import Chess from 'chess'
import { makeStyles } from '@material-ui/styles'
import { ChessContext } from './Game'
import { getChessSymbol, squareEquals } from '../utils'

const useStyles = (isDark: boolean) => makeStyles({
    square: {
        width: 'calc(12.5% - 2px)',
        height: 'calc(12.5% - 2px)',
        border: '1px solid black',
        backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: 'calc(10vmin - 10px)',
    },
    source: {
        borderColor: 'green',
        position: 'relative',
        zIndex: 10,
        '&:before': {
            content: '" "',
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            zIndex: 5,
            border: '5px solid #11FF11',
        }
    },
    destination: {
        borderColor: 'green',
        position: 'relative',
        zIndex: 10,
        '&:before': {
            content: '" "',
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            zIndex: 5,
            border: '5px solid #1111FF',
        }
    },
})

const Square: FC<{ square: Chess.Square }> = ({ square }) => {
    const { piece, rank, file } = square

    const isDark = (rank + file.charCodeAt(0) - 'a'.charCodeAt(0)) % 2 === 1
    const classes = useStyles(isDark)()

    const getSrcClass = (value: any) => squareEquals(value.source, square) ? classes.source : ''
    const getDestClass = (value: any) => value.destinations.includes(JSON.stringify(square)) ? classes.destination : ''
    const getClasses = (value: any) => `${classes.square} ${getSrcClass(value)} ${getDestClass(value)}`

    return <ChessContext.Consumer>
        {
            value => (<div className={getClasses(value)} onClick={() => value.tryMove(square)} data-testid="sq">
                {piece ? getChessSymbol(piece) : <>&nbsp;</>}
            </div>)
        }

    </ChessContext.Consumer>
}

export default Square