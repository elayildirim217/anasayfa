// 23 Attributes
const attributes = [
    "Tall", "Short", "Dark hair", "Blonde hair", "Brown eyes",
    "Blue eyes", "Green eyes", "Wearing glasses", "Wearing a hat",
    "Straight hair", "Curly hair", "Young", "Old", "Strong",
    "Fast", "Funny", "Smart", "Brave", "Kind", "Happy",
    "Sad", "Mustache", "Beard"
];

// Game State
let currentTurn = 'girl'; // 'girl' or 'boy'
let scoreGirl = 0;
let scoreBoy = 0;
let selectedCard = null;

// DOM Elements
const cardsContainer = document.getElementById('cards-container');
const btnOk = document.getElementById('btn-ok');
const btnOops = document.getElementById('btn-oops');
const btnSwitch = document.getElementById('btn-switch');
const scoreGirlEl = document.getElementById('score-girl');
const scoreBoyEl = document.getElementById('score-boy');
const teamGirlPanel = document.getElementById('team-girl-panel');
const teamBoyPanel = document.getElementById('team-boy-panel');
const turnDisplay = document.getElementById('turn-display');

// Sounds (assuming they exist from previous games, will handle errors if missing)
const soundOk = document.getElementById('sound-ok');
const soundOops = document.getElementById('sound-oops');

// Initialize Game
function initGame() {
    // Generate Cards
    attributes.forEach((attr, index) => {
        const card = document.createElement('div');
        card.classList.add('attribute-card');
        card.textContent = attr;
        card.dataset.index = index;

        card.addEventListener('click', () => {
            // Deselect previous
            if (selectedCard) {
                selectedCard.classList.remove('selected');
            }
            // Select new
            card.classList.add('selected');
            selectedCard = card;
        });

        cardsContainer.appendChild(card);
    });

    // Event Listeners for Buttons
    btnOk.addEventListener('click', handleCorrect);
    btnOops.addEventListener('click', handleIncorrect);
    btnSwitch.addEventListener('click', switchTurn);
}

function handleCorrect() {
    if (currentTurn === 'girl') {
        scoreGirl += 5;
        scoreGirlEl.textContent = scoreGirl;
    } else {
        scoreBoy += 5;
        scoreBoyEl.textContent = scoreBoy;
    }
    playSound(soundOk);
    createConfetti();

    // Optional: could automatically switch turn or deselect card here
    if (selectedCard) {
        selectedCard.style.backgroundColor = '#dcedc8'; // mark as successfully used
        selectedCard.classList.remove('selected');
        selectedCard = null;
    }
}

function handleIncorrect() {
    if (currentTurn === 'girl') {
        scoreGirl -= 3;
        scoreGirlEl.textContent = scoreGirl;
    } else {
        scoreBoy -= 3;
        scoreBoyEl.textContent = scoreBoy;
    }
    playSound(soundOops);
}

function switchTurn() {
    if (currentTurn === 'girl') {
        currentTurn = 'boy';
        teamGirlPanel.classList.remove('active');
        teamBoyPanel.classList.add('active');
        turnDisplay.textContent = 'Current Turn: Team Boy';
        turnDisplay.style.color = '#4a90e2';
    } else {
        currentTurn = 'girl';
        teamBoyPanel.classList.remove('active');
        teamGirlPanel.classList.add('active');
        turnDisplay.textContent = 'Current Turn: Team Girl';
        turnDisplay.style.color = '#ff6b6b';
    }
}

function playSound(soundElement) {
    if (soundElement) {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Simple confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Start
initGame();
