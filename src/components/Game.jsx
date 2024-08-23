import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import '../css/Game.css'

import { Box } from './Box.jsx'
import { WinnerModal } from './WinnerModal.jsx'

import { emptyArray, players } from '../constants.js'
import { checkGameFinished, checkWinner} from '../logic/board.js'
import { saveGameToStorage , resetGameInStorage} from '../logic/localStorage.js'

export function Game() {
  const [board, updateBoard] = useState(()=>{
    let localStorageBoard = JSON.parse(window.localStorage.getItem('board'))
    return localStorageBoard ? localStorageBoard : emptyArray
  })
  const [turn, updateTurn] = useState(()=>{
    let localStorageTurn = window.localStorage.getItem('turn')
    return localStorageTurn ? localStorageTurn : players.X 
  })
  const [winner, newWinner] = useState()

  const movement = (index) =>{
    if(board[index] || winner) return //Validar que no exista un ganador

    let newBoard = [...board]
    newBoard[index] = turn
    updateBoard(newBoard) //actualizar el tablero

    let newTurn = turn === players.X ? players.O : players.X
    updateTurn(newTurn) //actualizar el turno
  }

  const resetGame = () => {
    updateBoard(emptyArray)
    updateTurn(players.X)
    newWinner(null)
    resetGameInStorage()
  }

  useEffect(()=>{
    saveGameToStorage(board, turn)
    let possibleWinner = checkWinner(board)
    if(possibleWinner) {
      newWinner(possibleWinner)
      confetti()
      return
    }
    else{
      let gameFinished = checkGameFinished(board)
      if(gameFinished) {
        newWinner('=')
        return
      }
    }
  }, [board, turn])

  return (
    <main>
      <h1 className='title'>Tic Tac toe</h1>
      <section className='table'>
        {board.map((val, index) => {
          return (
            <Box 
              key = {index}
              movement = {movement}
              index = {index}
            >
              {val}
            </Box>
          )
        }
        )}
      </section>

      <section className='turno'>
        <h2>Turn:</h2>
        <span>{turn}</span>
      </section>

      <button onClick={resetGame}>reset Game</button>

      <WinnerModal winner={winner} resetGame={resetGame}/>

    </main>
  )
}