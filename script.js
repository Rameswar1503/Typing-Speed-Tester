const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes perfect",
  "Typing is a useful skill",
  "Code is like humor",
  "First, solve the problem"
];

let quote = "";
let timer;
let duration = 60;
let timeLeft;
let started = false;

function startTest() {
  const input = document.getElementById("input");
  const quoteDisplay = document.getElementById("quote");
  const timerDisplay = document.getElementById("timer");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  const timeSelect = document.getElementById("time-limit");

  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = quote;
  input.value = "";
  input.disabled = false;
  input.focus();
  duration = parseInt(timeSelect.value);
  timeLeft = duration;
  timerDisplay.textContent = timeLeft;
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";
  started = true;

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    const wordsTyped = input.value.trim().split(/\s+/).length;
    const timeSpent = duration - timeLeft;
    const wpm = Math.floor((wordsTyped / timeSpent) * 60) || 0;
    wpmDisplay.textContent = wpm;

    if (timeLeft <= 0) {
      clearInterval(timer);
      input.disabled = true;
      calculateAccuracy();
    }
  }, 1000);
}

function calculateAccuracy() {
  const inputText = document.getElementById("input").value.trim();
  const originalText = quote.trim();

  let correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === originalText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.floor((correctChars / originalText.length) * 100) || 0;
  document.getElementById("accuracy").textContent = accuracy;
}
