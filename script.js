document.addEventListener("DOMContentLoaded", () => {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const submitBtn = document.getElementById("submit");
    const message = document.querySelector(".message");
    const gameDiv = document.getElementById("game");
    const boardCells = document.querySelectorAll(".cell");

    let players = ["Player 1", "Player 2"];
    let currentPlayer = "x";
    let gameActive = false;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    submitBtn.addEventListener("click", () => {
        players = [
            player1Input.value.trim() || "Player 1",
            player2Input.value.trim() || "Player 2"
        ];
        
        gameDiv.style.display = "block";
        message.textContent = ${players[0]}, you're up!;
        gameActive = true;

        // Reset board
        boardState.fill("");
        boardCells.forEach(cell => {
            cell.textContent = "";
        });

        currentPlayer = "x";  // Reset to first player
    });

    boardCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!gameActive || boardState[index] !== "") return;

            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;

            setTimeout(() => {
                if (checkWinner()) {
                    message.textContent = ${currentPlayer === "x" ? players[0] : players[1]} congratulations you won!;
                    gameActive = false;
                    return;
                }

                currentPlayer = currentPlayer === "x" ? "o" : "x";
                message.textContent = ${currentPlayer === "x" ? players[0] : players[1]}, you're up!;
            }, 50);
        });
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }
});