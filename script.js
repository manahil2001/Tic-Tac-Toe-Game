// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const friendButton = document.getElementById('friend');
const computerButton = document.getElementById('computer');

let currentPlayer = 'X';
let gameMode = '';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

friendButton.addEventListener('click', () => {
    gameMode = 'friend';
    startGame();
});

computerButton.addEventListener('click', () => {
    gameMode = 'computer';
    startGame();
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function startGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    currentPlayer = 'X';
    board.classList.remove('hidden');
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || cell.classList.contains('disabled')) {
        return;
    }

    cell.textContent = currentPlayer;
    boardState[index] = currentPlayer;
    cell.classList.add('disabled');

    setTimeout(() => {
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            resetGame();
            return;
        }

        if (boardState.every(cell => cell !== '')) {
            alert('Draw!');
            resetGame();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameMode === 'computer' && currentPlayer === 'O') {
            computerMove();
        }
    }, 100);
}

function computerMove() {
    let availableIndices = boardState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    boardState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('disabled');

    setTimeout(() => {
        if (checkWin('O')) {
            alert('O wins!');
            resetGame();
        } else {
            currentPlayer = 'X';
        }
    }, 100);
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === player);
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    currentPlayer = 'X';
    board.classList.add('hidden');
}

  
