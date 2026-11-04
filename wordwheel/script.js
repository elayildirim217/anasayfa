// ==========================================
// WORD WHEEL - BAAMBOOZLE STYLE ENGLISH GAME
// MULTILINGUAL (i18n) SYSTEM
// ==========================================

// --- ÖĞRENCİ LİSTELERİ ---
const boys = ["Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray", "Ertuğrul", "Ömer", "Mehmet"];
const girls = ["Ela", "Feraye", "Pelin", "Seray", "Hira", "Elif Ada", "Naz", "Derin", "Deniz", "Gülnihal", "İman"];

// --- 4 ÜNİTE VE KELİME VERİLERİ (UNITS DATA) ---
const UNITS_DATA = [
    {
        id: 1,
        number: 1,
        nameEn: "Unit 1",
        nameTr: "1. Ünite",
        icon: "🏙️",
        words: [
            { word: "Airport", img: "images/Airport.png" },
            { word: "Hotel", img: "images/Hotel.png" },
            { word: "Restaurant", img: "images/Restaurant.png" },
            { word: "Theater", img: "images/Theater.png" },
            { word: "Transportation", img: "images/Transportation.png" },
            { word: "Skyscraper", img: "images/Skyscraper.png" }
        ]
    },
    {
        id: 2,
        number: 2,
        nameEn: "Unit 2",
        nameTr: "2. Ünite",
        icon: "🎒",
        words: [
            { word: "Go Away", img: "images/Go Away.png" },
            { word: "Pack", img: "images/Pack.png" },
            { word: "Study", img: "images/Study.png" },
            { word: "Actor", img: "images/Actor.png" },
            { word: "Pilot", img: "images/Pilot.png" },
            { word: "University", img: "images/University.png" }
        ]
    },
    {
        id: 3,
        number: 3,
        nameEn: "Unit 3",
        nameTr: "3. Ünite",
        icon: "🏆",
        words: [
            { word: "Breakdancing", img: "images/Breakdancing.png" },
            { word: "Coding", img: "images/coding.png" },
            { word: "Competition", img: "images/competition.png" },
            { word: "Golf", img: "images/Golf.png" },
            { word: "Instructor", img: "images/Instructor.png" },
            { word: "Biking", img: "images/biking.png" }
        ]
    },
    {
        id: 4,
        number: 4,
        nameEn: "Unit 4 (Word Scramble)",
        nameTr: "4. Ünite (Word Scramble)",
        icon: "🔤",
        words: [
            { word: "office", clue: "Workplace with desks and computers", isScramble: true },
            { word: "visit", clue: "To go to see a person or a place", isScramble: true },
            { word: "amazing", clue: "Extremely good, wonderful, surprising", isScramble: true },
            { word: "arrive", clue: "To reach a destination or place", isScramble: true },
            { word: "far", clue: "A long distance away, not near", isScramble: true },
            { word: "stadium", clue: "A large sports arena with spectator seats", isScramble: true },
            { word: "job", clue: "Work that you do regularly for pay", isScramble: true },
            { word: "leave", clue: "To go away or depart from a place", isScramble: true },
            { word: "stay", clue: "To continue to be in the same place", isScramble: true },
            { word: "miss", clue: "To feel sad because someone is not there", isScramble: true },
            { word: "easy", clue: "Simple to do, not difficult", isScramble: true },
            { word: "flood", clue: "An overflow of water covering dry land", isScramble: true },
            { word: "exercise", clue: "Physical activity to stay fit and healthy", isScramble: true },
            { word: "get fit", clue: "To become physically healthy and strong", isScramble: true },
            { word: "creative", clue: "Having good imagination and original ideas", isScramble: true },
            { word: "join club", clue: "To become a member of an activity group", isScramble: true },
            { word: "photography", clue: "The art or hobby of taking photographs", isScramble: true },
            { word: "international", clue: "Involving two or more countries or nations", isScramble: true },
            { word: "match", clue: "A sports competition, game, or contest", isScramble: true },
            { word: "against", clue: "In competition with or opposed to", isScramble: true },
            { word: "win", clue: "To achieve victory or be first in a game", isScramble: true },
            { word: "future", clue: "The time that is to come after the present", isScramble: true },
            { word: "goal", clue: "An aim, target, or point scored in a game", isScramble: true }
        ]
    }
];

// --- ÖZEL KELİME YÖNETİMİ (CUSTOM WORDS) ---
function getCustomWords() {
    try {
        const val = localStorage.getItem('wordwheel_custom_words');
        return val ? JSON.parse(val) : [];
    } catch (e) {
        return [];
    }
}

function saveCustomWords(arr) {
    try {
        localStorage.setItem('wordwheel_custom_words', JSON.stringify(arr));
    } catch (e) { }
}

function getEffectiveUnits() {
    const list = [...UNITS_DATA];
    const customWords = getCustomWords();
    if (customWords.length > 0) {
        list.push({
            id: 5,
            number: 5,
            nameEn: "Custom Words",
            nameTr: "Custom Words",
            icon: "⭐",
            words: customWords.map(w => ({
                word: w.word,
                clue: w.clue || w.tr || "",
                isScramble: !w.img,
                img: w.img || null
            }))
        });
    }
    return list;
}

