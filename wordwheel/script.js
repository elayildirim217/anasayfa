// ==========================================
// WORD WHEEL - BAAMBOOZLE STYLE ENGLISH GAME
// MULTILINGUAL (i18n) SYSTEM
// ==========================================

// --- ÖĞRENCİ LİSTELERİ ---
const boys = ["Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray", "Ertuğrul", "Ömer", "Mehmet"];
const girls = ["Ela", "Feraye", "Pelin", "Seray", "Hira", "Elif Ada", "Naz", "Derin", "Deniz", "Gülnihal", "İman"];

// --- 28 KELİME VE GÖRSELLERİ ---
const unit1Words = [
    { word: "Actor", img: "images/Actor.png" },
    { word: "Airport", img: "images/Airport.png" },
    { word: "Balcony", img: "images/Balcony.png" },
    { word: "Biking", img: "images/biking.png" },
    { word: "Breakdancing", img: "images/Breakdancing.png" },
    { word: "Bunk Beds", img: "images/Bunk+Beds.png" },
    { word: "Coding", img: "images/coding.png" },
    { word: "Competition", img: "images/competition.png" },
    { word: "Fridge", img: "images/Fridge.png" },
    { word: "Go Away", img: "images/Go Away.png" },
    { word: "Golf", img: "images/Golf.png" },
    { word: "Hotel", img: "images/Hotel.png" },
    { word: "Instructor", img: "images/Instructor.png" },
    { word: "Internet", img: "images/Internet.png" },
    { word: "Laptop", img: "images/Laptop.png" },
    { word: "Oven", img: "images/Oven.png" },
    { word: "Pack", img: "images/Pack.png" },
    { word: "Pilot", img: "images/Pilot.png" },
    { word: "Restaurant", img: "images/Restaurant.png" },
    { word: "Roof", img: "images/Roof.png" },
    { word: "Shelf", img: "images/Shelf.png" },
    { word: "Shower", img: "images/Shower.png" },
    { word: "Skyscraper", img: "images/Skyscraper.png" },
    { word: "Study", img: "images/Study.png" },
    { word: "Theater", img: "images/Theater.png" },
    { word: "Transportation", img: "images/Transportation.png" },
    { word: "University", img: "images/University.png" },
    { word: "Wash", img: "images/Wash.png" }
];

