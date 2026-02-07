document.addEventListener('DOMContentLoaded', () => {
    // --- Değişkenler ---
    let currentGrade = 1;
    let currentDifficulty = 'easy';
    let currentScore = 0;
    let correctAnswer = null;
    let gameMode = 'normal'; // 'normal', 'eval', 'multiplication_quiz'

    const students = [
        "Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray",
        "Ertuğrul", "Ömer", "Mehmet", "Ela", "Feraye", "Pelin", "Seray", "Defne", "Naz",
        "Derin", "Deniz", "Gülnihal", "İman"
    ];

    // --- Element Seçicileri ---
    const screens = {
        start: document.getElementById('start-screen'),
        difficulty: document.getElementById('difficulty-screen'),
        game: document.getElementById('game-screen'),
        multiplication: document.getElementById('multiplication-screen')
    };

    const gradeBtns = document.querySelectorAll('.grade-btn');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const backBtn = document.getElementById('back-to-grade');

    // Oyun Alanı Elementleri
    const questionText = document.getElementById('question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level-display');

    // Öğrenci Alanı
    const studentDisplay = document.getElementById('current-student');
    const randomStudentBtn = document.getElementById('random-student-btn');

    // Canvas Elementleri
    const canvasContainer = document.getElementById('canvas-container');
    const toggleCanvasBtn = document.getElementById('toggle-canvas-btn');
    const closeCanvasBtn = document.getElementById('close-canvas');
    const clearCanvasBtn = document.getElementById('clear-canvas');
    const canvas = document.getElementById('drawing-board');
    const ctx = canvas.getContext('2d');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const eraserBtn = document.getElementById('eraser-btn');
    const evalModeBtn = document.getElementById('eval-mode-btn');

    // Çarpım Tablosu Elementleri
    const multiplicationBtn = document.getElementById('multiplication-btn');
    const multiplicationGrid = document.getElementById('multiplication-grid');
    const checkMultiplicationBtn = document.getElementById('check-multiplication-btn');
    const backFromMultiplicationBtn = document.getElementById('back-from-multiplication');
    const mixedMultiplicationBtn = document.getElementById('mixed-multiplication-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');

    // --- Olay Dinleyicileri (Event Listeners) ---

    // Değerlendirme Modu
    evalModeBtn.addEventListener('click', () => {
        alert("Haftalık Değerlendirme Modu Başlatılıyor! (Zor Seviye)");
        gameMode = 'eval';
        currentGrade = 4;
        currentDifficulty = 'hard';
        startGame();
    });

    // Karışık Çarpım Testi
    mixedMultiplicationBtn.addEventListener('click', () => {
        gameMode = 'multiplication_quiz';
        startGame();
    });

    // Sınıf Seçimi
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentGrade = parseInt(btn.dataset.grade);
            gameMode = 'normal';
            showScreen('difficulty');
        });
    });

    // Zorluk Seçimi
    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentDifficulty = btn.dataset.diff;
            startGame();
        });
    });

    // Geri Dön
    backBtn.addEventListener('click', () => showScreen('start'));
    backFromMultiplicationBtn.addEventListener('click', () => showScreen('start'));
    backToMenuBtn.addEventListener('click', () => showScreen('start'));

    // Çarpım Tablosu Aç
    multiplicationBtn.addEventListener('click', () => {
        showScreen('multiplication');
        generateMultiplicationTable();
    });

    // Çarpım Tablosu Kontrol Et
    checkMultiplicationBtn.addEventListener('click', checkMultiplicationTable);

    // Cevap Butonları
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => checkAnswer(e.target));
    });

    // Öğrenci Seçimi
    randomStudentBtn.addEventListener('click', selectRandomStudent);

    // Canvas Aç/Kapa
    toggleCanvasBtn.addEventListener('click', () => {
        canvasContainer.classList.remove('hidden');
        resizeCanvas();
    });

    closeCanvasBtn.addEventListener('click', () => {
        canvasContainer.classList.add('hidden');
    });

    clearCanvasBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Silgi
    eraserBtn.addEventListener('click', () => {
        currentColor = '#ffffff'; // Arka planla aynı renk
        colorSwatches.forEach(s => s.classList.remove('active'));
        eraserBtn.classList.add('active'); // Görsel feedback eklenebilir
    });

    // Canvas Renk Seçimi
    let currentColor = '#000000';
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            currentColor = e.target.dataset.color;
            colorSwatches.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Canvas Çizim Mantığı
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // --- Touch Events ---
    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        const pos = getTouchPos(canvas, e);
        [lastX, lastY] = [pos.x, pos.y];
        e.preventDefault(); // Prevent scrolling
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        const pos = getTouchPos(canvas, e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [pos.x, pos.y];
        e.preventDefault(); // Prevent scrolling
    });

    canvas.addEventListener('touchend', (e) => {
        isDrawing = false;
        e.preventDefault();
    });

    function getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.8;
    }

    // --- Fonksiyonlar ---

    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active', 'hidden'));
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
        screens[screenName].classList.add('active');
    }

    function startGame() {
        currentScore = 0;
        scoreDisplay.textContent = currentScore;
        levelDisplay.textContent = getDifficultyLabel(currentDifficulty);
        showScreen('game');
        generateQuestion();
    }

    function getDifficultyLabel(diff) {
        if (gameMode === 'multiplication_quiz') return 'Çarpım Tablosu';
        const labels = { 'easy': 'Kolay', 'medium': 'Orta', 'hard': 'Zor' };
        return labels[diff] || diff;
    }

    function generateQuestion() {
        // Temizle
        optionBtns.forEach(btn => {
            btn.className = 'option-btn';
            btn.disabled = false;
        });

        // Mod Kontrolü
        if (gameMode === 'multiplication_quiz') {
            generateMultiplicationQuestion();
            return;
        }

        // Zorluk ve Sınıfa göre sayı aralıkları
        let maxNumber = 10;
        let operators = ['+'];

        // Basit Mantık (Geliştirilebilir)
        if (currentGrade >= 2) { maxNumber = 20; operators.push('-'); operators.push('*'); }
        if (currentGrade >= 3) { maxNumber = 50; operators.push('/'); }
        if (currentGrade >= 4) { maxNumber = 100; }
        if (currentGrade >= 5) { maxNumber = 500; }

        if (currentDifficulty === 'medium') maxNumber *= 2;
        if (currentDifficulty === 'hard') maxNumber *= 5;

        // Rastgele işlem seç
        const operator = operators[Math.floor(Math.random() * operators.length)];
        let num1 = Math.floor(Math.random() * maxNumber) + 1;
        let num2 = Math.floor(Math.random() * maxNumber) + 1;

        // Bölme işlemi için tam bölünebilen sayılar ayarla
        if (operator === '/') {
            num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        }

        // Çıkarma işlemi için negatif sonuç engelleme (istenen özellik olabilir ama şimdilik pozitif tutalım)
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        let questionString = `${num1} ${convertOperator(operator)} ${num2}`;
        correctAnswer = eval(`${num1} ${operator} ${num2}`);

        // Soruyu yazdır
        questionText.textContent = `${questionString} = ?`;

        // Şıkları oluştur
        let answers = [correctAnswer];
        while (answers.length < 4) {
            let offset = Math.floor(Math.random() * 10) + 1;
            let wrongAnswer = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
            if (!answers.includes(wrongAnswer) && wrongAnswer >= 0) {
                answers.push(wrongAnswer);
            }
        }

        // Şıkları karıştır
        answers.sort(() => Math.random() - 0.5);

        // Butonlara ata
        optionBtns.forEach((btn, index) => {
            btn.textContent = answers[index];
            // Doğru cevap bilgisini butona gizlemiyoruz, global değişkenden kontrol edeceğiz
        });
    }

    function generateMultiplicationQuestion() {
        // Sadece 1-10 arası çarpım
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;

        // Soru ve Cevap
        let questionString = `${num1} x ${num2}`;
        correctAnswer = num1 * num2;

        questionText.textContent = `${questionString} = ?`;

        // Şıkları oluştur
        let answers = [correctAnswer];
        while (answers.length < 4) {
            let offset = Math.floor(Math.random() * 5) + 1; // Daha yakın şıklar
            let wrongAnswer = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
            if (!answers.includes(wrongAnswer) && wrongAnswer >= 0) {
                answers.push(wrongAnswer);
            }
        }

        // Şıkları karıştır
        answers.sort(() => Math.random() - 0.5);

        // Butonlara ata
        optionBtns.forEach((btn, index) => {
            btn.textContent = answers[index];
        });
    }

    function convertOperator(op) {
        if (op === '*') return 'x';
        if (op === '/') return '÷';
        return op;
    }

    function checkAnswer(btn) {
        const selectedValue = parseInt(btn.textContent);

        if (selectedValue === correctAnswer) {
            btn.classList.add('correct');
            currentScore += 10;
            scoreDisplay.textContent = currentScore;
            triggerConfetti();
            setTimeout(generateQuestion, 1500); // 1.5 sn sonra yeni soru
        } else {
            btn.classList.add('wrong');
            // Doğru olanı göster
            optionBtns.forEach(b => {
                if (parseInt(b.textContent) === correctAnswer) {
                    b.classList.add('correct');
                }
            });
            setTimeout(generateQuestion, 2000); // 2 sn bekle
        }

        // Tüm butonları devre dışı bırak
        optionBtns.forEach(b => b.disabled = true);
    }

    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    function selectRandomStudent() {
        const randomIndex = Math.floor(Math.random() * students.length);
        const name = students[randomIndex];
        studentDisplay.textContent = name;
        studentDisplay.classList.add('shake');
        setTimeout(() => studentDisplay.classList.remove('shake'), 500);
    }

    function generateMultiplicationTable() {
        multiplicationGrid.innerHTML = '';

        // Header Row (0-10)
        multiplicationGrid.appendChild(createCell('x', 'mt-header'));
        for (let i = 1; i <= 10; i++) {
            multiplicationGrid.appendChild(createCell(i, 'mt-header'));
        }

        // Rows
        for (let r = 1; r <= 10; r++) {
            // Row Header
            multiplicationGrid.appendChild(createCell(r, 'mt-header'));

            for (let c = 1; c <= 10; c++) {
                const updatedResult = c * r;
                const isHidden = Math.random() < 0.3; // %30 şansla boş olsun

                if (isHidden) {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.classList.add('mt-input');
                    input.dataset.correct = updatedResult;
                    const cell = document.createElement('div');
                    cell.classList.add('mt-cell');
                    cell.appendChild(input);
                    multiplicationGrid.appendChild(cell);
                } else {
                    multiplicationGrid.appendChild(createCell(updatedResult, 'mt-cell'));
                }
            }
        }
    }

    function createCell(content, className) {
        const div = document.createElement('div');
        div.classList.add('mt-cell', className);
        div.textContent = content;
        return div;
    }

    function checkMultiplicationTable() {
        const inputs = document.querySelectorAll('.mt-input');
        let allCorrect = true;

        inputs.forEach(input => {
            const val = parseInt(input.value);
            const correct = parseInt(input.dataset.correct);

            if (val === correct) {
                input.classList.add('correct');
                input.classList.remove('wrong');
            } else {
                input.classList.add('wrong');
                input.classList.remove('correct');
                allCorrect = false;
            }
        });

        if (allCorrect) {
            triggerConfetti();
        }
    }


});
