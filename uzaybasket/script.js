const students = [
    "Arel", "Eren", "Mahir", "Çınar", "Ege", "Arda", "Mustafa", "Yiğit", "Ali", "Giray",
    "Ertuğrul", "Ömer", "Mehmet", "Ela", "Feraye", "Pelin", "Seray", "Defne", "Naz",
    "Derin", "Deniz", "Gülnihal", "İman"
];

let remainingStudents = [...students];
let currentPlayer = "";

// Placeholder questions - User will provide real images later
const questions = [
    { text: "Bu bir bilgisayar mı?", image: "uzaybasket/Resimlerim/bilgisayar.png" },
    { text: "Bu bir drone mu?", image: "uzaybasket/Resimlerim/drone.png" },
    { text: "Bu bir fare mi?", image: "uzaybasket/Resimlerim/fare.png" },
    { text: "Bu bir hoparlör mi?", image: "uzaybasket/Resimlerim/hoparlor.png" },
    { text: "Bu bir kamera mı?", image: "uzaybasket/Resimlerim/kamera.png" },
    { text: "Bu bir kasa mı?", image: "uzaybasket/Resimlerim/kasa.png" },
    { text: "Bu bir kettle mı?", image: "uzaybasket/Resimlerim/kettle.png" },
    { text: "Bu bir klavye mi?", image: "uzaybasket/Resimlerim/klavye.png" },
    { text: "Bu bir kulaklık mı?", image: "uzaybasket/Resimlerim/kulaklik.png" },
    { text: "Bu bir mikrofon mı?", image: "uzaybasket/Resimlerim/mikrofon.png" },
    { text: "Bu bir monitör mü?", image: "uzaybasket/Resimlerim/monitor.png" },
    { text: "Bu bir powerbank mi?", image: "uzaybasket/Resimlerim/powerbank.png" },
    { text: "Bu bir yazıcı mı?", image: "uzaybasket/Resimlerim/printer.png" },
    { text: "Bu bir radyo mu?", image: "uzaybasket/Resimlerim/radyo.png" },
    { text: "Bu bir robot mu?", image: "uzaybasket/Resimlerim/robot.png" },
    { text: "Bu bir saat mi?", image: "uzaybasket/Resimlerim/saat.png" },
    { text: "Bu bir sarj kablosu mu?", image: "uzaybasket/Resimlerim/sarj.png" },
    { text: "Bu bir tablet mi?", image: "uzaybasket/Resimlerim/tablet.png" },
    { text: "Bu bir telefon mu?", image: "uzaybasket/Resimlerim/telefon.png" },
    { text: "Bu bir temizlik robotu mu?", image: "uzaybasket/Resimlerim/trobot.png" },
    { text: "Bu bir TV mi?", image: "uzaybasket/Resimlerim/TV.png" },
    { text: "Bu bir wifi mi?", image: "uzaybasket/Resimlerim/wifi.png" }

];

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const selectionScreen = document.getElementById('selection-screen');
const animationScreen = document.getElementById('animation-screen');
const questionScreen = document.getElementById('question-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const startBtn = document.getElementById('start-btn');
const playerNameDisplay = document.getElementById('player-name-display');
const throwBasketBtn = document.getElementById('throw-basket-btn');
const basketball = document.getElementById('ball');
const hoopTarget = document.getElementById('hoop-target'); // Use target area
const shotResult = document.getElementById('shot-result');
const currentPlayerNameSpan = document.getElementById('current-player-name');
const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const correctBtn = document.getElementById('correct-btn');
const wrongBtn = document.getElementById('wrong-btn');
const restartBtn = document.getElementById('restart-btn');

// Ball Movement Variables
let ballX = 50;
let ballY = 50;
let vx = 0;
let vy = 0;
let isDragging = false;
let isBallMoving = false;
let dragStartX = 0;
let dragStartY = 0;
const gravity = 0.8;
const friction = 0.99; // Air resistance
const powerScale = 0.2; // Power multiplier (Increased for easier shooting)

// Trajectory Elements
const trajectoryLine = document.getElementById('trajectory-line');

// Event Listeners
startBtn.addEventListener('click', startGame);
throwBasketBtn.addEventListener('click', prepareBasketAnimation);
correctBtn.addEventListener('click', () => handleAnswer(true));
wrongBtn.addEventListener('click', () => handleAnswer(false));
restartBtn.addEventListener('click', resetGame);

// Drag Events
basketball.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', endDrag);

// Touch Events
basketball.addEventListener('touchstart', (e) => startDrag(e.touches[0]));
document.addEventListener('touchmove', (e) => onDrag(e.touches[0]));
document.addEventListener('touchend', endDrag);

// Keyboard Shortcuts for Answers
document.addEventListener('keydown', (e) => {
    if (!questionScreen.classList.contains('active')) return;

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleAnswer(true); // Left for Correct (or A)
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleAnswer(false); // Right for Wrong (or D)
    }
});