// --- ÇOKLU DİL SİSTEMİ (i18n) ---
const i18n = {
    en: {
        pageTitle: "Word Wheel - English Vocabulary Game",
        gamesMenu: "⬅️ Games Menu",
        createGroups: "Create Groups",
        startGame: "Start Game",
        round: "Round",
        turnLabel: "Turn:",
        spinPrompt: "Spin the Wheel!",
        teamSpinPrompt: (team) => `${team} Team, Spin the Wheel!`,
        placeholderText: "Spin the wheel to reveal the question!",
        correctFeedback: "🎉 Awesome! Correct Answer! (+10 Points)",
        wrongFeedback: (word) => `❌ Incorrect! Correct answer: <strong>${word}</strong>`,
        nextTurnBtn: "Next Turn ➡️",
        skipWordBtn: "Change Question 🔄",
        spinBtn: "SPIN",
        doneBtn: "DONE",
        overBtn: "OVER",
        alertAnswerFirst: "Please answer the current question or click 'Next Turn' first.",
        gameOverTitle: "Congratulations!",
        gameOverWinner: (winners) => `<strong>${winners}</strong> Team Won! 🎉`,
        landingTitles: ["ARE YOU READY", "TO HAVE FUN?", "WELCOME TO THE", "WORD WHEEL GAME"]
    },
    tr: {
        pageTitle: "Word Wheel - İngilizce Kelime Oyunu",
        gamesMenu: "⬅️ Oyunlar Menüsü",
        createGroups: "Grupları Oluştur",
        startGame: "Oyunu Başlat",
        round: "Tur",
        turnLabel: "Sıradaki:",
        spinPrompt: "Çarkı Çevirin!",
        teamSpinPrompt: (team) => `${team} Takımı, Çarkı Çevirin!`,
        placeholderText: "Sıradaki soruyu görmek için çarkı çevirin!",
        correctFeedback: "🎉 Harika! Doğru Cevap! (+10 Puan)",
        wrongFeedback: (word) => `❌ Yanlış! Doğru cevap: <strong>${word}</strong>`,
        nextTurnBtn: "Sıradaki Tur ➡️",
        skipWordBtn: "Soruyu Değiştir 🔄",
        spinBtn: "ÇEVİR",
        doneBtn: "TAMAM",
        overBtn: "BİTTİ",
        alertAnswerFirst: "Lütfen önce mevcut soruyu yanıtlayın veya 'Sıradaki Tur'a geçin.",
        gameOverTitle: "Tebrikler!",
        gameOverWinner: (winners) => `<strong>${winners}</strong> Takımı Kazandı! 🎉`,
        landingTitles: ["HAZIR MISINIZ", "EĞLENMEYE?", "HOŞ GELDİNİZ", "KELİME ÇARKINA"]
    },
    es: {
        pageTitle: "Word Wheel - Juego de Vocabulario en Inglés",
        gamesMenu: "⬅️ Menú de Juegos",
        createGroups: "Crear Grupos",
        startGame: "Comenzar Juego",
        round: "Ronda",
        turnLabel: "Turno:",
        spinPrompt: "¡Gira la Ruleta!",
        teamSpinPrompt: (team) => `Equipo ${team}, ¡giren la ruleta!`,
        placeholderText: "¡Gira la ruleta para ver la pregunta!",
        correctFeedback: "🎉 ¡Genial! ¡Respuesta Correcta! (+10 Puntos)",
        wrongFeedback: (word) => `❌ ¡Incorrecto! Respuesta correcta: <strong>${word}</strong>`,
        nextTurnBtn: "Siguiente Turno ➡️",
        skipWordBtn: "Cambiar Pregunta 🔄",
        spinBtn: "GIRAR",
        doneBtn: "LISTO",
        overBtn: "FIN",
        alertAnswerFirst: "Por favor, responda primero a la pregunta actual o pase al siguiente turno.",
        gameOverTitle: "¡Felicidades!",
        gameOverWinner: (winners) => `¡Ganó el equipo <strong>${winners}</strong>! 🎉`,
        landingTitles: ["¿ESTÁS LISTO", "PARA DIVERTIRTE?", "BIENVENIDO AL", "JUEGO DE LA RULETA"]
    },
    fr: {
        pageTitle: "Word Wheel - Jeu de Vocabulaire Anglais",
        gamesMenu: "⬅️ Menu des Jeux",
        createGroups: "Créer des Groupes",
        startGame: "Démarrer le Jeu",
        round: "Manche",
        turnLabel: "Au tour de:",
        spinPrompt: "Faites tourner la roue!",
        teamSpinPrompt: (team) => `Équipe ${team}, tournez la roue!`,
        placeholderText: "Tournez la roue pour voir la question!",
        correctFeedback: "🎉 Bravo! Bonne réponse! (+10 Points)",
        wrongFeedback: (word) => `❌ Incorrect! La bonne réponse: <strong>${word}</strong>`,
        nextTurnBtn: "Tour Suivant ➡️",
        skipWordBtn: "Changer de Question 🔄",
        spinBtn: "TOURNER",
        doneBtn: "FAIT",
        overBtn: "FIN",
        alertAnswerFirst: "Veuillez d'abord répondre à la question ou passer au tour suivant.",
        gameOverTitle: "Félicitations!",
        gameOverWinner: (winners) => `L'équipe <strong>${winners}</strong> a gagné! 🎉`,
        landingTitles: ["ÊTES-VOUS PRÊT", "À VOUS AMUSER?", "BIENVENUE AU", "JEU DE LA ROUE"]
    },
    de: {
        pageTitle: "Word Wheel - Englisches Vokabelspiel",
        gamesMenu: "⬅️ Spielemenü",
        createGroups: "Gruppen Erstellen",
        startGame: "Spiel Starten",
        round: "Runde",
        turnLabel: "An der Reihe:",
        spinPrompt: "Drehe das Rad!",
        teamSpinPrompt: (team) => `Team ${team}, dreht das Rad!`,
        placeholderText: "Drehe das Rad, um die Frage zu sehen!",
        correctFeedback: "🎉 Großartig! Richtige Antwort! (+10 Punkte)",
        wrongFeedback: (word) => `❌ Falsch! Richtige Antwort: <strong>${word}</strong>`,
        nextTurnBtn: "Nächste Runde ➡️",
        skipWordBtn: "Frage Wechseln 🔄",
        spinBtn: "DREHEN",
        doneBtn: "FERTIG",
        overBtn: "ENDE",
        alertAnswerFirst: "Bitte beantworten Sie zuerst die aktuelle Frage oder gehen Sie zur nächsten Runde.",
        gameOverTitle: "Herzlichen Glückwunsch!",
        gameOverWinner: (winners) => `Team <strong>${winners}</strong> hat gewonnen! 🎉`,
        landingTitles: ["BIST DU BEREIT", "FÜR DEN SPASS?", "WILLKOMMEN BEIM", "WÖRTERRAD-SPIEL"]
    },
    it: {
        pageTitle: "Word Wheel - Gioco di Vocabolario Inglese",
        gamesMenu: "⬅️ Menu Giochi",
        createGroups: "Crea Gruppi",
        startGame: "Inizia Partita",
        round: "Turno",
        turnLabel: "Tocca a:",
        spinPrompt: "Gira la Ruota!",
        teamSpinPrompt: (team) => `Squadra ${team}, girate la ruota!`,
        placeholderText: "Gira la ruota per vedere la domanda!",
        correctFeedback: "🎉 Ottimo! Risposta Corretta! (+10 Punti)",
        wrongFeedback: (word) => `❌ Sbagliato! Risposta corretta: <strong>${word}</strong>`,
        nextTurnBtn: "Prossimo Turno ➡️",
        skipWordBtn: "Cambia Domanda 🔄",
        spinBtn: "GIRA",
        doneBtn: "FATTO",
        overBtn: "FINE",
        alertAnswerFirst: "Rispondi prima alla domanda corrente o passa al turno successivo.",
        gameOverTitle: "Congratulazioni!",
        gameOverWinner: (winners) => `La squadra <strong>${winners}</strong> ha vinto! 🎉`,
        landingTitles: ["SEI PRONTO", "A DIVERTIRTI?", "BENVENUTO AL", "GIOCO DELLA RUOTA"]
    },
    pt: {
        pageTitle: "Word Wheel - Jogo de Vocabulário em Inglês",
        gamesMenu: "⬅️ Menu de Jogos",
        createGroups: "Criar Grupos",
        startGame: "Iniciar Jogo",
        round: "Rodada",
        turnLabel: "Vez de:",
        spinPrompt: "Gire a Roleta!",
        teamSpinPrompt: (team) => `Equipe ${team}, gire a roleta!`,
        placeholderText: "Gire a roleta para ver a pergunta!",
        correctFeedback: "🎉 Maravilha! Resposta Certa! (+10 Pontos)",
        wrongFeedback: (word) => `❌ Incorreto! Resposta certa: <strong>${word}</strong>`,
        nextTurnBtn: "Próxima Vez ➡️",
        skipWordBtn: "Mudar Pergunta 🔄",
        spinBtn: "GIRAR",
        doneBtn: "PRONTO",
        overBtn: "FIM",
        alertAnswerFirst: "Por favor, responda à pergunta atual ou passe para a próxima vez.",
        gameOverTitle: "Parabéns!",
        gameOverWinner: (winners) => `A equipe <strong>${winners}</strong> venceu! 🎉`,
        landingTitles: ["ESTÁ PRONTO", "PARA SE DIVERTIR?", "BEM-VINDO AO", "JOGO DA ROLETA"]
    },
    ru: {
        pageTitle: "Word Wheel - Игра в слова на английском",
        gamesMenu: "⬅️ Меню игр",
        createGroups: "Создать группы",
        startGame: "Начать игру",
        round: "Раунд",
        turnLabel: "Очередь:",
        spinPrompt: "Вращайте колесо!",
        teamSpinPrompt: (team) => `Команда ${team}, крутите колесо!`,
        placeholderText: "Вращайте колесо, чтобы увидеть вопрос!",
        correctFeedback: "🎉 Отлично! Правильный ответ! (+10 очков)",
        wrongFeedback: (word) => `❌ Неверно! Правильный ответ: <strong>${word}</strong>`,
        nextTurnBtn: "Следующий ход ➡️",
        skipWordBtn: "Сменить вопрос 🔄",
        spinBtn: "КРУТИТЬ",
        doneBtn: "ГОТОВО",
        overBtn: "КОНЕЦ",
        alertAnswerFirst: "Пожалуйста, сначала ответьте на текущий вопрос или нажмите 'Следующий ход'.",
        gameOverTitle: "Поздравляем!",
        gameOverWinner: (winners) => `Команда <strong>${winners}</strong> победила! 🎉`,
        landingTitles: ["ВЫ ГОТОВЫ", "К ВЕСЕЛЬЮ?", "ДОБРО ПОЖАЛОВАТЬ", "В КОЛЕСО СЛОВ"]
    },
    ar: {
        pageTitle: "Word Wheel - لعبة مفردات اللغة الإنجليزية",
        gamesMenu: "⬅️ قائمة الألعاب",
        createGroups: "إنشاء مجموعات",
        startGame: "ابدأ اللعبة",
        round: "الجولة",
        turnLabel: "الدور:",
        spinPrompt: "أدر العجلة!",
        teamSpinPrompt: (team) => `فريق ${team}، أدر العجلة!`,
        placeholderText: "أدر العجلة لكشف السؤال!",
        correctFeedback: "🎉 رائع! إجابة صحيحة! (+10 نقاط)",
        wrongFeedback: (word) => `❌ غير صحيح! الإجابة الصحيحة: <strong>${word}</strong>`,
        nextTurnBtn: "الدور التالي ➡️",
        skipWordBtn: "تغيير السؤال 🔄",
        spinBtn: "تدوير",
        doneBtn: "تم",
        overBtn: "انتهى",
        alertAnswerFirst: "يرجى الإجابة على السؤال الحالي أولاً أو الانتقال للدور التالي.",
        gameOverTitle: "تهانينا!",
        gameOverWinner: (winners) => `فاز فريق <strong>${winners}</strong>! 🎉`,
        landingTitles: ["هل أنت مستعد", "للمرح؟", "مرحبًا بك في", "عجلة الكلمات"]
    },
    zh: {
        pageTitle: "Word Wheel - 英语词汇转盘游戏",
        gamesMenu: "⬅️ 游戏菜单",
        createGroups: "创建小组",
        startGame: "开始游戏",
        round: "回合",
        turnLabel: "轮到:",
        spinPrompt: "转动轮盘！",
        teamSpinPrompt: (team) => `${team}队，请转动轮盘！`,
        placeholderText: "转动轮盘查看问题！",
        correctFeedback: "🎉 太棒了！回答正确！（+10分）",
        wrongFeedback: (word) => `❌ 回答错误！正确答案是：<strong>${word}</strong>`,
        nextTurnBtn: "下一回合 ➡️",
        skipWordBtn: "换一个问题 🔄",
        spinBtn: "转动",
        doneBtn: "完成",
        overBtn: "结束",
        alertAnswerFirst: "请先回答当前问题或点击“下一回合”。",
        gameOverTitle: "恭喜！",
        gameOverWinner: (winners) => `<strong>${winners}</strong> 队获胜！🎉`,
        landingTitles: ["准备好了吗", "一起来玩吧！", "欢迎来到", "单词转盘游戏"]
    },
    ja: {
        pageTitle: "Word Wheel - 英語ボキャブラリーゲーム",
        gamesMenu: "⬅️ ゲームメニュー",
        createGroups: "グループを作成",
        startGame: "ゲームスタート",
        round: "ラウンド",
        turnLabel: "順番:",
        spinPrompt: "ルーレットを回そう！",
        teamSpinPrompt: (team) => `${team}チーム、回してください！`,
        placeholderText: "ルーレットを回して問題を表示！",
        correctFeedback: "🎉 すばらしい！正解です！（+10点）",
        wrongFeedback: (word) => `❌ 不正解！正解は: <strong>${word}</strong>`,
        nextTurnBtn: "次のターン ➡️",
        skipWordBtn: "質問を変える 🔄",
        spinBtn: "回す",
        doneBtn: "完了",
        overBtn: "終了",
        alertAnswerFirst: "現在の問題に答えるか、「次のターン」を押してください。",
        gameOverTitle: "おめでとうございます！",
        gameOverWinner: (winners) => `<strong>${winners}</strong> チームの勝利！🎉`,
        landingTitles: ["準備はいい？", "楽しもう！", "ようこそ", "ワードホイールへ"]
    },
    ko: {
        pageTitle: "Word Wheel - 영어 단어 게임",
        gamesMenu: "⬅️ 게임 메뉴",
        createGroups: "그룹 만들기",
        startGame: "게임 시작",
        round: "라운드",
        turnLabel: "차례:",
        spinPrompt: "룰렛을 돌려보세요!",
        teamSpinPrompt: (team) => `${team} 팀, 룰렛을 돌려주세요!`,
        placeholderText: "룰렛을 돌려 문제를 확인하세요!",
        correctFeedback: "🎉 훌륭해요! 정답입니다! (+10점)",
        wrongFeedback: (word) => `❌ 틀렸습니다! 정답: <strong>${word}</strong>`,
        nextTurnBtn: "다음 턴 ➡️",
        skipWordBtn: "질문 변경 🔄",
        spinBtn: "돌리기",
        doneBtn: "완료",
        overBtn: "종료",
        alertAnswerFirst: "먼저 현재 질문에 답하거나 '다음 턴'을 눌러주세요.",
        gameOverTitle: "축하합니다!",
        gameOverWinner: (winners) => `<strong>${winners}</strong> 팀이 승리했습니다! 🎉`,
        landingTitles: ["준비되셨나요", "함께 즐겨봐요!", "환영합니다", "단어 룰렛 게임"]
    }
};

