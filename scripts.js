const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const againButton = document.querySelector("[data-again-button]")
const restartButton = document.querySelector("[data-restart-button]")
const alert = document.querySelector("[data-alert]")
const dataScore = document.querySelector("[data-score]")

let isCircleTurn

let score = { X: 0, O: 0 }

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    isCircleTurn = false

    for (const cell of cellElements) {
        cell.classList.remove('o')
        cell.classList.remove('x')
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    }

    setBoardHoverClass()
    winningMessage.classList.remove('show-winning-message')

}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageText.innerText = "Draw!"
        dataScore.innerText = "X:  " + score.X + "   -   O:  " + score.O
    } else {
        winningMessageText.innerText = isCircleTurn ? "O win!" : "X win!"
        dataScore.innerText = "X:  " + score.X + "   -   O:  " + score.O
    }
    winningMessage.classList.add('show-winning-message')
}

const restartGame = () => {
    score.O = 0
    score.X = 0
    startGame()
}


const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains("o")
    })
}


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    board.classList.remove('o')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('o')
        alert.innerText = "Turn - O"
    } else {
        board.classList.add('x')
        alert.innerText = "Turn - X"
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn
    setBoardHoverClass()
}

const handleClick = (e) => {
    //Colocar a marca X ou O
    const cell = e.target
    const classToAdd = isCircleTurn ? 'o' : 'x'

    placeMark(cell, classToAdd)
    //Verificar por vitória
    const isWin = checkForWin(classToAdd)
    //Verificar por empate
    const isDraw = checkForDraw()

    if (isWin) {
        if (isCircleTurn) {
            score.O = score.O + 1
        } else {
            score.X = score.X + 1
        }
        endGame(false)
    }
    else if (isDraw) {
        endGame(true)
    } else {
        //Mudar o símbolo
        swapTurns()
    }

}
startGame()

againButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)



