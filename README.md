# kanagame

an app that helps you learn kana.
the mvp can be a simple quiz that quizzes you on random kana.

ways for people to answer:

- multiple choice- select from 4 options (learn how to generate random options)
- type it and press space (most straightforward?)
- just type it in romaji (think about how to account for wrong answers?)
- voice (could be cool if it's reliable and possible)

after each game, people can study just from the ones they got wrong. and keep repeating the process until they get them all right?

ideas for extra features:
customization

- select what rows of kana to study
- hiragana, katakana, or mixed
- monographs, digraphs
- diacritics
- allows you to star cards, to study separately later (like quizlet)
- choose between being given the kana first (default) or the romaji/voice first
- timed mode? counts how long it takes you to get through a set.

other types of games:

- kana reading test. kana is flashed on the screen for a second, then you have to type (or say) what it said. uses vocabulary words.
- kana-to-romaji speed test. you're given a short passage written in kana, which you have to convert to romaji

backburner idea: a flashcard generator from a text file of questions and answers?

example sites
https://www.hiraganaquiz.com/ - type the correct answer
https://kana.pro/ - multiple choice

---

implementation steps for v1

step 1: setup, simple flashcard functionality

- [x] set up html- a text input, submit button, div for kana to appear, and div for score + feedback on whether they were correct
- [x] data structure for kana and answers.. an array of objects for now
- [x] render one kana at a time on the ui
- [x] click a button to go to the next kana

step 2: implement answering functionality

- [x] if user submits correct answer, go to next card.
- [x] if user submits wrong answer, give feedback (say what the correct answer was, then have them type it to continue)
- [x] add a counter for # correct and # wrong

step 3: adding randomization

- [] find a way to present the user with the kana in a random order (by default)
- [] as kana get answered, pop them out of the currentGame array, and put them into either the correct or incorrect array (so we can display the correct/wrong answers at the end, or give ppl the option to quiz with just the incorrects)