const langLabels = {
    en: "English",
    tr: "Türkçe",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    pt: "Português",
    ru: "Русский",
    ar: "العربية",
    zh: "中文",
    ja: "日本語",
    ko: "한국어"
};

// Default language: English
let currentLang = 'en';

function t(key, ...args) {
    const langObj = i18n[currentLang] || i18n['en'];
    const val = langObj[key] !== undefined ? langObj[key] : (i18n['en'][key] !== undefined ? i18n['en'][key] : key);
    if (typeof val === 'function') {
        return val(...args);
    }
    return val;
}

function setLanguage(lang) {
    if (!i18n[lang]) lang = 'en';
    currentLang = lang;

    try {
        localStorage.setItem('wordwheel_lang', lang);
    } catch (e) { }

    // HTML lang & direction
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
    document.title = t('pageTitle');

    // Update labels on custom dropdowns
    const labelText = langLabels[lang] || "English";
    document.querySelectorAll('.lang-current-label').forEach(el => {
        el.textContent = labelText;
    });

    // Update active state on options
    document.querySelectorAll('.lang-opt').forEach(opt => {
        if (opt.dataset.lang === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // Update static texts
    const navBackLanding = document.getElementById('nav-back-landing');
    if (navBackLanding) navBackLanding.textContent = t('gamesMenu');

    const navBackGame = document.getElementById('nav-back-game');
    if (navBackGame) navBackGame.textContent = t('gamesMenu');

    if (generateBtn) generateBtn.textContent = t('createGroups');
    if (startGameBtn) startGameBtn.textContent = t('startGame');

    const turnLabelEl = document.getElementById('turn-label');
    if (turnLabelEl) turnLabelEl.textContent = t('turnLabel');

    const placeholderTextEl = document.getElementById('placeholder-text');
    if (placeholderTextEl) placeholderTextEl.textContent = t('placeholderText');

    if (nextTurnBtn) nextTurnBtn.textContent = t('nextTurnBtn');
    if (skipWordBtn) skipWordBtn.textContent = t('skipWordBtn');

    // Spin button text
    if (spinBtn) {
        if (currentRound >= MAX_ROUNDS) {
            spinBtn.textContent = t('overBtn');
        } else if (isQuestionAnswered || selectedPlayer) {
            spinBtn.textContent = t('doneBtn');
        } else {
            spinBtn.textContent = t('spinBtn');
        }
    }

    // Scoreboard & dynamic labels
    updateScoreBoard();
    if (!selectedPlayer && !isSpinning) {
        resetQuestionAreaForSpin();
    }
    setupLandingPageTitles();
}

// Setup Custom Language Dropdowns
function setupLanguageDropdowns() {
    const pairs = [
        { btn: document.getElementById('landing-lang-btn'), menu: document.getElementById('landing-lang-menu') },
        { btn: document.getElementById('game-lang-btn'), menu: document.getElementById('game-lang-menu') }
    ];

    pairs.forEach(({ btn, menu }) => {
        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !menu.classList.contains('hidden');
            closeAllLanguageDropdowns();
            if (!isOpen) {
                menu.classList.remove('hidden');
                btn.classList.add('open');
            }
        });

        menu.querySelectorAll('.lang-opt').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = opt.dataset.lang;
                setLanguage(lang);
                closeAllLanguageDropdowns();
            });
        });
    });

    document.addEventListener('click', () => {
        closeAllLanguageDropdowns();
    });
}