function getAllWords() {
    return getEffectiveUnits().flatMap(u => u.words.map(w => ({
        ...w,
        unitId: u.id,
        unitNumber: u.number,
        unitNameEn: u.nameEn,
        unitNameTr: u.nameTr,
        unitIcon: u.icon
    })));
}

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
        landingTitles: ["ARE YOU READY", "TO HAVE FUN?", "WELCOME TO THE", "WORD WHEEL GAME"],
        unitsBtn: "Units",
        unitsSidebarTitle: "Unit Selection",
        unitsSidebarDesc: "Select one unit or choose multiple units to practice them in mixed mode!",
        presetAllUnits: "Mix All Units",
        presetFirst3Units: "Units 1-3 (Images)",
        presetUnit4Only: "Unit 4 (Scramble)",
        presetUnit1Only: "Unit 1 Only",
        doneApplyBtn: "Done & Apply",
        landingUnitsHeading: "Choose Units to Play",
        mixAllMode: "🎲 Mix All",
        customMode: "⚙️ Custom Selection",
        unitLabel: "Unit",
        wordsCountSuffix: "words",
        onlyThisBtn: "Only this",
        allUnitsSelectedSummary: (words) => `All units selected (${words} words • Mixed Mode)`,
        allUnitsMixed: "All Units (Mix)",
        multiUnitsSelectedSummary: (units, words) => `${units} units selected (${words} words • Mixed Mode)`,
        singleUnitSelectedSummary: (unitNum, words) => `Unit ${unitNum} selected (${words} words • Single Mode)`,
        unitActiveChip: (count, isMix) => isMix ? `Mix (${count} Units)` : `Unit ${count}`,
        questionUnitTag: (num) => `Unit ${num}`,
        scrambleHeaderTitle: "Unscramble the Letters!",
        scrambleModeBadge: "Letter Matching",
        scrambleMeaningLabel: "Clue:",
        scrambleLength: (chars, words) => words > 1 ? `${words} Words • ${chars} Letters` : `${chars} Letters`,
        scrambleCorrect: (w) => `🎉 Awesome! Correct word: <strong>${w}</strong> (+10 Points)`,
        scrambleWrong: "❌ Not quite right! Rearrange the letters or use Hint 💡",
        scrambleRevealed: (w) => `💡 Answer revealed: <strong>${w}</strong>`,
        remainingStudentsBadge: (count) => `👥 Remaining: ${count}`,
        lblBackspace: "Delete",
        lblClear: "Reset",
        lblHint: "Hint",
        lblCheck: "Check",
        lblReveal: "Show Answer",
        emptyCustomWords: "No custom words yet. Add some using the form above!"
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
        landingTitles: ["HAZIR MISINIZ", "EĞLENMEYE?", "HOŞ GELDİNİZ", "KELİME ÇARKINA"],
        unitsBtn: "Üniteler",
        unitsSidebarTitle: "Ünite Seçimi",
        unitsSidebarDesc: "İster tek bir ünite seçin, ister birden fazla ünite seçerek karışık oynayın!",
        presetAllUnits: "Tüm Üniteler (Karışık)",
        presetFirst3Units: "1-3. Üniteler (Görselli)",
        presetUnit4Only: "4. Ünite (Harf Eşleştirme)",
        presetUnit1Only: "Sadece 1. Ünite",
        doneApplyBtn: "Tamam & Uygula",
        landingUnitsHeading: "Oynanacak Üniteleri Seçin",
        mixAllMode: "🎲 Tümünü Karıştır",
        customMode: "⚙️ Özel Seçim",
        unitLabel: "Ünite",
        wordsCountSuffix: "kelime",
        onlyThisBtn: "Sadece bu",
        allUnitsSelectedSummary: (words) => `Tüm üniteler seçili (${words} kelime • Karışık Mod)`,
        allUnitsMixed: "Tüm Üniteler (Karışık)",
        multiUnitsSelectedSummary: (units, words) => `${units} ünite seçildi (${words} kelime • Karışık Mod)`,
        singleUnitSelectedSummary: (unitNum, words) => `${unitNum}. Ünite seçildi (${words} kelime • Normal Mod)`,
        unitActiveChip: (count, isMix) => isMix ? `Karışık (${count} Ünite)` : `${count}. Ünite`,
        questionUnitTag: (num) => `${num}. Ünite`,
        scrambleHeaderTitle: "Unscramble the Letters!",
        scrambleModeBadge: "Letter Matching",
        scrambleMeaningLabel: "Clue:",
        scrambleLength: (chars, words) => words > 1 ? `${words} Words • ${chars} Letters` : `${chars} Letters`,
        scrambleCorrect: (w) => `🎉 Awesome! Correct word: <strong>${w}</strong> (+10 Points)`,
        scrambleWrong: "❌ Not quite right! Rearrange the letters or use Hint 💡",
        scrambleRevealed: (w) => `💡 Answer revealed: <strong>${w}</strong>`,
        remainingStudentsBadge: (count) => `👥 Remaining: ${count}`,
        lblBackspace: "Delete",
        lblClear: "Reset",
        lblHint: "Hint",
        lblCheck: "Check",
        lblReveal: "Reveal",
        emptyCustomWords: "No custom words yet. Add some using the form above!"
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

    // Unit selector UI texts
    const floatingUnitsLabel = document.getElementById('floating-units-label');
    if (floatingUnitsLabel) floatingUnitsLabel.textContent = t('unitsBtn');

    const sidebarTitle = document.getElementById('sidebar-title');
    if (sidebarTitle) sidebarTitle.textContent = t('unitsSidebarTitle');

    const sidebarDescText = document.getElementById('sidebar-desc-text');
    if (sidebarDescText) sidebarDescText.textContent = t('unitsSidebarDesc');

    const presetAllLabel = document.getElementById('preset-all-label');
    if (presetAllLabel) presetAllLabel.textContent = t('presetAllUnits');

    const presetFirst3Label = document.getElementById('preset-first3-label');
    if (presetFirst3Label) presetFirst3Label.textContent = t('presetFirst3Units');

    const presetUnit1Label = document.getElementById('preset-unit1-label');
    if (presetUnit1Label) presetUnit1Label.textContent = t('presetUnit1Only');

    const sidebarDoneLabel = document.getElementById('sidebar-done-label');
    if (sidebarDoneLabel) sidebarDoneLabel.textContent = t('doneApplyBtn');

    const landingUnitsHeading = document.getElementById('landing-units-heading');
    if (landingUnitsHeading) landingUnitsHeading.textContent = t('landingUnitsHeading');

    const landingQuickAll = document.getElementById('landing-quick-all');
    if (landingQuickAll) landingQuickAll.textContent = t('mixAllMode');

    const landingQuickCustom = document.getElementById('landing-quick-custom');
    if (landingQuickCustom) landingQuickCustom.textContent = t('customMode');

    // Action Buttons (English-only)
    const lblBackspace = document.getElementById('lbl-backspace');
    if (lblBackspace) lblBackspace.textContent = "Delete";

    const lblClear = document.getElementById('lbl-clear');
    if (lblClear) lblClear.textContent = "Reset";

    const lblHint = document.getElementById('lbl-hint');
    if (lblHint) lblHint.textContent = "Hint";

    const lblCheck = document.getElementById('lbl-check');
    if (lblCheck) lblCheck.textContent = "Check";

    const lblReveal = document.getElementById('lbl-reveal');
    if (lblReveal) lblReveal.textContent = "Reveal";

    const openCustomWordsBtnEl = document.getElementById('open-custom-words-btn');
    if (openCustomWordsBtnEl) openCustomWordsBtnEl.textContent = "➕ Add Words";

    const sidebarAddWordLabel = document.getElementById('sidebar-add-word-label');
    if (sidebarAddWordLabel) sidebarAddWordLabel.textContent = "Add Words";

    updateRemainingBadge();

    // Scoreboard & dynamic labels
    updateScoreBoard();
    if (!selectedPlayer && !isSpinning) {
        resetQuestionAreaForSpin();
    }
    setupLandingPageTitles();
    if (typeof renderUnitsUI === 'function') {
        renderUnitsUI();
    }
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
let totalStudentsCount = 24;
let turnsPlayed = 0;
let currentRotation = 0;
let isSpinning = false;
let currentWordIndex = -1;
let currentQuestionWord = null;
let isQuestionAnswered = false;
let groupScores = [0, 0, 0, 0];
let currentGroupIndex = 0;
let selectedPlayer = null;
let currentRound = 0;
let MAX_ROUNDS = 6;

