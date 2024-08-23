import { useState } from 'react'
import './Board.css'
import Box from './Box'

export default function Board() {
  const emptyArray = Array(9).fill(null)
  const players = {
    X : "x",
    O : "o"
  }
  const possibleVictories = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [board, updateBoard] = useState(emptyArray)
  const [turn, updateTurn] = useState(players.X)
  const [winner, newWinner] = useState()
  const [title, letTitle] = useState()

  const checkWinner = (boardToCheck) =>{
    for(const possibility of possibleVictories){
      const [a, b, c] = possibility

      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
  }

  const checkGameFinished = (newBoard) =>{
    let possibleFinish = true
    for(let box of newBoard){
      if(!box){
        possibleFinish = false
      }
    }
    return possibleFinish
  }

  const movement = (index) =>{

    if(board[index] || winner) return

    let newBoard = [...board]
    newBoard[index] = turn
    updateBoard(newBoard)

    let possibleWinner = checkWinner(newBoard)
    if(possibleWinner) {
      newWinner(possibleWinner)
      letTitle('Winner')
    }

    let gameFinished = checkGameFinished(newBoard)
    if(gameFinished) {
      newWinner('=')
      letTitle('Draw')
    }
    
    let nextPlayer = turn === players.X ? players.O : players.X
    updateTurn(nextPlayer) 
  }

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
              {board[index]}
            </Box>
          )
        }
        )}
      </section>

      <section className='turno'>
        <h2>Turn:</h2>
        <span>{turn}</span>
      </section>

      {
        winner != null && (
          <section className='winner-background'>
            <div className='winner-player'>
              <h1>{title}!!</h1>
              <span>{winner}</span>
            </div>
            <div className='tryAgain-section'>
              <button>Try again</button>
            </div>
          </section>
        )
      }
    </main>
  )
}