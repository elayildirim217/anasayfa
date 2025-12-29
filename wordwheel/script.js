// --- VERİLER VE DURUM ---
const boys = ["Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray", "Ertuğrul", "Ömer", "Mehmet"];
const girls = ["Ela", "Feraye", "Pelin", "Seray", "Defne", "Naz", "Derin", "Deniz", "Gülnihal", "İman"];

const unit1Words = [
    { word: "Bunk Beds", img: "images/Bunk+Beds.png" },
    { word: "Shelf", img: "images/shelf.png" },
    { word: "Fridge", img: "images/Fridge.png" },
    { word: "Roof", img: "images/Roof.png" },
    { word: "Balcony", img: "images/Balcony.png" },
    { word: "Internet", img: "images/Internet.png" },
    { word: "Laptop", img: "images/Laptop.png" },
    { word: "Oven", img: "images/Oven.png" },
    { word: "Shower", img: "images/Shower.png" },
    { word: "Wash", img: "images/Wash.png" }
];

let activeWords = unit1Words;
let groups = [];
const groupNames = ["Stars", "Hearts", "Shine", "Clouds"];

// State
let allStudents = [];
let currentRotation = 0;
let isSpinning = false;
let currentWordIndex = -1;
let groupScores = [0, 0, 0, 0];
let groupPlayerIndices = [0, 0, 0, 0];
let currentGroupIndex = 0;
let selectedPlayer = null;
let currentRound = 0;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const gamePage = document.getElementById('game-page');
const generateBtn = document.getElementById('generate-groups-btn');
const groupsContainer = document.getElementById('groups-container');
const startGameBtn = document.getElementById('start-game-btn');
const wheelCanvas = document.getElementById('wheel-canvas');
const spinBtn = document.getElementById('spin-btn');
const playerNameSpan = document.getElementById('player-name');
const wordCard = document.getElementById('word-card');
const nextWordBtn = document.getElementById('next-word-btn');
const correctBtn = document.getElementById('correct-btn');
const wrongBtn = document.getElementById('wrong-btn');
let ctx;

// --- EVENT LISTENERS ---
generateBtn.addEventListener('click', generateGroups);
startGameBtn.addEventListener('click', startGame);
spinBtn.addEventListener('click', () => startGroupTurn(false));
nextWordBtn.addEventListener('click', loadNextWord);
correctBtn.addEventListener('click', () => handleScore(true));
wrongBtn.addEventListener('click', () => handleScore(false));
wordCard.addEventListener('click', () => wordCard.classList.toggle('flipped'));

// --- FONKSİYONLAR ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateGroups() {
    const shuffledBoys = shuffleArray([...boys]);
    const shuffledGirls = shuffleArray([...girls]);
    groups = [[], [], [], []];
    shuffledGirls.forEach((girl, i) => groups[i % 4].push({ name: girl, gender: 'Girl' }));
    shuffledBoys.forEach((boy, i) => groups[i % 4].push({ name: boy, gender: 'Boy' }));
    allStudents = groups.flat().map(s => s.name);
    displayGroups();
    startGameBtn.classList.remove('hidden');
}

function displayGroups() {
    groupsContainer.innerHTML = '';
    groupsContainer.classList.remove('hidden');
    groups.forEach((group, index) => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `<h3>${groupNames[index]}</h3><ul>${group.map(s => `<li>${s.name}</li>`).join('')}</ul>`;
        groupsContainer.appendChild(card);
    });
}

function startGame() {
    landingPage.classList.add('hidden');
    gamePage.classList.remove('hidden');

    // --- EKLE: 2. Sayfaya Geçerken Başlıkları Temizle ---
    document.getElementById('fun-title').innerHTML = "";
    document.getElementById('welcome-title').innerHTML = "";

    groupScores = [0, 0, 0, 0];
    groupPlayerIndices = [0, 0, 0, 0];
    currentGroupIndex = 0;
    currentRound = 0;

    // --- HER KELİMEYİ 2 KEZ EKLE ---
    activeWords = [];
    unit1Words.forEach(item => {
        activeWords.push({ ...item }); // 1. kopya
        activeWords.push({ ...item }); // 2. kopya
    });

    activeWords = shuffleArray(activeWords); // Karıştır

    updateScoreBoard();
    initWheel();
}

function initWheel() {
    ctx = wheelCanvas.getContext('2d');
    drawWheel();
}

function drawWheel() {
    if (!ctx) return;
    const numSegments = allStudents.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const radius = wheelCanvas.width / 2;
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(currentRotation);
    allStudents.forEach((student, i) => {
        const angle = i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#6C63FF' : '#FF6584';
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, angle, angle + arcSize);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.save();
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Outfit";
        ctx.fillText(student, radius - 10, 5);
        ctx.restore();
    });
    ctx.restore();
}

