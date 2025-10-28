const texts = [
    "The art of programming is the art of organizing complexity. Good code is its own best documentation. When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous.",
   "Design is not just what it looks like and feels like. Design is how it works. The best way to find out if you can trust somebody is to trust them. Innovation distinguishes between a leader and a follower.",
   "The only way to do great work is to love what you do. Stay hungry, stay foolish. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
   "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
   "Simplicity is the ultimate sophistication. It takes a lot of hard work to make something simple, to truly understand the underlying challenges and come up with elegant solutions.",
   "The future belongs to those who believe in the beauty of their dreams. Success is not final, failure is not fatal, it is the courage to continue that counts."
];

let currentText = '';
let currentIndex = 0;
let startTime = null;
let timeleft = 60;
let timer = null;
let isActive = false;
let erros = 0;
let totalchars = 0;

const textContent = document.getElementById('textCotent');
const typingInput = document.getElementById('typingInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const charactersElement = document.getElementById('characters');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const timerElement = document.getElementById('timer');
const tryAgainBtn = document.getElementById('tryAgainBtn');

function loadNewText(){
    currentText = texts[Math.floor(Math.random() * texts.length)];
    displayText();

}

function displayText(){
    textContent.innerHTML = currentText.split('').map((char, index) => `<span class="char pending" data-index="${index}">${char}</span>`).join('');
}

function startTest(){
    isActive = true;
    startTime = Date.now();
    typingInput.disabled = false;
    typingInput.placeholder = "start typing...";
    typingInput.focus();
    startBtn.style.display = 'none';
    progressText.textContent = 'Test in progress...';
    startTimer();
}

function startTimer(){
    timer = setInterval(()=>{
        timeleft--;
        timerElement.querySelector('span').textContent = timeleft;
        if(timeleft <= 0)
    })
}
function fine(){
    console.log
}