function closeAllLanguageDropdowns() {
    document.querySelectorAll('.lang-dropdown-menu').forEach(menu => menu.classList.add('hidden'));
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('open'));
}

let activeWords = [];
let groups = [[], [], [], []];
const groupNames = ["Stars", "Hearts", "Shine", "Clouds"];

// State
let allStudents = [];
let currentRotation = 0;
let isSpinning = false;
let currentWordIndex = -1;
let currentQuestionWord = null;
let isQuestionAnswered = false;
let groupScores = [0, 0, 0, 0];
let groupPlayerIndices = [0, 0, 0, 0];
let currentGroupIndex = 0;
let selectedPlayer = null;
let currentRound = 0;
const MAX_ROUNDS = 4;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const gamePage = document.getElementById('game-page');
const generateBtn = document.getElementById('generate-groups-btn');
const groupsContainer = document.getElementById('groups-container');
const startGameBtn = document.getElementById('start-game-btn');
const wheelCanvas = document.getElementById('wheel-canvas');
const spinBtn = document.getElementById('spin-btn');
const playerNameSpan = document.getElementById('player-name');
const roundDisplay = document.getElementById('round-display');

// Question Area Elements
const questionPlaceholder = document.getElementById('question-placeholder');
const questionImageBox = document.getElementById('question-image-box');
const wordImage = document.getElementById('word-image');
const choicesContainer = document.getElementById('choices-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextTurnBtn = document.getElementById('next-turn-btn');
const skipWordBtn = document.getElementById('skip-word-btn');

let ctx;

// --- EVENT LISTENERS ---
generateBtn.addEventListener('click', generateGroups);
startGameBtn.addEventListener('click', startGame);
spinBtn.addEventListener('click', handleSpinClick);
nextTurnBtn.addEventListener('click', advanceToNextTurn);
skipWordBtn.addEventListener('click', loadNextWord);

// --- SES EFEKTLERİ (WEB AUDIO API) ---
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playAudioFeedback(type) {
    try {
        const ac = getAudioContext();
        if (!ac) return;

        if (type === 'correct') {
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            freqs.forEach((freq, idx) => {
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ac.currentTime + idx * 0.08);

                gain.gain.setValueAtTime(0, ac.currentTime + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.2, ac.currentTime + idx * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + idx * 0.08 + 0.35);

                osc.connect(gain);
                gain.connect(ac.destination);

                osc.start(ac.currentTime + idx * 0.08);
                osc.stop(ac.currentTime + idx * 0.08 + 0.4);
            });
        } else if (type === 'wrong') {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, ac.currentTime);
            osc.frequency.linearRampToValueAtTime(110, ac.currentTime + 0.3);

            gain.gain.setValueAtTime(0.15, ac.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(ac.destination);

            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.35);
        }
    } catch (e) {
        console.warn("Audio play prevented:", e);
    }
}

