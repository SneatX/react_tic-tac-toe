import { possibleVictories } from "../constants"

export const checkGameFinished = (newBoard) => {
    let possibleFinish = true
    for (let box of newBoard) {
        if (!box) {
            possibleFinish = false
        }
    }
    return possibleFinish
}

export const checkWinner = (boardToCheck) => {
    for (const possibility of possibleVictories) {
        const [a, b, c] = possibility

        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a]
        }
    }
}