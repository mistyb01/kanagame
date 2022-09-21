const hiragana = [
    {
        kana: "あ",
        romaji: "a",
        type: "hiragana",
        row: "a"
    },
    {
        kana: "い",
        romaji: "i",
        type: "hiragana",
        row: "a"
    },
    {
        kana: "う",
        romaji: "u",
        type: "hiragana",
        row: "a"
    },
    {
        kana: "え",
        romaji: "e",
        type: "hiragana",
        row: "a"
    },
    {
        kana: "お",
        romaji: "o",
        type: "hiragana",
        row: "a"
    },
]

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
    cardDisplay.innerText = hiragana[0].kana;
    answerInput.focus();
}

let wrongBefore = false;
function nextCard() {
    answerInput.focus();
    statusText.innerText = "";
    if (answerInput.value == hiragana[currentIndex].romaji) {
        if (!wrongBefore) {
            correctCounter++;
        }
        currentIndex++;
        cardDisplay.innerText = hiragana[currentIndex].kana;
        wrongBefore = false;
    } else {
        incorrectCounter++;
        statusText.innerText = "incorrect, the answer is " + hiragana[currentIndex].romaji;
        wrongBefore = true;
    }
    document.querySelector('#correct').innerText = correctCounter + ' correct';
    document.querySelector('#incorrect').innerText = incorrectCounter + ' incorrect';
    answerInput.value = "";



}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}