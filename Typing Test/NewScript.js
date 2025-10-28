
// Sample texts for typing test
const texts = [
   "The art of programming is the art of organizing complexity. Good code is its own best documentation. When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous.",
   "Design is not just what it looks like and feels like. Design is how it works. The best way to find out if you can trust somebody is to trust them. Innovation distinguishes between a leader and a follower.",
   "The only way to do great work is to love what you do. Stay hungry, stay foolish. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
   "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
   "Simplicity is the ultimate sophistication. It takes a lot of hard work to make something simple, to truly understand the underlying challenges and come up with elegant solutions.",
   "The future belongs to those who believe in the beauty of their dreams. Success is not final, failure is not fatal, it is the courage to continue that counts."
];

// Global variables
let currentText = '';
let currentIndex = 0;
let startTime = null;
let timeLeft = 60;
let timer = null;
let isActive = false;
let errors = 0;
let totalChars = 0;

// DOM elements
const textContent = document.getElementById('textContent');
const typingInput = document.getElementById('typingInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const charactersElement = document.getElementById('characters');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const timerElement = document.getElementById('timer');
const resultsModal = document.getElementById('resultsModal');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// Load a random text for typing
function loadNewText() {
   currentText = texts[Math.floor(Math.random() * texts.length)];
   displayText();
}

// Display text with spans for each character
function displayText() {
   textContent.innerHTML = currentText
       .split('')
       .map((char, index) => 
           `<span class="char pending" data-index="${index}">${char}</span>`
       )
       .join('');
}

// Start the typing test
function startTest() {
   isActive = true;
   startTime = Date.now();
   typingInput.disabled = false;
   typingInput.placeholder = "Start typing...";
   typingInput.focus();
   startBtn.style.display = 'none';
   progressText.textContent = 'Test in progress...';
   startTimer();
}

// Start the countdown timer
function startTimer() {
   timer = setInterval(() => {
       timeLeft--;
       timerElement.querySelector('span').textContent = timeLeft;
       
       if (timeLeft <= 0) {
           endTest();
       }
   }, 1000);
}

// Handle typing input
function handleInput(e) {
   if (!isActive) return;
   
   const inputValue = e.target.value;
   currentIndex = inputValue.length;
   
   updateDisplay(inputValue);
   updateStats();
   updateProgress();
   
   if (currentIndex >= currentText.length) {
       endTest();
   }
}

// Update character display with correct/incorrect/current styling
function updateDisplay(inputValue) {
   const chars = document.querySelectorAll('.char');
   errors = 0;
   totalChars = currentIndex;
   
   chars.forEach((char, index) => {
       char.className = 'char';
       
       if (index < inputValue.length) {
           if (inputValue[index] === currentText[index]) {
               char.classList.add('correct');
           } else {
               char.classList.add('incorrect');
               errors++;
           }
       } else if (index === inputValue.length && index < currentText.length) {
           char.classList.add('current');
       } else {
           char.classList.add('pending');
       }
   });
}

// Update typing statistics
function updateStats() {
   const timeElapsed = (Date.now() - startTime) / 1000 / 60;
   const grossWPM = (currentIndex / 5) / timeElapsed;
   const netWPM = Math.max(0, Math.round(grossWPM - (errors / timeElapsed)));
   const accuracy = totalChars > 0 ? Math.round(((totalChars - errors) / totalChars) * 100) : 100;
   
   wpmElement.textContent = isFinite(netWPM) ? netWPM : 0;
   accuracyElement.textContent = accuracy;
   charactersElement.textContent = totalChars;
}

// Update progress bar
function updateProgress() {
   const progress = (currentIndex / currentText.length) * 100;
   progressFill.style.width = `${Math.min(progress, 100)}%`;
   
   if (progress >= 100) {
       progressText.textContent = 'Complete!';
   } else {
       progressText.textContent = `${Math.round(progress)}% complete`;
   }
}

// End the typing test
function endTest() {
   isActive = false;
   typingInput.disabled = true;
   clearInterval(timer);
   
   // Final stats update
   updateStats();
   
   // Show results modal
   showResults();
}

// Show results modal with final stats
function showResults() {
   const finalWpm = wpmElement.textContent;
   const finalAccuracy = accuracyElement.textContent;
   const finalCharacters = charactersElement.textContent;
   
   document.getElementById('finalWpm').textContent = finalWpm;
   document.getElementById('finalAccuracy').textContent = finalAccuracy;
   document.getElementById('finalCharacters').textContent = finalCharacters;
   
   resultsModal.classList.add('show');
}

// Reset the typing test
function resetTest() {
   isActive = false;
   currentIndex = 0;
   errors = 0;
   totalChars = 0;
   timeLeft = 60;
   startTime = null;
   
   clearInterval(timer);
   
   typingInput.value = '';
   typingInput.disabled = true;
   typingInput.placeholder = "Click start to begin typing...";
   startBtn.style.display = 'inline-flex';
   timerElement.querySelector('span').textContent = '60';
   progressText.textContent = 'Ready to start';
   
   wpmElement.textContent = '0';
   accuracyElement.textContent = '100';
   charactersElement.textContent = '0';
   progressFill.style.width = '0%';
   
   loadNewText();
   resultsModal.classList.remove('show');
}

// Close results modal and reset
function closeResults() {
   resultsModal.classList.remove('show');
   resetTest();
}

// Event listeners
startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
typingInput.addEventListener('input', handleInput);
typingInput.addEventListener('paste', (e) => e.preventDefault());
tryAgainBtn.addEventListener('click', closeResults);

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
   loadNewText();
});