// --- KONFETİ MOTORU (CANVAS CONFETTI) ---
const confettiCanvas = document.getElementById('confetti-canvas');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId = null;

function resizeConfettiCanvas() {
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

function launchConfetti() {
    resizeConfettiCanvas();
    const colors = ['#FF6584', '#6C63FF', '#43D9AD', '#FFA502', '#2ED573', '#FF4757', '#1E90FF'];

    for (let i = 0; i < 120; i++) {
        const fromLeft = Math.random() < 0.5;
        confettiParticles.push({
            x: fromLeft ? Math.random() * (confettiCanvas.width * 0.25) : confettiCanvas.width - Math.random() * (confettiCanvas.width * 0.25),
            y: confettiCanvas.height * 0.4 + Math.random() * (confettiCanvas.height * 0.3),
            w: Math.random() * 12 + 6,
            h: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (fromLeft ? 1 : -1) * (Math.random() * 12 + 4),
            vy: -(Math.random() * 14 + 8),
            gravity: 0.35,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            decay: Math.random() * 0.008 + 0.008
        });
    }

    if (!confettiAnimationId) {
        updateConfetti();
    }
}

function updateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const p = confettiParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
            confettiParticles.splice(i, 1);
            continue;
        }

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;
        confettiCtx.globalAlpha = Math.max(0, p.opacity);
        confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        confettiCtx.restore();
    }

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(updateConfetti);
    } else {
        confettiAnimationId = null;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// --- YARDIMCI FONKSİYONLAR ---
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- GRUP OLUŞTURMA ---
function generateGroups() {
    const shuffledBoys = shuffleArray(boys);
    const shuffledGirls = shuffleArray(girls);
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
        card.innerHTML = `<h3>${groupNames[index]}</h3><ul>${group.map(s => `<li>👤 ${s.name}</li>`).join('')}</ul>`;
        groupsContainer.appendChild(card);
    });
}