function startGame() {
    showScreen(selectionScreen);
    selectRandomStudent();
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function selectRandomStudent() {
    if (remainingStudents.length === 0) {
        showScreen(gameOverScreen);
        return;
    }

    // Reset UI
    throwBasketBtn.classList.add('hidden');
    playerNameDisplay.textContent = "Seçiliyor...";

    // Simple shuffle animation effect
    let interval = setInterval(() => {
        const randomName = remainingStudents[Math.floor(Math.random() * remainingStudents.length)];
        playerNameDisplay.textContent = randomName;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * remainingStudents.length);
        currentPlayer = remainingStudents[randomIndex];
        remainingStudents.splice(randomIndex, 1); // Remove selected student

        playerNameDisplay.textContent = currentPlayer;
        throwBasketBtn.classList.remove('hidden');
    }, 2000);
}

const hoopMoveToggle = document.getElementById('hoop-move-toggle');
const hoopContainer = document.getElementById('hoop-container');

function prepareBasketAnimation() {
    showScreen(animationScreen);
    resetBallPosition();
    shotResult.style.opacity = '0';
    isBallMoving = false;
    vx = 0;
    vy = 0;

    // Handle Hoop Movement
    if (hoopMoveToggle.checked) {
        hoopContainer.style.animationPlayState = 'running';
        // Reset to default CSS values if needed, though animation overrides top
        hoopContainer.style.right = '50px';
    } else {
        hoopContainer.style.animationPlayState = 'paused';
        // Center vertically (approx 150px top) and move closer (increase right)
        hoopContainer.style.top = '150px';
        hoopContainer.style.right = '150px'; // Closer to center
    }
}

function resetBallPosition() {
    // Position ball at bottom left initially or wherever desired
    ballX = 100;
    ballY = 250; // Raised position
    updateBallPosition();
}

function updateBallPosition() {
    basketball.style.left = ballX + 'px';
    basketball.style.bottom = ballY + 'px';
    basketball.style.transform = 'none';
}

function startDrag(e) {
    if (!animationScreen.classList.contains('active') || isBallMoving) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    trajectoryLine.style.opacity = '1';
}

function onDrag(e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    // Calculate pull distance
    const dx = dragStartX - currentX;
    const dy = dragStartY - currentY; // Pulling down (positive dy) aims up

    // Visual feedback for trajectory
    drawTrajectory(dx, dy);
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    trajectoryLine.style.opacity = '0';

    // Apply velocity based on drag distance
    // We want pulling LEFT to shoot RIGHT, and pulling DOWN to shoot UP
    // dragStartX - currentX > 0 means we pulled left, so dx is positive.
    // We want positive vx.

    // Recalculate final dx, dy from the last known event isn't easy without tracking.
    // Instead, let's assume the last onDrag set the visual state, but we need the values.
    // Actually, it's better to track current mouse pos in a global or re-calculate here if we had the event.
    // Since we don't have the event in endDrag for mouseup usually (it's on window), 
    // let's rely on a stored "aim" vector or just use the last knowns if we tracked them.
    // Simplified: let's track the last calculated velocity in onDrag.

    // BETTER APPROACH: Calculate one last time if possible, or store "proposedVelocity" in onDrag.
    // Let's modify onDrag to store `proposedVx` and `proposedVy`.
}

// Helper to store proposed velocity
let proposedVx = 0;
let proposedVy = 0;

