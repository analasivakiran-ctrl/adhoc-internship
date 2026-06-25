// ---------------------
// DIGITAL CLOCK
// ---------------------

function updateClock() {
    const now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;
}

// Update every second
setInterval(updateClock, 1000);
updateClock();


// ---------------------
// TIMER
// ---------------------

let timerSeconds = 0;
let timerInterval = null;

function updateTimerDisplay() {
    let hours = Math.floor(timerSeconds / 3600);
    let minutes = Math.floor((timerSeconds % 3600) / 60);
    let seconds = timerSeconds % 60;

    document.getElementById("timer").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}

// Start Timer
document.getElementById("startBtn").addEventListener("click", () => {

    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);

});

// Pause Timer
document.getElementById("pauseBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset Timer
document.getElementById("resetBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    updateTimerDisplay();
});

updateTimerDisplay();