// --- OYUNU BAŞLATMA ---
function startGame() {
    landingPage.classList.add('hidden');
    gamePage.classList.remove('hidden');

    const funTitle = document.getElementById('fun-title');
    const welcomeTitle = document.getElementById('welcome-title');
    if (funTitle) funTitle.innerHTML = "";
    if (welcomeTitle) welcomeTitle.innerHTML = "";

    groupScores = [0, 0, 0, 0];
    groupPlayerIndices = [0, 0, 0, 0];
    currentGroupIndex = 0;
    currentRound = 0;
    selectedPlayer = null;
    currentWordIndex = -1;

    activeWords = [];
    unit1Words.forEach(item => {
        activeWords.push({ ...item });
        activeWords.push({ ...item });
    });
    activeWords = shuffleArray(activeWords);

    updateScoreBoard();
    initWheel();
    resetQuestionAreaForSpin();
}

// --- ÇARK ÇİZİMİ ---
function initWheel() {
    ctx = wheelCanvas.getContext('2d');
    drawWheel();
}

function drawWheel() {
    if (!ctx || allStudents.length === 0) return;
    const numSegments = allStudents.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const radius = wheelCanvas.width / 2;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(currentRotation);

    const segmentColors = ['#6C63FF', '#FF6584', '#43D9AD', '#FFA502'];

    allStudents.forEach((student, i) => {
        const angle = i * arcSize;
        ctx.beginPath();
        ctx.fillStyle = segmentColors[i % segmentColors.length];
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, angle, angle + arcSize);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.save();
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 13px Outfit, sans-serif";
        ctx.fillText(student, radius - 15, 5);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();
}

// --- TEPEDEKİ OKUN HİZASINDAKİ ÖĞRENCİYİ BULMA ---
function getStudentUnderPointer(rotation) {
    if (allStudents.length === 0) return null;
    const numSegments = allStudents.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const pointerAngle = 1.5 * Math.PI; // Tepedeki ok açısı (270°)

    let localAngle = (pointerAngle - rotation) % (2 * Math.PI);
    if (localAngle < 0) localAngle += 2 * Math.PI;
    const idx = Math.floor(localAngle / arcSize) % numSegments;
    return allStudents[idx];
}

// --- ÇARK DÖNDÜRME ---
function handleSpinClick() {
    getAudioContext();

    if (selectedPlayer && !isQuestionAnswered) {
        alert(t('alertAnswerFirst'));
        return;
    }
    if (currentRound >= MAX_ROUNDS) return;
    if (isSpinning) return;

    startGroupTurn();
}

function startGroupTurn() {
    if (allStudents.length === 0) return;

    isSpinning = true;
    spinBtn.disabled = true;

    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');

    // 1. Mevcut takımın sıradaki öğrencisini belirle
    const group = groups[currentGroupIndex];
    const playerIndex = groupPlayerIndices[currentGroupIndex] % group.length;
    selectedPlayer = group[playerIndex].name;

    // 2. Çarkın tam bu öğrencinin diliminin ortasında durması için açıyı hesapla
    const targetIndex = allStudents.indexOf(selectedPlayer);
    const numSegments = allStudents.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const pointerAngle = 1.5 * Math.PI; // Tepedeki ok açısı (270°)
    const angleCenter = (targetIndex + 0.5) * arcSize;

    let targetAngle = (pointerAngle - angleCenter) % (2 * Math.PI);
    if (targetAngle < 0) targetAngle += 2 * Math.PI;

    let currentNorm = currentRotation % (2 * Math.PI);
    if (currentNorm < 0) currentNorm += 2 * Math.PI;

    let diff = targetAngle - currentNorm;
    if (diff < 0) diff += 2 * Math.PI;

    // 5-6 tam tur atıp tam o öğrencinin üzerinde dursun
    const extraSpins = (5 + Math.floor(Math.random() * 2)) * (2 * Math.PI);
    const totalRotationToAdd = diff + extraSpins;
    const startRotation = currentRotation;
    const finalRotation = startRotation + totalRotationToAdd;

    const spinDuration = 3200; // 3.2 saniye heyecanlı dönme animasyonu
    let startTime = null;

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);

        // Pürüzsüz yavaşlama (Quartic Ease-Out)
        const ease = 1 - Math.pow(1 - progress, 4);
        currentRotation = startRotation + totalRotationToAdd * ease;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            currentRotation = finalRotation;
            drawWheel();
            stopRotateWheel();
        }
    }

    requestAnimationFrame(animateSpin);
}