function drawTrajectory(dx, dy) {
    // Calculate start point relative to the SVG container
    // The ball is at ballX, ballY (bottom-left based).
    // SVG is top-left based.
    // We need to convert ball coordinates to SVG coordinates.
    const containerHeight = animationScreen.clientHeight;
    const startSvgX = ballX + 25; // Center of ball (approx 50px width)
    const startSvgY = containerHeight - ballY - 25;

    // Simulate physics for the line
    let simX = startSvgX;
    let simY = startSvgY;

    // Physics simulation variables (mirroring the real physics)
    // Note: In CSS 'bottom' increases up. In SVG 'y' increases down.
    // So +vy in game means UP. In SVG that means -y.

    proposedVx = dx * powerScale;
    proposedVy = dy * powerScale; // Pulling down (positive dy) -> Positive vy (Up)

    // Clamp power if needed
    const maxPower = 35;
    const currentPower = Math.sqrt(proposedVx * proposedVx + proposedVy * proposedVy);
    if (currentPower > maxPower) {
        const ratio = maxPower / currentPower;
        proposedVx *= ratio;
        proposedVy *= ratio;
    }

    let simVx = proposedVx;
    let simVy = proposedVy; // Positive means UP in game terms

    let pathData = `M ${startSvgX} ${startSvgY}`;

    // Simulate a few steps
    for (let i = 0; i < 15; i++) {
        simX += simVx;
        // In SVG, y increases down. 
        // If simVy is positive (UP), we subtract from simY.
        simY -= simVy;

        simVy -= gravity; // Gravity pulls down (reduces upward velocity)
        simVx *= friction;

        pathData += ` L ${simX} ${simY}`;
    }

    trajectoryLine.setAttribute('d', pathData);
}

// Redefine endDrag to use the stored proposed velocities
function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    trajectoryLine.style.opacity = '0';

    if (proposedVx === 0 && proposedVy === 0) return; // No drag happened

    vx = proposedVx;
    vy = proposedVy;
    isBallMoving = true;
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!isBallMoving) return;

    ballX += vx;
    ballY += vy;

    vy -= gravity; // Gravity reduces vertical velocity
    vx *= friction; // Air resistance

    // Bounce off floor
    if (ballY < 0) {
        ballY = 0;
        vy = -vy * 0.6; // Reduce bounce energy more (was 0.7)

        // Stop if bouncing is minimal
        if (Math.abs(vy) < 4) { // Increased threshold (was 2)
            vy = 0;
            // High friction on ground to stop rolling
            vx *= 0.8;
        }
    }

    // Bounce off walls
    if (ballX < 0) {
        ballX = 0;
        vx = -vx * 0.7;
    }
    if (ballX > window.innerWidth - 50) {
        ballX = window.innerWidth - 50;
        vx = -vx * 0.7;
    }

    // Stop completely if slow
    // Relaxed conditions: speed < 0.5 and ball is on ground
    if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5 && ballY <= 1) {
        isBallMoving = false;
        // Reset if missed
        if (shotResult.style.opacity !== '1') {
            handleMiss();
        }
    }

    updateBallPosition();
    checkCollision();

    if (isBallMoving) {
        requestAnimationFrame(gameLoop);
    }
}

function handleMiss() {
    // Show feedback
    shotResult.textContent = "Kaçtı!";
    shotResult.style.color = "red";
    shotResult.style.opacity = '1';

    setTimeout(() => {
        // Reset text for next time
        shotResult.textContent = "Basket!";
        shotResult.style.color = "#00ff00";
        shotResult.style.opacity = '0';

        // Go to next student
        showScreen(selectionScreen);
        selectRandomStudent();
    }, 1500);
}

function checkCollision() {
    const ballRect = basketball.getBoundingClientRect();
    const targetRect = hoopTarget.getBoundingClientRect();

    // Check if ball is inside the target area
    // We want the ball to be roughly "falling" into the hoop for a better feel, 
    // but simple intersection is fine for now.
    if (ballRect.left < targetRect.right &&
        ballRect.right > targetRect.left &&
        ballRect.top < targetRect.bottom &&
        ballRect.bottom > targetRect.top) {

        // Only count if falling downwards?
        if (vy < 0) {
            // Success!
            isBallMoving = false; // Stop movement
            shotResult.style.opacity = '1';

            // Visual snap to hoop
            // ballX = targetRect.left + (targetRect.width/2) - 25;
            // ballY = window.innerHeight - targetRect.bottom + (targetRect.height/2);
            // updateBallPosition();

            setTimeout(() => {
                showQuestion();
            }, 1500);
        }
    }
}

// Görsel dosyalarının tam listesi (Uzantıların .png veya .jpg olduğunu kontrol et!)
const imageFiles = [
    "bilgisayar.png", "drone.png", "fare.png", "hoparlor.png", "kamera.png",
    "kasa.png", "kettle.png", "klavye.png", "kulaklik.png", "mikrofon.png",
    "monitor.png", "powerbank.png", "printer.png", "radyo.png", "robot.png",
    "saat.png", "sarj.png", "tablet.png", "telefon.png", "trobot.png", "TV.png", "wifi.png"
];

