import { kana, kana_short } from './quizdata.js';

// document selectors
const cardDisplay = document.querySelector('.card-display');
const answerInput = document.querySelector('.answer-input');
answerInput.addEventListener('keydown', checkKey);
const statusText = document.querySelector('.status');
const startBtn = document.querySelector('.start-button');
startBtn.addEventListener('click', startQuiz);

// arrays
let currentGame = [...kana_short];
let correctCards = [];
let incorrectCards = [];

let currentIndex = Math.floor(Math.random() * currentGame.length);
// get random index: Math.floor(Math.random() * kana.length);

function startQuiz() {
    startBtn.style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    cardDisplay.innerText = currentGame[currentIndex].kana;
    answerInput.focus();
    updateScoreUI();
}

let wrongBefore = false;
function nextCard() {
    answerInput.focus();
    statusText.innerText = "";
    checkAnswer();
    answerInput.value = "";
    updateScoreUI();
}

function updateScoreUI() {
    document.querySelector('.correct').innerText = correctCards.length + ' correct';
    document.querySelector('.incorrect').innerText = incorrectCards.length + ' incorrect';
}

function checkAnswer() {
    
    if (answerInput.value == currentGame[currentIndex].romaji) {
        //add it to the incorrect/correct pile (depends on if they answered right the first time)
        wrongBefore ? incorrectCards.push(currentGame[currentIndex]) : correctCards.push(currentGame[currentIndex]);
        currentGame.splice(currentIndex, 1); //remove the just answered card from the game array
        
        if (currentGame.length > 0) {
        // randomize the current index and go to the next card!
        currentIndex = Math.floor(Math.random() * currentGame.length);
        cardDisplay.innerText = currentGame[currentIndex].kana;
        wrongBefore = false;
        } else { //game over!
            document.querySelector('.game').style.display = 'none';
            document.querySelector('.game-finish').style.display = 'block';
            const retryBtn = document.querySelector('.retry-button');
            retryBtn.addEventListener('click', retryQuiz);
        }
    } else {
        statusText.innerText = "incorrect, the answer is " + currentGame[currentIndex].romaji;
        wrongBefore = true;
    }
    
    console.log("correct", correctCards);
    console.log("incorrect", incorrectCards);
}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}

function retryQuiz() {
    currentIndex = 0;
    currentGame = [...kana_short];
    correctCards = [];
    incorrectCards = [];
    document.querySelector('.game-finish').style.display = 'none';
    startQuiz();
}