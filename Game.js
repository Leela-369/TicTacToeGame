let currentPlayer = "X";
let gameEnded = false;
const board = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const messageOverlay = document.getElementById("message-overlay");

function makeMove(cellIndex) {
    if (gameEnded || board[cellIndex].textContent !== "") {
        return;
    }

    board[cellIndex].textContent = currentPlayer;
    board[cellIndex].classList.add(currentPlayer);

    if (checkWin()) {
        showWinner();
        gameEnded = true;
    } else if (checkDraw()) {
        showDraw();
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            board[a].textContent !== "" &&
            board[a].textContent === board[b].textContent &&
            board[a].textContent === board[c].textContent
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (const cell of board) {
        if (cell.textContent === "") {
            return false;
        }
    }
    return true;
}

function showWinner() {
    const message = `Player ${currentPlayer} wins!`;
    messageElement.textContent = message;
    messageElement.classList.add("win-message");
    messageOverlay.classList.add("show");
}

function showDraw() {
    const message = "It's a draw!";
    messageElement.textContent = message;
    messageElement.classList.add("draw-message");
    messageOverlay.classList.add("show");
}

function resetGame() {
    currentPlayer = "X";
    gameEnded = false;
    for (const cell of board) {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    }
    messageElement.textContent = "";
    messageElement.classList.remove("win-message", "draw-message");
    messageOverlay.classList.remove("show");
}
