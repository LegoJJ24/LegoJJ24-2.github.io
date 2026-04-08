let rowA = [ "-", "-", "-" ];
let rowB = [ "-", "-", "-" ];
let rowC = [ "-", "-", "-" ];

function checkGameboard(rowA, rowB, rowC) {
  console.log("Function started: Evaluating board...");

if ( 
  // Rows
  (rowA[0] === 'x' && rowA[1] === 'x' && rowA[2] === 'x') || 
  (rowB[0] === 'x' && rowB[1] === 'x' && rowB[2] === 'x') || 
  (rowC[0] === 'x' && rowC[1] === 'x' && rowC[2] === 'x') ||
  
  // Columns
  (rowA[0] === 'x' && rowB[0] === 'x' && rowC[0] === 'x') || 
  (rowA[1] === 'x' && rowB[1] === 'x' && rowC[1] === 'x') ||
  (rowA[2] === 'x' && rowB[2] === 'x' && rowC[2] === 'x') ||
 
  // Diagonals  
  (rowA[0] === 'x' && rowB[1] === 'x' && rowC[2] === 'x') || 
  (rowA[2] === 'x' && rowB[1] === 'x' && rowC[0] === 'x')  
    ) {
  console.log("Result: Player X wins!");
    return "x";
  }
  
  else if (
  // Rows
  (rowA[0] === 'o' && rowA[1] === 'o' && rowA[2] === 'o') || 
  (rowB[0] === 'o' && rowB[1] === 'o' && rowB[2] === 'o') || 
  (rowC[0] === 'o' && rowC[1] === 'o' && rowC[2] === 'o') ||
  
  // Columns
  (rowA[0] === 'o' && rowB[0] === 'o' && rowC[0] === 'o') || 
  (rowA[1] === 'o' && rowB[1] === 'o' && rowC[1] === 'o') ||
  (rowA[2] === 'o' && rowB[2] === 'o' && rowC[2] === 'o') ||
 
  // Diagonals  
  (rowA[0] === 'o' && rowB[1] === 'o' && rowC[2] === 'o') || 
  (rowA[2] === 'o' && rowB[1] === 'o' && rowC[0] === 'o')  
    ) {
    console.log("Result: Player O wins!");
    return "o";
    }
    
    else {
  console.log("Result: No winner found. It's a draw.");
  return "d";
    }
}

let gameOutputMsg = document.querySelector("#gameResult span");

let winState = checkGameboard(rowA, rowB, rowC);

if (winState == "x") { 
  gameOutputMsg.innerHTML = "X wins";
  
} else if (winState == "o") {
  gameOutputMsg.innerHTML = "O wins";
  
} else if (winState == "d") {
  gameOutputMsg.innerHTML = "draw";
  
} else {
  gameOutputMsg.innerHTML = "unknown";
}
