import { kana } from './quizdata.js';

const cardDisplay = document.querySelector('#card-display');
const answerInput = document.querySelector('#answer-input');
answerInput.addEventListener('keydown', checkKey);
const statusText = document.querySelector('#status');

const startBtn = document.querySelector('#start-button');
startBtn.addEventListener('click', startQuiz);


let correctCounter = 0;
let incorrectCounter = 0;

let currentIndex = 0;
function startQuiz() {
    startBtn.style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    cardDisplay.innerText = kana[0].kana;
    answerInput.focus();
    document.querySelector('#correct').innerText = correctCounter + ' correct';
    document.querySelector('#incorrect').innerText = incorrectCounter + ' incorrect';
}

let wrongBefore = false;
function nextCard() {
    answerInput.focus();
    statusText.innerText = "";
    checkAnswer();
    answerInput.value = "";
    document.querySelector('#correct').innerText = correctCounter + ' correct';
    document.querySelector('#incorrect').innerText = incorrectCounter + ' incorrect';
}

function checkAnswer() {
    if (answerInput.value == kana[currentIndex].romaji) {
        if (!wrongBefore) {
            correctCounter++;
        }
        currentIndex++;
        if (currentIndex < kana.length) {
            cardDisplay.innerText = kana[currentIndex].kana;
            wrongBefore = false;
        } else {
            document.querySelector('#game').style.display = 'none';
            document.querySelector('#game-finish').style.display = 'block';
            const retryBtn = document.querySelector('#retry-button');
            retryBtn.addEventListener('click', retryQuiz);
        }
    } else {
        incorrectCounter++;
        statusText.innerText = "incorrect, the answer is " + kana[currentIndex].romaji;
        wrongBefore = true;
    }
}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}

function retryQuiz() {
    correctCounter = 0;
    incorrectCounter = 0;
    currentIndex = 0;
    document.querySelector('#game-finish').style.display = 'none';
    startQuiz();
}