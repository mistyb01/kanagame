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


let currentIndex = 0;
function startQuiz() {
    document.querySelector('#game').style.display = 'block';
    cardDisplay.innerText = hiragana[0].kana;
    answerInput.focus();
}

function nextCard() {
    answerInput.focus();
    statusText.innerText = "";
    if (answerInput.value == hiragana[currentIndex].romaji) {
        currentIndex++;
        cardDisplay.innerText = hiragana[currentIndex].kana;
        answerInput.value = '';
    } else {
        statusText.innerText = "incorrect, the answer is " + hiragana[currentIndex].romaji;
    }
}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}