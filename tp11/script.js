const cards = document.querySelectorAll('.card');
const turnDisplay = document.getElementById('turn-count');
const winPanel = document.getElementById('win-panel');
const finalTurnsDisplay = document.getElementById('final-turns');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let turns = 0;
let matches = 0;
const totalPairs = cards.length / 2;

function flipCard() {
    if (lockBoard) return; 
    if (this === firstCard) return; 

    this.classList.add('flip');

    if (!hasFlippedCard) {
        
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
   
    turns++;
    turnDisplay.innerText = turns;

    
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matches++;
    lockBoard = true; 

    setTimeout(() => {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        resetBoard();

        if (matches === totalPairs) {
            showWinPanel();
        }
    }, 800);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showWinPanel() {
    finalTurnsDisplay.innerText = turns;
    winPanel.classList.remove('hidden');
}


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