function stopRotateWheel() {
    isSpinning = false;
    isQuestionAnswered = false;

    // Çarkın tepedeki okun altına gelen öğrencisini doğrula
    const landedStudent = getStudentUnderPointer(currentRotation);
    if (landedStudent) {
        selectedPlayer = landedStudent;
    }

    updateScoreBoard();
    spinBtn.textContent = t('doneBtn');

    loadNextWord();
}

// --- BAAMBOOZLE SORU VE ŞIKLARI YÜKLEME ---
function loadNextWord() {
    if (activeWords.length === 0) return;

    currentWordIndex = (currentWordIndex + 1) % activeWords.length;
    const wordData = activeWords[currentWordIndex];
    currentQuestionWord = wordData.word;
    isQuestionAnswered = false;

    questionPlaceholder.classList.add('hidden');
    questionImageBox.classList.remove('hidden');

    wordImage.onerror = function () {
        console.warn("Image load error:", wordData.img);
        const filename = wordData.img.split('/').pop();
        this.src = "images/" + encodeURIComponent(filename);
    };
    wordImage.src = wordData.img;

    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.remove('hidden');

    // 3 Options (1 Correct + 2 Distractors)
    const distractors = unit1Words
        .filter(item => item.word !== currentQuestionWord)
        .map(item => item.word);

    const shuffledDistractors = shuffleArray(distractors).slice(0, 2);
    const options = shuffleArray([currentQuestionWord, ...shuffledDistractors]);

    choicesContainer.innerHTML = '';
    choicesContainer.classList.remove('hidden');

    options.forEach((optionText, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `choice-btn choice-theme-${index % 3}`;
        btn.dataset.word = optionText;
        btn.innerHTML = `
            <span class="choice-text">${optionText}</span>
            <span class="choice-icon"></span>
        `;
        btn.addEventListener('click', () => handleChoiceSelect(optionText, currentQuestionWord, btn));
        choicesContainer.appendChild(btn);
    });
}

// --- ŞIK SEÇİLDİĞİNDE YAPILACAKLAR ---
function handleChoiceSelect(selectedWord, correctWord, clickedBtn) {
    if (isQuestionAnswered) return;
    isQuestionAnswered = true;

    const allChoiceButtons = choicesContainer.querySelectorAll('.choice-btn');
    allChoiceButtons.forEach(btn => {
        btn.disabled = true;
    });
    skipWordBtn.classList.add('hidden');

    if (selectedWord === correctWord) {
        clickedBtn.classList.add('choice-correct');
        const icon = clickedBtn.querySelector('.choice-icon');
        if (icon) icon.textContent = '✓';

        launchConfetti();
        playAudioFeedback('correct');

        groupScores[currentGroupIndex] += 10;
        updateScoreBoard();

        showFeedback(t('correctFeedback'), "success");
    } else {
        clickedBtn.classList.add('choice-wrong');
        const wrongIcon = clickedBtn.querySelector('.choice-icon');
        if (wrongIcon) wrongIcon.textContent = '✖';

        playAudioFeedback('wrong');

        allChoiceButtons.forEach(btn => {
            if (btn.dataset.word === correctWord) {
                btn.classList.add('choice-revealed-correct');
                const correctIcon = btn.querySelector('.choice-icon');
                if (correctIcon) correctIcon.textContent = '✓';
            }
        });

        showFeedback(t('wrongFeedback', correctWord), "danger");
    }

    nextTurnBtn.textContent = t('nextTurnBtn');
    nextTurnBtn.classList.remove('hidden');
}