// Scramble Game State
let currentScrambleTarget = "";
let currentScrambleClean = "";
let scrambleLetterPool = [];
let placedSlots = [];
let wordSegments = [];
let wrongAttempts = 0;

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
const remainingStudentsDisplay = document.getElementById('remaining-students-display');

// Question Area Elements
const questionPlaceholder = document.getElementById('question-placeholder');
const questionImageBox = document.getElementById('question-image-box');
const wordImage = document.getElementById('word-image');
const questionScrambleBox = document.getElementById('question-scramble-box');
const scrambleInteractiveArea = document.getElementById('scramble-interactive-area');
const scrambleSlotsWrapper = document.getElementById('scramble-slots-wrapper');
const scrambleTilesPool = document.getElementById('scramble-tiles-pool');
const choicesContainer = document.getElementById('choices-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextTurnBtn = document.getElementById('next-turn-btn');
const skipWordBtn = document.getElementById('skip-word-btn');
const questionUnitBadge = document.getElementById('question-unit-badge');

// Scramble Action Buttons
const scrambleBackspaceBtn = document.getElementById('scramble-backspace-btn');
const scrambleClearBtn = document.getElementById('scramble-clear-btn');
const scrambleHintBtn = document.getElementById('scramble-hint-btn');
const scrambleCheckBtn = document.getElementById('scramble-check-btn');
const scrambleRevealBtn = document.getElementById('scramble-reveal-btn');

// Unit Selection DOM Elements
let selectedUnitIds = getEffectiveUnits().map(u => u.id); // Default: all units (Karışık / Mixed)

const floatingUnitsBtn = document.getElementById('floating-units-btn');
const floatingUnitsBadge = document.getElementById('floating-units-badge');
const unitsSidebar = document.getElementById('units-sidebar');
const unitsSidebarBackdrop = document.getElementById('units-sidebar-backdrop');
const closeUnitsSidebarBtn = document.getElementById('close-units-sidebar');
const sidebarDoneBtn = document.getElementById('sidebar-done-btn');
const sidebarUnitsList = document.getElementById('sidebar-units-list');
const sidebarActiveSummary = document.getElementById('sidebar-active-summary');

const landingUnitsCard = document.getElementById('landing-units-card');
const landingUnitsGrid = document.getElementById('landing-units-grid');
const landingQuickAll = document.getElementById('landing-quick-all');
const landingQuickCustom = document.getElementById('landing-quick-custom');
const unitsStatusText = document.getElementById('units-status-text');

const presetAllBtn = document.getElementById('preset-all-btn');
const presetFirst3Btn = document.getElementById('preset-first3-btn');
const presetUnit4Btn = document.getElementById('preset-unit4-btn');
const presetUnit1Btn = document.getElementById('preset-unit1-btn');
const sidebarAddWordBtn = document.getElementById('sidebar-add-word-btn');
const openCustomWordsBtn = document.getElementById('open-custom-words-btn');

const gameUnitChip = document.getElementById('game-unit-chip');
const gameUnitChipText = document.getElementById('game-unit-chip-text');

let ctx;

// --- EVENT LISTENERS ---
if (generateBtn) generateBtn.addEventListener('click', generateGroups);
if (startGameBtn) startGameBtn.addEventListener('click', startGame);
if (spinBtn) spinBtn.addEventListener('click', handleSpinClick);
if (nextTurnBtn) nextTurnBtn.addEventListener('click', advanceToNextTurn);
if (skipWordBtn) skipWordBtn.addEventListener('click', loadNextWord);

// --- ÜNİTE SİSTEMİ MANTIĞI (UNIT SYSTEM LOGIC) ---
function initUnitsSystem() {
    if (floatingUnitsBtn) floatingUnitsBtn.addEventListener('click', openUnitsSidebar);
    if (closeUnitsSidebarBtn) closeUnitsSidebarBtn.addEventListener('click', closeUnitsSidebar);
    if (unitsSidebarBackdrop) unitsSidebarBackdrop.addEventListener('click', closeUnitsSidebar);
    if (sidebarDoneBtn) sidebarDoneBtn.addEventListener('click', closeUnitsSidebar);
    if (gameUnitChip) gameUnitChip.addEventListener('click', openUnitsSidebar);

    if (presetAllBtn) presetAllBtn.addEventListener('click', selectAllUnits);
    if (presetFirst3Btn) presetFirst3Btn.addEventListener('click', selectFirst3Units);
    if (presetUnit4Btn) presetUnit4Btn.addEventListener('click', selectUnit4Only);
    if (presetUnit1Btn) presetUnit1Btn.addEventListener('click', () => selectSingleUnit(1));

    if (landingQuickAll) landingQuickAll.addEventListener('click', selectAllUnits);
    if (landingQuickCustom) landingQuickCustom.addEventListener('click', openUnitsSidebar);

    initCustomWordsModal();
    initScrambleControls();
    renderUnitsUI();
}

function openUnitsSidebar() {
    if (!unitsSidebar) return;
    unitsSidebar.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeUnitsSidebar() {
    if (!unitsSidebar) return;
    unitsSidebar.classList.add('hidden');
    document.body.style.overflow = '';
}

function toggleUnit(unitId) {
    const idx = selectedUnitIds.indexOf(unitId);
    if (idx > -1) {
        if (selectedUnitIds.length > 1) {
            selectedUnitIds.splice(idx, 1);
        } else {
            return; // En az 1 ünite seçili kalmalı
        }
    } else {
        selectedUnitIds.push(unitId);
        selectedUnitIds.sort((a, b) => a - b);
    }
    onUnitsSelectionChanged();
}

function selectAllUnits() {
    selectedUnitIds = getEffectiveUnits().map(u => u.id);
    onUnitsSelectionChanged();
}

function selectFirst3Units() {
    selectedUnitIds = [1, 2, 3];
    onUnitsSelectionChanged();
}

function selectUnit4Only() {
    selectedUnitIds = [4];
    onUnitsSelectionChanged();
}

function selectSingleUnit(unitId) {
    selectedUnitIds = [unitId];
    onUnitsSelectionChanged();
}

function onUnitsSelectionChanged() {
    renderUnitsUI();
    if (!gamePage.classList.contains('hidden')) {
        rebuildActiveWords(true);
    }
}

function getSelectedWords() {
    const selected = getEffectiveUnits().filter(u => selectedUnitIds.includes(u.id));
    return selected.flatMap(u => u.words.map(w => ({
        ...w,
        unitId: u.id,
        unitNumber: u.number,
        unitName: (currentLang === 'tr' ? u.nameTr : u.nameEn),
        unitIcon: u.icon
    })));
}

function rebuildActiveWords(keepCurrent = false) {
    const wordsPool = getSelectedWords();
    if (wordsPool.length === 0) return;

    let expanded = [];
    while (expanded.length < 28 && wordsPool.length > 0) {
        expanded = expanded.concat(shuffleArray(wordsPool));
    }
    activeWords = expanded;

    if (!keepCurrent) {
        currentWordIndex = -1;
    }
}

function renderUnitsUI() {
    const allUnits = getEffectiveUnits();
    const isAll = allUnits.length > 0 && allUnits.every(u => selectedUnitIds.includes(u.id));
    const isUnits123 = selectedUnitIds.length === 3 && [1, 2, 3].every(id => selectedUnitIds.includes(id));
    const isUnit4Only = selectedUnitIds.length === 1 && selectedUnitIds[0] === 4;
    const isSingleUnit1 = selectedUnitIds.length === 1 && selectedUnitIds[0] === 1;

    if (presetAllBtn) presetAllBtn.classList.toggle('active', isAll);
    if (presetFirst3Btn) presetFirst3Btn.classList.toggle('active', isUnits123);
    if (presetUnit4Btn) presetUnit4Btn.classList.toggle('active', isUnit4Only);
    if (presetUnit1Btn) presetUnit1Btn.classList.toggle('active', isSingleUnit1);

    if (landingQuickAll) landingQuickAll.classList.toggle('active', isAll);
    if (landingQuickCustom) landingQuickCustom.classList.toggle('active', !isAll);

    const totalWords = getSelectedWords().length;
    let summaryText = "";
    let chipText = "";

    if (isAll) {
        summaryText = t('allUnitsSelectedSummary', totalWords);
        chipText = t('allUnitsMixed');
        if (floatingUnitsBadge) floatingUnitsBadge.textContent = `${allUnits.length}`;
    } else if (selectedUnitIds.length === 1) {
        const u = allUnits.find(x => x.id === selectedUnitIds[0]);
        const num = u ? u.number : selectedUnitIds[0];
        summaryText = t('singleUnitSelectedSummary', num, totalWords);
        chipText = `${t('unitLabel')} ${num}`;
        if (floatingUnitsBadge) floatingUnitsBadge.textContent = `${num}`;
    } else {
        summaryText = t('multiUnitsSelectedSummary', selectedUnitIds.length, totalWords);
        chipText = `${selectedUnitIds.join(', ')}. ${t('unitsBtn')} (${t('mixAllMode').replace('🎲 ', '')})`;
        if (floatingUnitsBadge) floatingUnitsBadge.textContent = `${selectedUnitIds.length}`;
    }

    if (unitsStatusText) unitsStatusText.textContent = summaryText;
    if (sidebarActiveSummary) sidebarActiveSummary.textContent = summaryText;
    if (gameUnitChipText) gameUnitChipText.textContent = chipText;

    // 1. Landing Grid Render
    if (landingUnitsGrid) {
        landingUnitsGrid.innerHTML = '';
        allUnits.forEach(unit => {
            const isSelected = selectedUnitIds.includes(unit.id);
            const unitCard = document.createElement('div');
            unitCard.className = `landing-unit-item ${isSelected ? 'selected' : ''}`;
            const unitName = (currentLang === 'tr' ? unit.nameTr : unit.nameEn);
            const wordListSample = unit.words.map(w => w.word).slice(0, 6).join(', ') + (unit.words.length > 6 ? '...' : '');

            unitCard.innerHTML = `
                <div class="unit-check-circle">${isSelected ? '✓' : ''}</div>
                <div class="unit-item-icon">${unit.icon}</div>
                <div class="unit-item-info">
                    <span class="unit-number-tag">${unitName}</span>
                    <strong class="unit-item-name">${wordListSample}</strong>
                    <span class="unit-word-count">${unit.words.length} ${t('wordsCountSuffix')}</span>
                </div>
                <button type="button" class="unit-only-pill" title="${t('onlyThisBtn')}">${t('onlyThisBtn')}</button>
            `;

            unitCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('unit-only-pill')) {
                    e.stopPropagation();
                    selectSingleUnit(unit.id);
                } else {
                    toggleUnit(unit.id);
                }
            });

            landingUnitsGrid.appendChild(unitCard);
        });
    }

    // 2. Sidebar List Render
    if (sidebarUnitsList) {
        sidebarUnitsList.innerHTML = '';
        allUnits.forEach(unit => {
            const isSelected = selectedUnitIds.includes(unit.id);
            const row = document.createElement('div');
            row.className = `sidebar-unit-row ${isSelected ? 'active' : ''}`;
            const unitName = (currentLang === 'tr' ? unit.nameTr : unit.nameEn);
            const wordListSample = unit.words.map(w => w.word).slice(0, 6).join(', ') + (unit.words.length > 6 ? '...' : '');

            row.innerHTML = `
                <label class="unit-row-toggle">
                    <input type="checkbox" class="unit-checkbox" ${isSelected ? 'checked' : ''} />
                    <span class="custom-check-box"></span>
                </label>
                <div class="unit-row-icon">${unit.icon}</div>
                <div class="unit-row-details">
                    <div class="unit-row-title-line">
                        <span class="unit-pill-tag">${unitName}</span>
                    </div>
                    <span class="unit-row-sub">${wordListSample}</span>
                </div>
                <button type="button" class="unit-single-select-btn" title="${t('onlyThisBtn')}">🎯</button>
            `;

            const chk = row.querySelector('.unit-checkbox');
            if (chk) {
                chk.addEventListener('change', (e) => {
                    e.stopPropagation();
                    toggleUnit(unit.id);
                });
            }

            const singleBtn = row.querySelector('.unit-single-select-btn');
            if (singleBtn) {
                singleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectSingleUnit(unit.id);
                });
            }

            row.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT' && !e.target.classList.contains('unit-single-select-btn')) {
                    toggleUnit(unit.id);
                }
            });

            sidebarUnitsList.appendChild(row);
        });
    }
}

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

    shuffledGirls.forEach((girl, i) => groups[i % 4].push({ name: girl, gender: 'Girl', played: false }));
    shuffledBoys.forEach((boy, i) => groups[i % 4].push({ name: boy, gender: 'Boy', played: false }));

    allStudents = groups.flat().map(s => s.name);
    totalStudentsCount = allStudents.length;
    turnsPlayed = 0;

    displayGroups();
    if (startGameBtn) startGameBtn.classList.remove('hidden');
}

