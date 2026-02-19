const PLAYERS_LIST = [
    "Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray",
    "Ertuğrul", "Ömer", "Mehmet", "Ela", "Feraye", "Pelin", "Seray", "Defne", "Naz",
    "Derin", "Deniz", "Gülnihal", "İman"
];

// Updated Vocabulary with English Definitions
const VOCABULARY = [
    { word: "Mother", def: "A female parent" },
    { word: "Father", def: "A male parent" },
    { word: "Sister", def: "A girl or woman who has the same parents as you" },
    { word: "Brother", def: "A boy or man who has the same parents as you" },
    { word: "Grandmother", def: "The mother of your father or mother" },
    { word: "Grandfather", def: "The father of your father or mother" },
    { word: "Aunt", def: "The sister of your father or mother" },
    { word: "Uncle", def: "The brother of your father or mother" },
    { word: "Cousin", def: "The child of your aunt or uncle" },
    { word: "Family", def: "A group of people related to each other" },
    { word: "Baby", def: "A very young child" },
    { word: "Parents", def: "Your mother and father" }
];

let state = {
    totalPlayers: 0,
    totalGroups: 0,
    selectedPlayers: [],
    groups: [], // Array of arrays of player names
    groupScores: [], // New: Track scores for each group
    currentPlayer: null,
    currentPlayerIndex: 0,
    currentGroupIndex: 0,
    playerTurns: {}, // Map of player -> remaining turns
    gameActive: false,
    gamePaused: false,
    currentCard: null, // Track currently active card/question
    totalCards: 12 // Default
};

// Step 1: Confirm Player Count
function confirmPlayerCount() {
    const count = parseInt(document.getElementById('player-count').value);
    if (!count || count <= 0) return alert("Lütfen geçerli bir sayı girin.");

    state.totalPlayers = count;
    document.querySelector('.step-1').classList.add('hidden');
    document.querySelector('.step-1-5').classList.remove('hidden'); // Go to Card Count
}

// Step 1.5: Confirm Card Count
function confirmCardCount() {
    const count = parseInt(document.getElementById('card-count').value);
    if (!count || count <= 0) return alert("Lütfen geçerli bir sayı girin.");

    state.totalCards = count;
    document.querySelector('.step-1-5').classList.add('hidden');
    document.querySelector('.step-2').classList.remove('hidden'); // Go to Group Count
}

// Step 2: Confirm Group Count
function confirmGroupCount() {
    const count = parseInt(document.getElementById('group-count').value);
    if (!count || count <= 0) return alert("Lütfen geçerli bir sayı girin.");

    state.totalGroups = count;
    document.querySelector('.step-2').classList.add('hidden');
    document.querySelector('.step-3').classList.remove('hidden');
    renderPlayerSelection();
}

// Step 3: Render Player Selection
function renderPlayerSelection() {
    const container = document.getElementById('player-selection-list');
    container.innerHTML = PLAYERS_LIST.map((name, index) => `
        <div>
            <input type="checkbox" id="p-${index}" value="${name}" class="player-checkbox">
            <label for="p-${index}" class="player-label">${name}</label>
        </div>
    `).join('');
}

// Step 3: Finalize Players and Auto-Assign Groups
function finalizePlayers() {
    const checkboxes = document.querySelectorAll('.player-checkbox:checked');
    if (checkboxes.length !== state.totalPlayers) {
        return alert(`Lütfen tam olarak ${state.totalPlayers} kişi seçin. Şu an: ${checkboxes.length}`);
    }

    state.selectedPlayers = Array.from(checkboxes).map(cb => cb.value);

    // Randomize and distribute
    const shuffled = [...state.selectedPlayers].sort(() => 0.5 - Math.random());
    state.groups = Array.from({ length: state.totalGroups }, () => []);

    shuffled.forEach((player, i) => {
        state.groups[i % state.totalGroups].push(player);
    });

    document.querySelector('.step-3').classList.add('hidden');
    document.querySelector('.step-4').classList.remove('hidden');
    renderGroups();
}

// Step 4: Render Groups (with drag & drop logic placeholder)
function renderGroups() {
    const container = document.getElementById('groups-container');
    container.innerHTML = state.groups.map((group, i) => `
        <div class="group-box" ondrop="drop(event, ${i})" ondragover="allowDrop(event)">
            <h3>Grup ${i + 1}</h3>
            ${group.map(player => `
                <div class="group-member" draggable="true" ondragstart="drag(event, '${player}')">
                    ${player}
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Drag & Drop Helpers
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, player) {
    ev.dataTransfer.setData("text", player);
}

function drop(ev, groupIndex) {
    ev.preventDefault();
    const player = ev.dataTransfer.getData("text");

    // Find and remove from old group
    let found = false;
    for (let g of state.groups) {
        const idx = g.indexOf(player);
        if (idx !== -1) {
            g.splice(idx, 1);
            found = true;
            break;
        }
    }

    // Add to new group if found (sanity check)
    if (found) {
        state.groups[groupIndex].push(player);
        renderGroups(); // Re-render to show changes
    }
}

// Game Logic
function startGame() {
    // Check if groups are valid (no empty groups ideally, but not strictly required)
    if (state.groups.every(g => g.length === 0)) {
        alert("Lütfen en az bir gruba oyuncu ekleyin.");
        return;
    }

    // Initialize turns and scores
    state.selectedPlayers.forEach(p => state.playerTurns[p] = 3);
    state.groupScores = new Array(state.groups.length).fill(0);

    updateScoreboard();

    // Setup UI
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    renderCards();
    nextTurn();
}

function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = state.groupScores.map((score, i) => `
        <div class="score-box" style="padding: 10px; border: 2px solid #fab1a0; border-radius: 10px;">
            Grup ${i + 1}: <span style="color: #d63031; font-size: 1.2em;">${score}</span>
        </div>
    `).join('');
}

