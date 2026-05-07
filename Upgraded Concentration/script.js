// --- CONFIG & STATE ---
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let p1Score = 0;
let p2Score = 0;
let currentPlayer = 1;
let totalPairs = 8;
let matchesFound = 0;
let isTwoPlayer = false;
let p1Name = "Player 1";
let p2Name = "Player 2";

const board = document.getElementById('game-board');

// --- COOKIE HELPERS ---
function setCookie(name, value, days = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${JSON.stringify(value)};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function clearGameData() {
    document.cookie = "winCounts=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}

// --- INITIALIZATION ---
window.onload = () => {
    const history = getCookie('winCounts') || {};
    const historyDiv = document.getElementById('cookie-history');
    if (Object.keys(history).length > 0) {
        historyDiv.innerHTML = "<strong>Past Wins:</strong><br>";
        for (let name in history) {
            historyDiv.innerHTML += `${name}: ${history[name]} wins<br>`;
        }
    }
};

function toggleNameInputs() {
    const is2P = document.getElementById('player-select').value === "2";
    document.getElementById('p2-name-input').classList.toggle('hidden', !is2P);
}

function startGame() {
    totalPairs = parseInt(document.getElementById('pair-select').value);
    isTwoPlayer = document.getElementById('player-select').value === "2";
    p1Name = document.getElementById('p1-name-input').value || "Player 1";
    p2Name = document.getElementById('p2-name-input').value || "Player 2";

    // UI Updates
    document.getElementById('p1-name-display').innerText = p1Name;
    document.getElementById('p2-name-display').innerText = p2Name;
    document.getElementById('current-player-display').innerText = p1Name;
    if(isTwoPlayer) document.getElementById('p2-info').classList.remove('hidden');
    
    document.getElementById('config-modal').classList.add('hidden');
    generateBoard();
}

// --- GAME LOGIC ---
function generateBoard() {
    const imageIds = [1015, 1016, 1018, 1019, 1020, 1021, 1022, 1025, 1035, 1038, 1041, 1042];
    const selectedIds = imageIds.slice(0, totalPairs);
    const gameSet = [...selectedIds, ...selectedIds]; // Double for pairs
    gameSet.sort(() => Math.random() - 0.5); // Shuffle

    gameSet.forEach(id => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = id;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="https://picsum.photos/id/${id}/200" alt="Landmark">
                </div>
            </div>`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

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
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchesFound++;
    if (currentPlayer === 1) {
        p1Score++;
        document.getElementById('p1-score').innerText = p1Score;
    } else {
        p2Score++;
        document.getElementById('p2-score').innerText = p2Score;
    }

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
        if (matchesFound === totalPairs) declareWinner();
    }, 800);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        switchTurn();
        resetBoard();
    }, 1000);
}

function switchTurn() {
    if (!isTwoPlayer) return;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-player-display').innerText = (currentPlayer === 1) ? p1Name : p2Name;
    document.getElementById('p1-info').classList.toggle('active');
    document.getElementById('p2-info').classList.toggle('active');
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function declareWinner() {
    let winner = p1Name;
    if (isTwoPlayer) {
        if (p2Score > p1Score) winner = p2Name;
        else if (p1Score === p2Score) winner = "It's a Tie!";
    }

    // Update Cookies
    if (winner !== "It's a Tie!") {
        let history = getCookie('winCounts') || {};
        history[winner] = (history[winner] || 0) + 1;
        setCookie('winCounts', history);
    }

    document.getElementById('win-message').innerText = (winner.includes("Tie")) ? winner : `${winner} Wins!`;
    document.getElementById('win-panel').classList.remove('hidden');
}