function displayGroups() {
    if (!groupsContainer) return;
    groupsContainer.innerHTML = '';
    groupsContainer.classList.remove('hidden');
    groups.forEach((group, index) => {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `<h3>${groupNames[index]}</h3><ul>${group.map(s => `<li>👤 ${s.name}${s.played ? ' <span style="color:#2ECC71; font-weight:800;">✓</span>' : ''}</li>`).join('')}</ul>`;
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

    // Reset played state for all students in all groups
    groups.forEach(group => group.forEach(student => student.played = false));
    allStudents = groups.flat().map(s => s.name);
    totalStudentsCount = allStudents.length;
    turnsPlayed = 0;

    groupScores = [0, 0, 0, 0];
    currentGroupIndex = 0;
    currentRound = 0;
    MAX_ROUNDS = Math.ceil(totalStudentsCount / 4);
    selectedPlayer = null;
    currentWordIndex = -1;

    rebuildActiveWords();

    updateScoreBoard();
    updateRemainingBadge();
    initWheel();
    resetQuestionAreaForSpin();
}

function updateRemainingBadge() {
    if (remainingStudentsDisplay) {
        remainingStudentsDisplay.textContent = `👥 Remaining: ${allStudents.length}`;
    }
}

// --- ÇARK ÇİZİMİ ---
function initWheel() {
    if (wheelCanvas) {
        ctx = wheelCanvas.getContext('2d');
        drawWheel();
    }
}

function drawWheel() {
    if (!ctx) return;
    const radius = wheelCanvas.width / 2;

    if (allStudents.length === 0) {
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        ctx.save();
        ctx.translate(radius, radius);
        ctx.beginPath();
        ctx.arc(0, 0, radius - 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#6C63FF';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.fillText(t('allStudentsPlayedTitle'), 0, 0);
        ctx.restore();
        return;
    }

    const numSegments = allStudents.length;
    const arcSize = (2 * Math.PI) / numSegments;

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
        const fontSize = numSegments > 18 ? 12 : (numSegments > 10 ? 14 : 16);
        ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
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
    if (allStudents.length === 0) {
        endGame();
        return;
    }
    if (isSpinning) return;

    startGroupTurn();
}

function startGroupTurn() {
    if (allStudents.length === 0) {
        endGame();
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;

    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    if (questionScrambleBox) questionScrambleBox.classList.add('hidden');
    if (scrambleInteractiveArea) scrambleInteractiveArea.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');

    // 1. Mevcut takımın henüz oynamamış öğrencisini belirle
    let group = groups[currentGroupIndex];
    let unplayed = group.filter(p => !p.played);

    // Eğer bu takımın tüm öğrencileri oynadıysa sıradaki takıma geç
    if (unplayed.length === 0) {
        let attempts = 0;
        while (unplayed.length === 0 && attempts < 4) {
            currentGroupIndex = (currentGroupIndex + 1) % 4;
            group = groups[currentGroupIndex];
            unplayed = group.filter(p => !p.played);
            attempts++;
        }
    }

    if (unplayed.length > 0) {
        const nextPlayer = unplayed[Math.floor(Math.random() * unplayed.length)];
        selectedPlayer = nextPlayer.name;
    } else {
        selectedPlayer = allStudents[0];
    }

    // 2. Çarkın tam bu öğrencinin diliminin ortasında durması için açıyı hesapla
    let targetIndex = allStudents.indexOf(selectedPlayer);
    if (targetIndex === -1) targetIndex = 0;
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

// --- BAAMBOOZLE VE HARF EŞLEŞTİRME SORULARI YÜKLEME ---
function loadNextWord() {
    if (activeWords.length === 0) {
        rebuildActiveWords();
    }
    if (activeWords.length === 0) return;

    currentWordIndex = (currentWordIndex + 1) % activeWords.length;
    const wordData = activeWords[currentWordIndex];
    currentQuestionWord = wordData.word;
    isQuestionAnswered = false;

    questionPlaceholder.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.remove('hidden');

    // Update unit badge above question
    if (questionUnitBadge) {
        const uNum = wordData.unitNumber || 1;
        const uIcon = wordData.unitIcon || '🏷️';
        questionUnitBadge.innerHTML = `<span class="unit-badge-emoji">${uIcon}</span> <span>${t('questionUnitTag', uNum)}</span>`;
        questionUnitBadge.classList.remove('hidden');
    }

    const isScramble = wordData.isScramble || !wordData.img;

    if (isScramble) {
        // --- 🔤 HARF EŞLEŞTİRME / SCRAMBLE MODU ---
        questionImageBox.classList.add('hidden');
        choicesContainer.classList.add('hidden');

        if (questionScrambleBox) {
            questionScrambleBox.classList.remove('hidden');

            const scrambleHeaderTitle = document.getElementById('scramble-header-title');
            if (scrambleHeaderTitle) scrambleHeaderTitle.textContent = "Unscramble the Letters";

            const scrambleModeBadge = document.getElementById('scramble-mode-badge');
            if (scrambleModeBadge) scrambleModeBadge.textContent = "Letter Matching";

            const meaningBanner = document.getElementById('scramble-meaning-banner');
            const meaningText = document.getElementById('scramble-meaning-text');
            if (meaningBanner && meaningText) {
                const clueText = wordData.clue || wordData.en || wordData.hint || wordData.tr;
                if (clueText) {
                    meaningText.textContent = `${t('scrambleMeaningLabel')} "${clueText}"`;
                    meaningBanner.classList.remove('hidden');
                } else {
                    meaningBanner.classList.add('hidden');
                }
            }

            const lengthTag = document.getElementById('scramble-length-tag');
            if (lengthTag) {
                const wordsList = currentQuestionWord.trim().split(/\s+/);
                const charCount = currentQuestionWord.replace(/[^a-zA-Z0-9]/g, '').length;
                lengthTag.textContent = t('scrambleLength', charCount, wordsList.length);
            }
        }

        setupScrambleQuestion(currentQuestionWord);
    } else {
        // --- 🖼️ GÖRSELLİ 3 ŞIKLI BAAMBOOZLE MODU ---
        if (questionScrambleBox) questionScrambleBox.classList.add('hidden');
        if (scrambleInteractiveArea) scrambleInteractiveArea.classList.add('hidden');

        questionImageBox.classList.remove('hidden');
        choicesContainer.classList.remove('hidden');

        wordImage.onerror = function () {
            console.warn("Image load error:", wordData.img);
            const filename = wordData.img.split('/').pop();
            this.src = "images/" + encodeURIComponent(filename);
        };
        wordImage.src = wordData.img;

        // 3 Choices (1 Doğru + 2 Çeldirici)
        const activeWordPool = activeWords.length >= 3 ? activeWords : getAllWords();
        let distractors = activeWordPool
            .filter(item => item.word !== currentQuestionWord)
            .map(item => item.word);

        let uniqueDistractors = Array.from(new Set(distractors));
        if (uniqueDistractors.length < 2) {
            const allGlobalWords = getAllWords()
                .filter(item => item.word !== currentQuestionWord)
                .map(item => item.word);
            uniqueDistractors = Array.from(new Set([...uniqueDistractors, ...allGlobalWords]));
        }

        const shuffledDistractors = shuffleArray(uniqueDistractors).slice(0, 2);
        const options = shuffleArray([currentQuestionWord, ...shuffledDistractors]);

        choicesContainer.innerHTML = '';
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
}

// --- ŞIK SEÇİLDİĞİNDE YAPILACAKLAR (GÖRSELLİ SORULAR) ---
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

// ==========================================
// HARF EŞLEŞTİRME (SCRAMBLE) MOTORU
// ==========================================
function setupScrambleQuestion(word) {
    currentScrambleTarget = word.trim();
    wordSegments = currentScrambleTarget.toUpperCase().split(/\s+/);
    const cleanLetters = currentScrambleTarget.toUpperCase().replace(/[^A-Z0-9]/g, '').split('');
    currentScrambleClean = cleanLetters.join('');

    wrongAttempts = 0;
    if (scrambleInteractiveArea) scrambleInteractiveArea.classList.remove('hidden');

    // Harfleri pürüzsüz ve orijinal haliyle çakışmayacak şekilde karıştır
    let scrambledLetters = shuffleArray([...cleanLetters]);
    let guard = 0;
    while (scrambledLetters.join('') === currentScrambleClean && scrambledLetters.length > 1 && guard < 10) {
        scrambledLetters = shuffleArray([...cleanLetters]);
        guard++;
    }
    if (scrambledLetters.join('') === currentScrambleClean && scrambledLetters.length > 1) {
        const tmp = scrambledLetters[0];
        scrambledLetters[0] = scrambledLetters[1];
        scrambledLetters[1] = tmp;
    }

    scrambleLetterPool = scrambledLetters.map((char, index) => ({
        id: `tile-${index}`,
        letter: char,
        used: false,
        colorClass: `tile-color-${index % 6}`
    }));

    placedSlots = new Array(cleanLetters.length).fill(null);

    const revealBtn = document.getElementById('scramble-reveal-btn');
    if (revealBtn) revealBtn.classList.add('hidden');

    renderScrambleSlots();
    renderScrambleTiles();
}

function renderScrambleSlots() {
    const wrapper = document.getElementById('scramble-slots-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const wordsContainer = document.createElement('div');
    wordsContainer.className = 'scramble-words-container';

    let globalSlotIndex = 0;
    wordSegments.forEach((segment, wIdx) => {
        const row = document.createElement('div');
        row.className = 'scramble-word-row';

        for (let cIdx = 0; cIdx < segment.length; cIdx++) {
            const thisSlotIndex = globalSlotIndex;
            const slot = document.createElement('button');
            slot.type = 'button';
            slot.className = 'scramble-slot';
            slot.setAttribute('data-slot-index', thisSlotIndex);
            if (slot.dataset) slot.dataset.slotIndex = thisSlotIndex;

            const placed = placedSlots[thisSlotIndex];
            if (placed) {
                slot.textContent = placed.letter;
                slot.classList.add('filled');
                if (placed.status === 'correct') {
                    slot.classList.add('correct');
                } else if (placed.status === 'wrong') {
                    slot.classList.add('wrong');
                }
            } else {
                slot.textContent = '';
            }

            slot.addEventListener('click', () => {
                if (isQuestionAnswered) return;
                removeTileFromSlot(thisSlotIndex);
            });

            row.appendChild(slot);
            globalSlotIndex++;
        }

        wordsContainer.appendChild(row);
        if (wIdx < wordSegments.length - 1) {
            const gap = document.createElement('div');
            gap.className = 'scramble-word-gap';
            wordsContainer.appendChild(gap);
        }
    });

    wrapper.appendChild(wordsContainer);
}

function renderScrambleTiles() {
    const pool = document.getElementById('scramble-tiles-pool');
    if (!pool) return;
    pool.innerHTML = '';

    scrambleLetterPool.forEach(item => {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = `scramble-tile ${item.colorClass} ${item.used ? 'used' : ''}`;
        tile.id = item.id;
        tile.textContent = item.letter;
        tile.disabled = item.used || isQuestionAnswered;

        tile.addEventListener('click', () => {
            if (item.used || isQuestionAnswered) return;
            placeTile(item);
        });

        pool.appendChild(tile);
    });
}

function placeTile(item) {
    const emptyIndex = placedSlots.findIndex(s => s === null);
    if (emptyIndex === -1) return;

    placedSlots[emptyIndex] = {
        letter: item.letter,
        tileId: item.id,
        status: null
    };
    item.used = true;

    renderScrambleSlots();
    renderScrambleTiles();

    // Tüm harfler yerleştirildiyse otomatik kontrol et
    if (!placedSlots.includes(null)) {
        checkScrambleAnswer();
    }
}

function removeTileFromSlot(slotIndex) {
    const placed = placedSlots[slotIndex];
    if (!placed) return;

    const tileItem = scrambleLetterPool.find(t => t.id === placed.tileId);
    if (tileItem) {
        tileItem.used = false;
    }

    placedSlots[slotIndex] = null;

    renderScrambleSlots();
    renderScrambleTiles();
}

function handleScrambleBackspace() {
    if (isQuestionAnswered) return;
    for (let i = placedSlots.length - 1; i >= 0; i--) {
        if (placedSlots[i] !== null) {
            removeTileFromSlot(i);
            break;
        }
    }
}

function handleScrambleClear() {
    if (isQuestionAnswered) return;
    scrambleLetterPool.forEach(t => t.used = false);
    placedSlots.fill(null);
    renderScrambleSlots();
    renderScrambleTiles();
}

function handleScrambleHint() {
    if (isQuestionAnswered) return;
    const cleanArr = currentScrambleClean.split('');
    let targetIndex = -1;
    for (let i = 0; i < cleanArr.length; i++) {
        if (!placedSlots[i] || placedSlots[i].letter !== cleanArr[i]) {
            targetIndex = i;
            break;
        }
    }
    if (targetIndex === -1) return;

    if (placedSlots[targetIndex]) {
        const oldTile = scrambleLetterPool.find(t => t.id === placedSlots[targetIndex].tileId);
        if (oldTile) oldTile.used = false;
        placedSlots[targetIndex] = null;
    }

    const neededChar = cleanArr[targetIndex];
    let freeTile = scrambleLetterPool.find(t => !t.used && t.letter === neededChar);

    if (!freeTile) {
        const wrongSlotIdx = placedSlots.findIndex((s, idx) => s && s.letter === neededChar && idx !== targetIndex);
        if (wrongSlotIdx !== -1) {
            removeTileFromSlot(wrongSlotIdx);
            freeTile = scrambleLetterPool.find(t => !t.used && t.letter === neededChar);
        }
    }

    if (freeTile) {
        placedSlots[targetIndex] = { letter: freeTile.letter, tileId: freeTile.id, status: 'correct' };
        freeTile.used = true;
    }

    renderScrambleSlots();
    renderScrambleTiles();

    if (!placedSlots.includes(null)) {
        checkScrambleAnswer();
    }
}

function revealScrambleAnswer() {
    if (isQuestionAnswered) return;
    scrambleLetterPool.forEach(t => t.used = false);
    const cleanArr = currentScrambleClean.split('');
    cleanArr.forEach((char, idx) => {
        const tile = scrambleLetterPool.find(t => !t.used && t.letter === char);
        if (tile) {
            tile.used = true;
            placedSlots[idx] = { letter: char, tileId: tile.id, status: 'correct' };
        }
    });

    renderScrambleSlots();
    renderScrambleTiles();

    isQuestionAnswered = true;
    skipWordBtn.classList.add('hidden');

    showFeedback(t('scrambleRevealed', currentQuestionWord), "info");

    nextTurnBtn.textContent = t('nextTurnBtn');
    nextTurnBtn.classList.remove('hidden');
}

function checkScrambleAnswer() {
    if (isQuestionAnswered) return;

    const hasAnyPlaced = placedSlots.some(s => s !== null);
    if (!hasAnyPlaced) {
        showFeedback("Please place some letters first!", "info");
        return;
    }

    const cleanArr = currentScrambleClean.split('');
    let allCorrect = true;
    let anyWrong = false;

    for (let i = 0; i < cleanArr.length; i++) {
        if (placedSlots[i]) {
            if (placedSlots[i].letter.toUpperCase() === cleanArr[i]) {
                placedSlots[i].status = 'correct';
            } else {
                placedSlots[i].status = 'wrong';
                allCorrect = false;
                anyWrong = true;
            }
        } else {
            allCorrect = false;
        }
    }

    renderScrambleSlots();

    if (allCorrect && !placedSlots.includes(null)) {
        // DOĞRU! All letters are in the correct place!
        isQuestionAnswered = true;
        launchConfetti();
        playAudioFeedback('correct');

        groupScores[currentGroupIndex] += 10;
        updateScoreBoard();

        skipWordBtn.classList.add('hidden');
        showFeedback(t('scrambleCorrect', currentQuestionWord), "success");

        nextTurnBtn.textContent = t('nextTurnBtn');
        nextTurnBtn.classList.remove('hidden');
    } else {
        // YANLIŞ / EKSİK!
        wrongAttempts++;
        playAudioFeedback('wrong');

        if (anyWrong) {
            showFeedback("❌ Green letters are in the right place! Red letters are wrong, click to replace them.", "danger");
        } else {
            showFeedback("Keep going! Fill all slots to complete the word.", "info");
        }

        if (wrongAttempts >= 2) {
            const revealBtn = document.getElementById('scramble-reveal-btn');
            if (revealBtn) revealBtn.classList.remove('hidden');
        }
    }
}

function initScrambleControls() {
    if (scrambleBackspaceBtn) scrambleBackspaceBtn.addEventListener('click', handleScrambleBackspace);
    if (scrambleClearBtn) scrambleClearBtn.addEventListener('click', handleScrambleClear);
    if (scrambleHintBtn) scrambleHintBtn.addEventListener('click', handleScrambleHint);
    if (scrambleCheckBtn) scrambleCheckBtn.addEventListener('click', checkScrambleAnswer);
    if (scrambleRevealBtn) scrambleRevealBtn.addEventListener('click', revealScrambleAnswer);

    // Klavye Desteği (Yazarak oynayabilme)
    window.addEventListener('keydown', (e) => {
        if (!gamePage || gamePage.classList.contains('hidden')) return;
        if (!scrambleInteractiveArea || scrambleInteractiveArea.classList.contains('hidden')) return;
        if (isQuestionAnswered || isSpinning) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'Backspace') {
            e.preventDefault();
            handleScrambleBackspace();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            checkScrambleAnswer();
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            const pressedChar = e.key.toUpperCase();
            const availableTile = scrambleLetterPool.find(t => !t.used && t.letter === pressedChar);
            if (availableTile) {
                placeTile(availableTile);
            }
        }
    });
}

function showFeedback(htmlText, type) {
    feedbackMessage.innerHTML = htmlText;
    feedbackMessage.className = `feedback-message ${type}`;
    feedbackMessage.classList.remove('hidden');
}

// --- SIRADAKİ TURA GEÇİŞ ("çıkan kişiyi çarktan sil" ve "herkes 1 kere oynayacak") ---
function advanceToNextTurn() {
    // 1. Oynayan öğrenciyi işaretle
    if (selectedPlayer) {
        for (let g = 0; g < groups.length; g++) {
            const p = groups[g].find(item => item.name === selectedPlayer);
            if (p) {
                p.played = true;
                break;
            }
        }
        // 2. Çıkan kişiyi çarktan sil!
        allStudents = allStudents.filter(name => name !== selectedPlayer);
        turnsPlayed++;
    }

    selectedPlayer = null;
    isQuestionAnswered = false;

    // Çarkı kalan öğrencilerle yeniden çiz ve listeyi güncelle
    drawWheel();
    updateRemainingBadge();
    displayGroups();

    // 3. Herkes oynadıysa oyunu bitir!
    if (allStudents.length === 0 || turnsPlayed >= totalStudentsCount) {
        endGame();
        return;
    }

    // Henüz oynamamış öğrencisi olan sıradaki takıma geç
    let attempts = 0;
    do {
        currentGroupIndex = (currentGroupIndex + 1) % 4;
        attempts++;
    } while (groups[currentGroupIndex].filter(p => !p.played).length === 0 && attempts < 8);

    currentRound = Math.floor(turnsPlayed / 4);

    updateScoreBoard();
    resetQuestionAreaForSpin();
}

function resetQuestionAreaForSpin() {
    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    if (questionScrambleBox) questionScrambleBox.classList.add('hidden');
    if (scrambleInteractiveArea) scrambleInteractiveArea.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');

    spinBtn.disabled = false;
    spinBtn.textContent = t('spinBtn');

    if (questionUnitBadge) {
        questionUnitBadge.classList.add('hidden');
    }

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
            ${t('gameOverTitle')}<br>${t('gameOverWinner', winners)}<br>
            <span style="font-size: 1.05rem; color:#4A5568; display:block; margin-top:8px;">${t('allStudentsPlayedDesc')}</span>
        </div>
    `;
    questionPlaceholder.classList.remove('hidden');
    questionImageBox.classList.add('hidden');
    choicesContainer.classList.add('hidden');
    if (questionScrambleBox) questionScrambleBox.classList.add('hidden');
    if (scrambleInteractiveArea) scrambleInteractiveArea.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    nextTurnBtn.classList.add('hidden');
    skipWordBtn.classList.add('hidden');
    if (questionUnitBadge) {
        questionUnitBadge.classList.add('hidden');
    }

    drawWheel();
    launchConfetti();
    setTimeout(launchConfetti, 1000);
}

// ==========================================
// ÖZEL KELİME MODALI (KELİME EKLE & YÖNET)
// ==========================================
function initCustomWordsModal() {
    const modal = document.getElementById('custom-words-modal');
    const openBtn = document.getElementById('open-custom-words-btn');
    const sidebarAddBtn = document.getElementById('sidebar-add-word-btn');
    const closeBtn = document.getElementById('close-custom-modal');
    const closeDoneBtn = document.getElementById('close-modal-done-btn');
    const backdrop = document.getElementById('modal-backdrop');

    const form = document.getElementById('add-word-form');
    const wordInput = document.getElementById('custom-word-input');
    const meaningInput = document.getElementById('custom-meaning-input');

    const toggleBulkBtn = document.getElementById('toggle-bulk-add');
    const bulkContainer = document.getElementById('bulk-add-container');
    const bulkInput = document.getElementById('bulk-words-input');
    const saveBulkBtn = document.getElementById('save-bulk-words-btn');

    const clearAllBtn = document.getElementById('clear-all-custom-btn');

    function openModal() {
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderCustomWordsList();
        if (wordInput) wordInput.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        onUnitsSelectionChanged();
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (sidebarAddBtn) sidebarAddBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeDoneBtn) closeDoneBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (toggleBulkBtn && bulkContainer) {
        toggleBulkBtn.addEventListener('click', () => {
            bulkContainer.classList.toggle('hidden');
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const w = wordInput.value.trim();
            const tr = meaningInput ? meaningInput.value.trim() : '';
            if (!w) return;

            const existing = getCustomWords();
            existing.push({ word: w, tr: tr });
            saveCustomWords(existing);

            wordInput.value = '';
            if (meaningInput) meaningInput.value = '';

            if (!selectedUnitIds.includes(5)) {
                selectedUnitIds.push(5);
            }

            renderCustomWordsList();
            renderUnitsUI();
            rebuildActiveWords(true);
        });
    }

    if (saveBulkBtn && bulkInput) {
        saveBulkBtn.addEventListener('click', () => {
            const raw = bulkInput.value.trim();
            if (!raw) return;
            const words = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
            if (words.length === 0) return;

            const existing = getCustomWords();
            words.forEach(w => {
                existing.push({ word: w, tr: '' });
            });
            saveCustomWords(existing);
            bulkInput.value = '';
            bulkContainer.classList.add('hidden');

            if (!selectedUnitIds.includes(5)) {
                selectedUnitIds.push(5);
            }

            renderCustomWordsList();
            renderUnitsUI();
            rebuildActiveWords(true);
        });
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete all custom words?")) {
                saveCustomWords([]);
                selectedUnitIds = selectedUnitIds.filter(id => id !== 5);
                renderCustomWordsList();
                renderUnitsUI();
                rebuildActiveWords(true);
            }
        });
    }

    renderCustomWordsList();
}

function renderCustomWordsList() {
    const listContainer = document.getElementById('custom-words-list');
    const countEl = document.getElementById('custom-words-count');
    const clearAllBtn = document.getElementById('clear-all-custom-btn');
    if (!listContainer) return;

    const words = getCustomWords();
    if (countEl) countEl.textContent = `${words.length}`;
    if (clearAllBtn) clearAllBtn.classList.toggle('hidden', words.length === 0);

    if (words.length === 0) {
        listContainer.innerHTML = `<div class="empty-custom-words" id="empty-custom-words">No custom words yet. Add some using the form above!</div>`;
        return;
    }

    listContainer.innerHTML = '';
    words.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'custom-word-item';
        row.innerHTML = `
            <div class="custom-word-left">
                <span class="custom-word-bullet">🔤</span>
                <div>
                    <span class="custom-word-name">${item.word}</span>
                    ${(item.clue || item.tr) ? `<span class="custom-word-meaning"> (${item.clue || item.tr})</span>` : ''}
                </div>
            </div>
            <button type="button" class="custom-word-delete-btn" title="Delete">🗑️</button>
        `;

        row.querySelector('.custom-word-delete-btn').addEventListener('click', () => {
            const current = getCustomWords();
            current.splice(index, 1);
            saveCustomWords(current);
            if (current.length === 0) {
                selectedUnitIds = selectedUnitIds.filter(id => id !== 5);
            }
            renderCustomWordsList();
            renderUnitsUI();
            rebuildActiveWords(true);
        });

        listContainer.appendChild(row);
    });
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
    initUnitsSystem();
    setLanguage(savedLang);
});