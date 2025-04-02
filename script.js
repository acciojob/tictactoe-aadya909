 const board = document.getElementById("board");
        const message = document.getElementById("message");
        const startBtn = document.getElementById("submit");
        const resetBtn = document.getElementById("reset");
        let player1, player2;
        let currentPlayer, currentMarker;
        let gameActive = false;
        let cells = [];
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        startBtn.addEventListener("click", () => {
            player1 = document.getElementById("player-1").value || "Player 1";
            player2 = document.getElementById("player-2").value || "Player 2";
            currentPlayer = player1;
            currentMarker = "X";
            document.getElementById("playerInput").style.display = "none";
            document.getElementById("gameBoard").style.display = "block";
            message.innerText = `${currentPlayer}, you're up!`;
            initializeBoard();
        });

        function initializeBoard() {
            board.innerHTML = "";
            cells = [];
            gameActive = true;
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("id", i);
                cell.addEventListener("click", handleMove, { once: true });
                board.appendChild(cell);
                cells.push(cell);
            }
        }

        function handleMove(event) {
            if (!gameActive) return;
            let cell = event.target;
            cell.innerText = currentMarker;

            if (checkWin()) {
                message.innerText = `${currentPlayer}, congratulations you won!`;
                highlightWinner();
                gameActive = false;
                resetBtn.style.display = "block";
                return;
            }

            switchPlayer();
        }

        function switchPlayer() {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            currentMarker = (currentMarker === "X") ? "O" : "X";
            message.innerText = `${currentPlayer}, you're up!`;
        }

        function checkWin() {
            return winPatterns.some(pattern => {
                if (
                    cells[pattern[0]].innerText === currentMarker &&
                    cells[pattern[1]].innerText === currentMarker &&
                    cells[pattern[2]].innerText === currentMarker
                ) {
                    pattern.forEach(index => cells[index].classList.add("winner"));
                    return true;
                }
                return false;
            });
        }

        resetBtn.addEventListener("click", () => {
            document.getElementById("playerInput").style.display = "block";
            document.getElementById("gameBoard").style.display = "none";
            resetBtn.style.display = "none";
        });