// --- ÇARK DÖNME ANİMASYONU ---
function startGroupTurn(isInitial = false) {
    if (selectedPlayer && !isInitial) {
        alert("Please rate the previous player's answer first.");
        return;
    }
    if (currentRound >= 4) return;
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;

    let spinAngleStart = Math.random() * 10 + 15;
    let spinTime = 0;
    let spinTimeTotal = Math.random() * 2000 + 3000;

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        currentRotation += (spinAngle * Math.PI / 180);
        drawWheel();
        requestAnimationFrame(rotateWheel);
    }

    function easeOut(t, b, c, d) {
        let ts = (t /= d) * t;
        let tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    function stopRotateWheel() {
        isSpinning = false;
        const group = groups[currentGroupIndex];
        const playerIndex = groupPlayerIndices[currentGroupIndex] % group.length;
        selectedPlayer = group[playerIndex].name;
        updateScoreBoard();
        spinBtn.textContent = "Question Asked";
        loadNextWord();
    }
    rotateWheel();
}

function loadNextWord() {
    currentWordIndex = (currentWordIndex + 1) % activeWords.length;
    const wordData = activeWords[currentWordIndex];
    wordCard.classList.remove('flipped');
    const front = document.querySelector('.card-front');
    const back = document.querySelector('.card-back');
    front.innerHTML = `<img src="${wordData.img}" style="max-width:90%; max-height:90%; border-radius:10px;">`;
    back.innerHTML = `<h2 style="font-size:2.5rem; color:#6C63FF">${wordData.word}</h2>`;
}

function handleScore(isCorrect) {
    if (!selectedPlayer) return;
    if (isCorrect) groupScores[currentGroupIndex] += 10;

    if (currentGroupIndex === 3) currentRound++;

    groupPlayerIndices[currentGroupIndex]++;
    currentGroupIndex = (currentGroupIndex + 1) % 4;
    selectedPlayer = null;
    updateScoreBoard();

    if (currentRound >= 4) {
        alert("Game Over!");
        spinBtn.textContent = "OVER";
        spinBtn.disabled = true;
    } else {
        spinBtn.disabled = false;
        spinBtn.textContent = "SPIN";
    }

    document.querySelector('.card-front').innerHTML = '<span>Next Question</span>';
    document.querySelector('.card-back').innerHTML = '';
}

function updateScoreBoard() {
    groupNames.forEach((name, i) => {
        const el = document.getElementById(`score-team-${i + 1}`);
        if (el) el.textContent = `${name}: ${groupScores[i]}`;
    });
    playerNameSpan.textContent = selectedPlayer ? `${groupNames[currentGroupIndex]}: ${selectedPlayer}` : "?";
}

// --- HARF OYUNU MANTIĞI (BASİTLEŞTİRİLMİŞ) ---
const startSpellingBtn = document.getElementById('start-spelling-btn');
if (startSpellingBtn) {
    startSpellingBtn.addEventListener('click', () => alert("Harf oyunu için sayfayı yenileyip 'Harf Oyunu'na basın."));
}
// --- SADECE GİRİŞ SAYFASINDA GÖRÜNECEK BAŞLIK SİSTEMİ ---
function setupLandingPageTitles() {
    const funContainer = document.getElementById('fun-title');
    const welcomeContainer = document.getElementById('welcome-title');
    const gamePage = document.getElementById('game-page');

    // Oyun sayfası görünürse başlıkları sil ve dur
    if (!gamePage.classList.contains('hidden')) {
        funContainer.innerHTML = "";
        welcomeContainer.innerHTML = "";
        return;
    }

    const colors = ['#FF6584', '#6C63FF', '#43D9AD', '#FFA502', '#FF4757', '#1E90FF', '#2ED573'];

    // İçerikleri temizle
    funContainer.innerHTML = "";
    welcomeContainer.innerHTML = "";

    function createLine(text, container) {
        const lineDiv = document.createElement('div');
        lineDiv.style.display = "flex";
        lineDiv.style.justifyContent = "center";
        lineDiv.style.gap = "8px";
        lineDiv.style.width = "100%";

        text.split("").forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === " " ? "\u00A0" : char;
            span.className = 'letter';
            span.style.color = colors[Math.floor(Math.random() * colors.length)];
            span.style.animationDelay = (index * 0.1) + "s";
            lineDiv.appendChild(span);
        });
        container.appendChild(lineDiv);
    }

    createLine("ARE YOU READY", funContainer);
    createLine("TO HAVE FUN?", funContainer);
    createLine("WELCOME TO THE", welcomeContainer);
    createLine("WORD WHEEL GAME", welcomeContainer);
}

// Sayfa ilk yüklendiğinde başlıkları oluştur
window.addEventListener('DOMContentLoaded', setupLandingPageTitles);