const board = document.getElementById('board');
    const statusDiv = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function checkWinner() {
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          statusDiv.textContent = `Player ${boardState[a]} wins!`;
          gameActive = false;
          disableBoard();
          return;
        }
      }

      if (!boardState.includes('')) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
      }
    }

    function handleClick(index) {
      if (!gameActive || boardState[index]) return;

      boardState[index] = currentPlayer;
      renderBoard();
      checkWinner();

      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function renderBoard() {
      board.innerHTML = '';
      boardState.forEach((cell, index) => {
        const div = document.createElement('div');
        div.className = 'cell';
        if (cell) div.classList.add('disabled');
        div.textContent = cell;
        div.addEventListener('click', () => handleClick(index));
        board.appendChild(div);
      });
    }

    function disableBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.classList.add('disabled'));
    }

    function restartGame() {
      boardState = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      statusDiv.textContent = `Player ${currentPlayer}'s turn`;
      renderBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    renderBoard(); // Initial render