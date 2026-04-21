let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

const allCells = document.querySelectorAll(".cell");
const gameOutputMsg = document.querySelector("#gameResult span");
const turnDisplay = document.querySelector("#turnDisplay"); 
let turnCounter = 1;
let gameActive = true; 

function checkGameboard(rowA, rowB, rowC) {
    if (
        (rowA[0] === 'X' && rowA[1] === 'X' && rowA[2] === 'X') ||
        (rowB[0] === 'X' && rowB[1] === 'X' && rowB[2] === 'X') ||
        (rowC[0] === 'X' && rowC[1] === 'X' && rowC[2] === 'X') ||
        (rowA[0] === 'X' && rowB[0] === 'X' && rowC[0] === 'X') ||
        (rowA[1] === 'X' && rowB[1] === 'X' && rowC[1] === 'X') ||
        (rowA[2] === 'X' && rowB[2] === 'X' && rowC[2] === 'X') ||
        (rowA[0] === 'X' && rowB[1] === 'X' && rowC[2] === 'X') ||
        (rowA[2] === 'X' && rowB[1] === 'X' && rowC[0] === 'X')
    ) {
        return "x";
    } else if (
        (rowA[0] === 'O' && rowA[1] === 'O' && rowA[2] === 'O') ||
        (rowB[0] === 'O' && rowB[1] === 'O' && rowB[2] === 'O') ||
        (rowC[0] === 'O' && rowC[1] === 'O' && rowC[2] === 'O') ||
        (rowA[0] === 'O' && rowB[0] === 'O' && rowC[0] === 'O') ||
        (rowA[1] === 'O' && rowB[1] === 'O' && rowC[1] === 'O') ||
        (rowA[2] === 'O' && rowB[2] === 'O' && rowC[2] === 'O') ||
        (rowA[0] === 'O' && rowB[1] === 'O' && rowC[2] === 'O') ||
        (rowA[2] === 'O' && rowB[1] === 'O' && rowC[0] === 'O')
    ) {
        return "o";
    } else if (rowA.includes("-") || rowB.includes("-") || rowC.includes("-")) {
        return "n";
    } else {
        return "d";
    }
}

allCells.forEach(cell => {
    cell.addEventListener("click", function() {
        // Check if cell is empty AND game is still active
        if (cell.textContent === "" && gameActive) {
            
            // 1. Mark the UI
            if (turnCounter % 2 === 0) {
                cell.textContent = "O";
                cell.classList.add("mark-o");
            } else {
                cell.textContent = "X";
                cell.classList.add("mark-x");
            }

           
            const row = cell.dataset.row;
            const index = cell.dataset.index;
            if (row === "A") rowA[index] = cell.textContent;
            else if (row === "B") rowB[index] = cell.textContent;
            else if (row === "C") rowC[index] = cell.textContent;

            
            let winState = checkGameboard(rowA, rowB, rowC);

            if (winState === "x") {
                gameOutputMsg.innerHTML = "X wins!";
                gameActive = false; 
            } else if (winState === "o") {
                gameOutputMsg.innerHTML = "O wins!";
                gameActive = false;
            } else if (winState === "d") {
                gameOutputMsg.innerHTML = "It's a draw!";
                gameActive = false;
            }

            
            if (gameActive) {
                turnCounter++;
                if (turnCounter % 2 === 0) {
                    turnDisplay.textContent = "TURN: PLAYER O";
                } else {
                    turnDisplay.textContent = "TURN: PLAYER X";
                }
            } else {
                
                turnDisplay.textContent = "GAME OVER";
            }
        }
    });
});