function showFeedback(htmlText, type) {
    feedbackMessage.innerHTML = htmlText;
    feedbackMessage.className = `feedback-message ${type}`;
    feedbackMessage.classList.remove('hidden');
}

// --- SIRADAKİ TURA GEÇİŞ ---
function advanceToNextTurn() {
    groupPlayerIndices[currentGroupIndex]++;

    if (currentGroupIndex === 3) {
        currentRound++;
    }
    currentGroupIndex = (currentGroupIndex + 1) % 4;
    selectedPlayer = null;
    isQuestionAnswered = false;

    updateScoreBoard();

    if (currentRound >= MAX_ROUNDS) {
        endGame();
    } else {
        resetQuestionAreaForSpin();
    }
}

function resetQuestionAreaForSpin() {
    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');

    spinBtn.disabled = false;
    spinBtn.textContent = t('spinBtn');

    const nextTeamName = groupNames[currentGroupIndex];
    playerNameSpan.innerHTML = `<span style="color:var(--primary-color)">${t('teamSpinPrompt', nextTeamName)}</span>`;
}

// --- SKOR TABLOSU GÜNCELLEME ---
function updateScoreBoard() {
    groupNames.forEach((name, i) => {
        const valEl = document.getElementById(`val-team-${i + 1}`);
        const cardEl = document.getElementById(`score-team-${i + 1}`);
        if (valEl) valEl.textContent = groupScores[i];

        if (cardEl) {
            if (i === currentGroupIndex) {
                cardEl.classList.add('active-team');
            } else {
                cardEl.classList.remove('active-team');
            }
        }
    });

    if (roundDisplay) {
        roundDisplay.textContent = `${t('round')} ${Math.min(currentRound + 1, MAX_ROUNDS)} / ${MAX_ROUNDS}`;
    }

    if (selectedPlayer) {
        playerNameSpan.innerHTML = `<span style="color:var(--secondary-color)">${groupNames[currentGroupIndex]}</span>: <strong>${selectedPlayer}</strong>`;
    }
}

// --- OYUN BİTİŞİ ---
function endGame() {
    spinBtn.textContent = t('overBtn');
    spinBtn.disabled = true;

    const maxScore = Math.max(...groupScores);
    const winningIndices = groupScores
        .map((score, idx) => score === maxScore ? idx : -1)
        .filter(idx => idx !== -1);

    const winners = winningIndices.map(idx => groupNames[idx]).join(" & ");

    questionPlaceholder.innerHTML = `
        <div class="placeholder-icon">🏆</div>
        <div class="placeholder-text" style="font-size:1.5rem; color:var(--primary-color);">
            ${t('gameOverTitle')}<br>${t('gameOverWinner', winners)}
        </div>
    `;
    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');

    launchConfetti();
    setTimeout(launchConfetti, 1000);
}

// --- GİRİŞ SAYFASI RENKLİ BAŞLIKLAR ---
function setupLandingPageTitles() {
    const funContainer = document.getElementById('fun-title');
    const welcomeContainer = document.getElementById('welcome-title');
    const gamePageEl = document.getElementById('game-page');

    if (!gamePageEl.classList.contains('hidden')) {
        if (funContainer) funContainer.innerHTML = "";
        if (welcomeContainer) welcomeContainer.innerHTML = "";
        return;
    }

    const colors = ['#FF6584', '#6C63FF', '#43D9AD', '#FFA502', '#FF4757', '#1E90FF', '#2ED573'];

    if (funContainer) funContainer.innerHTML = "";
    if (welcomeContainer) welcomeContainer.innerHTML = "";

    function createLine(text, container) {
        if (!container) return;
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

    const titles = t('landingTitles') || ["ARE YOU READY", "TO HAVE FUN?", "WELCOME TO THE", "WORD WHEEL GAME"];
    if (titles.length >= 4) {
        if (funContainer) {
            createLine(titles[0], funContainer);
            createLine(titles[1], funContainer);
        }
        if (welcomeContainer) {
            createLine(titles[2], welcomeContainer);
            createLine(titles[3], welcomeContainer);
        }
    }
}

// Initial language setup on load
window.addEventListener('DOMContentLoaded', () => {
    let savedLang = 'en';
    try {
        savedLang = localStorage.getItem('wordwheel_lang') || 'en';
    } catch (e) { }

    setupLanguageDropdowns();
    setLanguage(savedLang);
});