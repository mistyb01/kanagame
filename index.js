import { kana } from './quizdata.js';

const startBtn = document.querySelector('#start-button');
startBtn.addEventListener('click', startQuiz);

const cardDisplay = document.querySelector('#card-display');
const answerInput = document.querySelector('#answer-input');
answerInput.addEventListener('keydown', checkKey);
const statusText = document.querySelector('#status');

let correctCounter = 0;
let incorrectCounter = 0;

let currentIndex = 0;
function startQuiz() {
    startBtn.style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    cardDisplay.innerText = kana[0].kana;
    answerInput.focus();
}

let wrongBefore = false;
function nextCard() {
    answerInput.focus();
    statusText.innerText = "";

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
        }
    } else {
        incorrectCounter++;
        statusText.innerText = "incorrect, the answer is " + kana[currentIndex].romaji;
        wrongBefore = true;
    }
    answerInput.value = "";
    document.querySelector('#correct').innerText = correctCounter + ' correct';
    document.querySelector('#incorrect').innerText = incorrectCounter + ' incorrect';
}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}