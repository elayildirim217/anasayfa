const CORRECT_PASSWORD = "1903";
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 60 * 1000; // 1 minute in milliseconds

let currentInput = "";
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
    checkLockoutStatus();

    const lockBtn = document.getElementById('lockBtn');
    const reLockBtn = document.getElementById('reLockBtn'); // New button
    const modal = document.getElementById('passwordModal');
    const closeBtn = document.querySelector('.close-modal');
    const display = document.getElementById('calcDisplay');

    // Open Modal
    lockBtn.addEventListener('click', () => {
        if (isLockedOut()) {
            alert(`Çok fazla deneme yaptın! Lütfen ${getRemainingTime()} saniye bekle.`);
            return;
        }
        modal.style.display = 'flex';
        currentInput = "";
        updateDisplay();
    });

    // Re-Lock Section
    if (reLockBtn) {
        reLockBtn.addEventListener('click', () => {
            document.querySelector('.hidden-content').classList.remove('unlocked');
            document.querySelector('.hidden-content').style.display = 'none';
            document.querySelector('.locked-overlay').style.display = 'flex';
            currentInput = "";
        });
    }

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Outside click close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Calculator Buttons
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.dataset.value;
            const action = btn.dataset.action;

            if (val) {
                if (currentInput.length < 4) {
                    currentInput += val;
                    updateDisplay();
                }
            } else if (action === 'delete') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            } else if (action === 'submit') {
                checkPassword();
            }
        });
    });

    function updateDisplay() {
        // Show stars instead of numbers
        display.textContent = "*".repeat(currentInput.length);
    }

    function checkPassword() {
        if (currentInput === CORRECT_PASSWORD) {
            unlockSpecialSection();
            modal.style.display = 'none';
            // Reset attempts on success
            attempts = 0;
            localStorage.setItem('attempts', 0);
        } else {
            handleFailedAttempt();
        }
    }

    function handleFailedAttempt() {
        attempts++;
        localStorage.setItem('attempts', attempts);

        const calculator = document.querySelector('.calculator');
        calculator.classList.add('shake');
        setTimeout(() => calculator.classList.remove('shake'), 500);

        currentInput = "";
        updateDisplay();

        if (attempts >= MAX_ATTEMPTS) {
            const lockUntil = Date.now() + LOCKOUT_DURATION;
            localStorage.setItem('lockUntil', lockUntil);
            modal.style.display = 'none';
            alert("Yanlış şifre! 1 dakika boyunca kilitlendi.");
            updateLockMessage();
        }
    }

    function unlockSpecialSection() {
        document.querySelector('.locked-overlay').style.display = 'none';
        document.querySelector('.hidden-content').classList.add('unlocked');
        document.querySelector('.hidden-content').style.display = 'block'; // Block to see button and grid
    }

    function isLockedOut() {
        const lockUntil = localStorage.getItem('lockUntil');
        if (lockUntil && Date.now() < parseInt(lockUntil)) {
            return true;
        }
        return false;
    }

    function getRemainingTime() {
        const lockUntil = localStorage.getItem('lockUntil');
        if (!lockUntil) return 0;
        return Math.ceil((parseInt(lockUntil) - Date.now()) / 1000);
    }

    function checkLockoutStatus() {
        // Restore attempts from storage
        const storedAttempts = localStorage.getItem('attempts');
        if (storedAttempts) attempts = parseInt(storedAttempts);

        // Check if lock duration passed, if so reset attempts
        const lockUntil = localStorage.getItem('lockUntil');
        if (lockUntil && Date.now() > parseInt(lockUntil)) {
            localStorage.removeItem('lockUntil');
            localStorage.setItem('attempts', 0);
            attempts = 0;
        }

        updateLockMessage();
    }

    function updateLockMessage() {
        const messageEl = document.getElementById('lockMessage');
        if (isLockedOut()) {
            messageEl.textContent = "KİLİTLİ (1 Dakika bekle)";
        } else {
            messageEl.textContent = "Kilidi Açmak İçin Tıkla";
        }
    }

    // Periodically update lock status if locked
    setInterval(() => {
        if (isLockedOut()) {
            checkLockoutStatus();
        }
    }, 1000);
});