function renderCards() {
    const grid = document.getElementById('card-grid');

    // Create a deck based on totalCards
    // We will cycle through VOCABULARY to fill the count
    let deck = [];
    let vocabIndex = 0;

    for (let i = 0; i < state.totalCards; i++) {
        deck.push(VOCABULARY[vocabIndex % VOCABULARY.length]);
        vocabIndex++;
    }

    // Shuffle deck
    deck.sort(() => 0.5 - Math.random());

    grid.innerHTML = deck.map((item, index) => `
        <div class="card" id="card-${index}" onclick="handleCardClick(this, '${item.word}', '${item.def.replace(/'/g, "\\'")}')">
            <div class="card-inner">
                <div class="card-front">
                    <div style="font-size: 2em; color: var(--primary-color);">?</div>
                </div>
                <div class="card-back">
                    <span style="font-size: 2em;">?</span>
                </div>
            </div>
        </div>
    `).join('');
}

function quitGame() {
    if (confirm("Oyundan çıkmak istediğinize emin misiniz?")) {
        location.reload(); // Reload page to restart
    }
}

// Handle Card Click -> Open Modal
function handleCardClick(cardElement, word, def) {
    if (state.gamePaused || cardElement.classList.contains('flipped')) return;

    // Mark card as flipped visually (or wait until closed? Let's flip it)
    cardElement.classList.add('flipped');
    state.gamePaused = true;

    // Open Modal
    const modal = document.getElementById('question-modal');
    const questionText = document.getElementById('question-text');
    const input = document.getElementById('answer-input');

    questionText.textContent = def; // Show definition
    input.value = ''; // Clear input
    state.currentCard = { element: cardElement, word: word, def: def };

    modal.classList.remove('hidden');
}

// Button Handlers
function handleOops() {
    // -3 Points
    const groupIndex = getCurrentGroupIndex();
    if (groupIndex !== -1) {
        state.groupScores[groupIndex] -= 3;
        updateScoreboard();
    }
    closeModal();
}

function handleOkay() {
    // +5 Points
    // Optional: Validate input? User said "kendimize göre cevaplayacağız", implies manual verification via button.
    // "yazanlar oooooooookkkkaaayyyyyy butonuna basacak" -> assumes they wrote it correctly.

    const groupIndex = getCurrentGroupIndex();
    if (groupIndex !== -1) {
        state.groupScores[groupIndex] += 5;
        updateScoreboard();
    }
    closeModal();
}

function closeModal() {
    document.getElementById('question-modal').classList.add('hidden');

    // Show Next Turn button
    document.getElementById('next-turn-btn').classList.remove('hidden');
    // Game remains paused until Next Turn is clicked
}

function nextTurn() {
    state.gamePaused = false;
    document.getElementById('next-turn-btn').classList.add('hidden');

    // Logic to pick next player.
    // Random from available players with turns > 0
    const availablePlayers = state.selectedPlayers.filter(p => state.playerTurns[p] > 0);

    if (availablePlayers.length === 0) {
        alert("Oyun Bitti! Herkes turlarını tamamladı.");
        document.getElementById('current-player-name').textContent = "Oyun Bitti";
        document.getElementById('remaining-turns').textContent = "-";
        return;
    }

    const nextPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    state.currentPlayer = nextPlayer;

    // Find player's group for display
    const groupIndex = getPlayerGroupIndex(nextPlayer);

    document.getElementById('current-player-name').textContent = nextPlayer;
    document.getElementById('current-player-group').textContent = groupIndex + 1;
    document.getElementById('remaining-turns').textContent = state.playerTurns[nextPlayer];

    // Decrement turn count for the upcoming turn (or after they catch a card? 
    // Usually decrement when they take the turn).
    state.playerTurns[nextPlayer]--;
}

// Helpers
function getPlayerGroupIndex(player) {
    return state.groups.findIndex(g => g.includes(player));
}

function getCurrentGroupIndex() {
    if (!state.currentPlayer) return -1;
    return getPlayerGroupIndex(state.currentPlayer);
}