// Soruda görünecek Türkçe isimler
const imageNames = [
    "Bilgisayar", "Drone", "Fare", "Hoparlör", "Kamera",
    "Kasa", "Kettle/Su Isıtıcısı", "Klavye", "Kulaklık", "Mikrofon",
    "Monitör/Ekran", "Powerbank", "Yazıcı", "Radyo", "Robot",
    "Akıllı Saat", "Şarj Aleti", "Tablet", "Telefon", "Temizlik Robotu", "Televizyon", "Wi-Fi"
];

function showQuestion() {
    showScreen(questionScreen);
    currentPlayerNameSpan.textContent = currentPlayer;

    // Roket animasyonunu başlat
    const shuttleContainer = document.getElementById('shuttle-container');
    shuttleContainer.classList.remove('fly-in');
    void shuttleContainer.offsetWidth;
    shuttleContainer.classList.add('fly-in');

    // --- MANTIĞI DÜZELTİYORUZ: %50 İHTİMALLE DOĞRU EŞLEŞME ---
    let randomImgIdx = Math.floor(Math.random() * imageFiles.length);
    let randomNameIdx;

    if (Math.random() > 0.5) {
        // %50 İhtimalle: Resim ve İsim AYNI olsun (Cevap Doğru çıkacak)
        randomNameIdx = randomImgIdx;
    } else {
        // %50 İhtimalle: Resim ve İsim FARKLI olsun (Cevap Yanlış çıkacak)
        do {
            randomNameIdx = Math.floor(Math.random() * imageNames.length);
        } while (randomNameIdx === randomImgIdx); // Aynı olmamasını garanti et
    }

    // Resim yolunu belirle (Resimlerim klasörü içindeyse yolu ekle)
    const selectedImg = imageFiles[randomImgIdx];
    questionImage.src = "uzaybasket/Resimlerim/" + selectedImg; // KLASÖR ADINA DİKKAT!

    // Soruyu yaz
    const selectedName = imageNames[randomNameIdx];
    questionText.textContent = "Bu bir " + selectedName;

    // Doğru cevabı sakla: Eğer indeksler aynıysa cevap "Evet" (True) olmalı
    questionScreen.dataset.correctAnswer = (randomImgIdx === randomNameIdx);
}

function handleAnswer(userSelectedTrue) {
    // Gerçek cevap neydi? (Dataset'ten alıp boolean'a çeviriyoruz)
    const actualAnswer = (questionScreen.dataset.correctAnswer === "true");

    // Mantık: Kullanıcı "Doğru" dedi ve resim-isim tutuyorsa BİLDİ.
    // Kullanıcı "Yanlış" dedi ve resim-isim tutmuyorsa yine BİLDİ.
    if (userSelectedTrue === actualAnswer) {
        // DOĞRU BİLDİ
        shotResult.textContent = "Tebrikler!";
        shotResult.style.color = "#00ff00";
        shotResult.style.opacity = '1';
        triggerConfetti(); // Konfeti burada çalışıyor
    } else {
        // YANLIŞ BİLDİ
        shotResult.textContent = "Yanlış Cevap!";
        shotResult.style.color = "red";
        shotResult.style.opacity = '1';
    }

    // 2 saniye sonra yeni oyuncuya geç
    setTimeout(() => {
        shotResult.style.opacity = '0';
        showScreen(selectionScreen);
        selectRandomStudent();
    }, 2000);
}

// Confetti Effect
function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    // Simple Confetti Implementation
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    (function frame() {
        // Create confetti particles
        // Since we can't easily add a canvas overlay without disrupting layout, 
        // let's create simple div elements
        for (let i = 0; i < 5; i++) {
            createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
        }

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function createConfettiParticle(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '1000';
    confetti.style.pointerEvents = 'none';

    // Random animation
    const duration = Math.random() * 2 + 1;
    confetti.style.transition = `top ${duration}s linear, transform ${duration}s ease-in-out`;

    document.body.appendChild(confetti);

    // Trigger animation
    setTimeout(() => {
        confetti.style.top = '110vh';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 10);

    // Cleanup
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}



function resetGame() {
    remainingStudents = [...students];
    startGame();
}
