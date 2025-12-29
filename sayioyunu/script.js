// script.js

// Game State
let names = [];
let availableNames = [];
let currentTargetNumber = 0;
let currentPlayerName = "";

// SABİT İSİMLER LİSTESİ BURAYA EKLENDİ
const CLASS_NAMES = [
    "Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray",
    "Ertuğrul", "Ömer", "Mehmet", "Ela", "Feraye", "Pelin", "Seray", "Defne", "Naz",
    "Derin", "Deniz", "Gülnihal", "İman"
];
// /SABİT İSİMLER LİSTESİ BURAYA EKLENDİ

// DOM Elements
const screens = {
    entry: document.getElementById('name-entry-screen'),
    rules: document.getElementById('rules-screen'),
    selection: document.getElementById('selection-screen'),
    game: document.getElementById('game-screen')
};

const nameInput = document.getElementById('name-input');
const addBtn = document.getElementById('add-btn');
const nameList = document.getElementById('name-list');
const startSetupBtn = document.getElementById('start-setup-btn');
const startGameBtn = document.getElementById('start-game-btn');
const selectedNameDisplay = document.getElementById('selected-name');
const skipBtn = document.getElementById('skip-btn');
const confirmPlayerBtn = document.getElementById('confirm-player-btn');
const currentPlayerDisplay = document.getElementById('current-player-display');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const feedbackArea = document.getElementById('feedback-area');
const nextRoundBtn = document.getElementById('next-round-btn');

// YENİ BUTON SEÇİCİSİ BURAYA EKLENDİ
const loadClassNamesBtn = document.getElementById('load-class-names-btn');
// /YENİ BUTON SEÇİCİSİ BURAYA EKLENDİ

// --- Event Listeners ---

// Add Name
addBtn.addEventListener('click', addName);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addName();
});

// YENİ BUTON EVENT LISTENER BURAYA EKLENDİ
loadClassNamesBtn.addEventListener('click', loadClassNames);
// /YENİ BUTON EVENT LISTENER BURAYA EKLENDİ

// Start Setup (Go to Rules)
startSetupBtn.addEventListener('click', () => {
    if (names.length > 0) {
        availableNames = [...names]; // Copy names for the game session
        switchScreen('rules');
    }
});

// Start Game (Go to Selection)
startGameBtn.addEventListener('click', () => {
    startNewGame(); // Generate number and reset list
    pickNextPlayer();
    switchScreen('selection');
});

// Skip Player
skipBtn.addEventListener('click', () => {
    pickNextPlayer();
});

// Confirm Player (Go to Game)
confirmPlayerBtn.addEventListener('click', () => {
    startTurn();
    switchScreen('game');
});

// Guess Logic
guessBtn.addEventListener('click', makeGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') makeGuess();
});

// Next Round / New Game Button
nextRoundBtn.addEventListener('click', () => {
    if (nextRoundBtn.textContent === "Yeni Oyun") {
        startNewGame();
    }

    // Reset UI for next player
    guessInput.value = '';
    feedbackArea.textContent = '';
    feedbackArea.className = 'feedback';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    nextRoundBtn.classList.add('hidden');

    pickNextPlayer();
    switchScreen('selection');
});

// --- Functions ---

function addName() {
    const name = nameInput.value.trim();
    if (name) {
        // Prevent adding the same name if it's already in the list
        if (!names.includes(name)) {
            names.push(name);
            renderNameList();
            startSetupBtn.disabled = false;
        }
        nameInput.value = '';
    }
}

// YENİ FONKSİYON BURAYA EKLENDİ
function loadClassNames() {
    // Overwrite the current list with the class list
    names = [...CLASS_NAMES];
    renderNameList();
    startSetupBtn.disabled = false; // Enable the start button
    // Optional: Hide or disable the load button after use if desired
    // loadClassNamesBtn.disabled = true;
    alert(`${CLASS_NAMES.length} öğrenci listede!`);
}
// /YENİ FONKSİYON BURAYA EKLENDİ

function renderNameList() {
    nameList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name;
        // Optional: Add delete button per name
        nameList.appendChild(li);
    });
}

function switchScreen(screenName) {
    // Hide all screens immediately
    Object.values(screens).forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });

    // Show target screen
    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

function startNewGame() {
    availableNames = [...names]; // Reset list
    currentTargetNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Yeni Hedef Sayı:", currentTargetNumber);
}

function pickNextPlayer() {
    if (availableNames.length === 0) {
        // If everyone guessed and no one won, restart the cycle (but keep the number!)
        alert("Tur bitti! Kimse bilemedi. Sıra tekrar başa dönüyor.");
        availableNames = [...names];
    }

    // Random selection from available
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selected = availableNames[randomIndex];

    currentPlayerName = selected;
    selectedNameDisplay.textContent = currentPlayerName;
}

function startTurn() {
    // Remove current player from available list for this cycle
    const index = availableNames.indexOf(currentPlayerName);
    if (index > -1) {
        availableNames.splice(index, 1);
    }

    currentPlayerDisplay.textContent = currentPlayerName;
    // Focus input
    setTimeout(() => guessInput.focus(), 100);
}

function makeGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedbackArea.textContent = "Lütfen 1 ile 100 arasında bir sayı girin.";
        feedbackArea.className = 'feedback hint';
        return;
    }

    if (guess === currentTargetNumber) {
        feedbackArea.textContent = `Tebrikler! Sayı ${currentTargetNumber} idi.`;
        feedbackArea.className = 'feedback success';
        endGame(true);
    } else {
        if (guess < currentTargetNumber) {
            feedbackArea.textContent = "Daha YUKARI ▲ (Sıra Geçiyor)";
        } else {
            feedbackArea.textContent = "Daha AŞAĞI ▼ (Sıra Geçiyor)";
        }
        feedbackArea.className = 'feedback hint';
        endTurn();
    }
}

function endTurn() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    nextRoundBtn.textContent = "Sıradaki Kişi";
    nextRoundBtn.classList.remove('hidden');
}

function endGame(win) {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    nextRoundBtn.textContent = "Yeni Oyun";
    nextRoundBtn.classList.remove('hidden');
}