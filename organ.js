// JavaScript code (organ.js)

// Variables to keep track of game state
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const playerTurnDisplay = document.getElementById('player-turn');

// Function to check for a win
function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    return 'T'; // Tie
  }

  return null;
}

// Function to handle cell click event
function cellClick(event) {
  const cell = event.target;

  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWin();

    if (winner) {
      if (winner === 'T') {
        playerTurnDisplay.textContent = 'It\'s a tie!';
      } else {
        playerTurnDisplay.textContent = `${winner} wins!`;
      }
      // Disable further clicks after the game ends
      cells.forEach(cell => cell.removeEventListener('click', cellClick));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerTurnDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}

// Function to reset the game
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  currentPlayer = 'X';
  playerTurnDisplay.textContent = `Current Player: ${currentPlayer}`;

  // Reattach event listeners after resetting the game
  cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
  });
  
  // Re-enable clicks on cells
  cells.forEach(cell => cell.addEventListener('click', cellClick));
}

// Attach the cellClick function to each cell
cells.forEach(cell => {
  cell.addEventListener('click', cellClick);
});

// Attach the resetGame function to the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
