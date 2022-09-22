import { kana, kana_short } from './quizdata.js';

// document selectors
const cardDisplay = document.querySelector('.card-display');
const answerInput = document.querySelector('.answer-input');
answerInput.addEventListener('keydown', checkKey);
const statusText = document.querySelector('.status');
const startBtn = document.querySelector('.start-button');
const selectAllBtn = document.querySelector('.select-all-button');
const unselectAllBtn = document.querySelector('.unselect-all-button');

startBtn.addEventListener('click', startQuiz);
selectAllBtn.addEventListener('click', selectAll);
unselectAllBtn.addEventListener('click', unselectAll);


const filterDiv = document.querySelector('.preferences');
const scoreDiv = document.querySelector('.score');
const correctDiv = document.querySelector('.correct');
const incorrectDiv = document.querySelector('.incorrect');

// arrays
let currentGame = [...kana];
let correctCards = [];
let incorrectCards = [];
let currentIndex = 0;

function startQuiz() {
    filterSet();
    filterDiv.style.display = 'none';
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
    if (currentGame.length != 0) {
        updateScoreUI();
    }
}

function updateScoreUI() {
    correctDiv.innerText = correctCards.length + ' correct';
    incorrectDiv.innerText = incorrectCards.length + ' incorrect';
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
            renderList();
        }
    } else {
        statusText.innerText = "incorrect, the answer is " + currentGame[currentIndex].romaji;
        wrongBefore = true;
    }
}

function checkKey(e) {
    if(e && e.keyCode == 13) {
        nextCard();
    }
}

function retryQuiz() {
    correctCards = [];
    incorrectCards = [];
    document.querySelector('.game-finish').style.display = 'none';
    correctDiv.innerText = '';
    incorrectDiv.innerText = '';
    filterDiv.style.display = 'block';
    startBtn.style.display = 'block';
}

function renderList() {
    correctCards.map(item => {
        const newListItem = document.createElement('p');
        const listText = document.createTextNode(item.kana + ': ' + item.romaji);
        newListItem.appendChild(listText);
        correctDiv.appendChild(newListItem);
    });

    incorrectCards.map(item => {
        const newListItem = document.createElement('p');
        const listText = document.createTextNode(item.kana + ': ' + item.romaji);
        newListItem.appendChild(listText);
        incorrectDiv.appendChild(newListItem);
    });

}

function filterSet() {
    let newArray = []; 
    const rowCheckboxes = document.querySelectorAll('.rows input[type=checkbox]');
    rowCheckboxes.forEach(filter => {
        if (filter.checked) {
            let filtered = [];
            filtered = kana.filter(card => card.row == filter.id);
            // add the filtered values to the new array
            filtered.forEach(card => { newArray.push(card); })
        }
    })
    const typeCheckboxes = document.querySelectorAll('.type input[type=checkbox]');
    typeCheckboxes.forEach(filter => {
        if (filter.checked) {
            newArray = newArray.filter(card => card.type == filter.id);
        }
    })
    console.log(newArray);
    currentGame = [...newArray];
    currentIndex = Math.floor(Math.random() * currentGame.length);
}

function selectAll() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(filter => {
        filter.checked = true;
    })
}

function unselectAll() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(filter => {
        filter.checked = false;
    })
}

