let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];



const allCells = document.querySelectorAll(".cell");
const gameOutputMsg = document.querySelector("#gameResult span");
let turnCounter = 1;

function checkGameboard(rowA, rowB, rowC) {
console.log("Evaluating board...");
  
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

}

else if (

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

}

else if (rowA.includes("-") || rowB.includes("-") || rowC.includes("-")) {
return "n";

}

else {
return "d";

}

}

allCells.forEach(cell => {
cell.addEventListener("click", function() {

if (cell.textContent === "") {

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

} else if (winState === "o") {

gameOutputMsg.innerHTML = "O wins!";

} else if (winState === "d") {

gameOutputMsg.innerHTML = "It's a draw!";

}

turnCounter++;

}

});
  
});
