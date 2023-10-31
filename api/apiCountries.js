import { element } from "../events/modal.js";

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

let { results, correctAnswer, currentRandomAnswerNumber, currentQuestion, currentBadAnswers, answerStreak, questions, answerLetters, maxLength  } = {
  results: [],
  correctAnswer: "",
  currentRandomAnswerNumber: 0,
  currentQuestion: 0,
  currentBadAnswers: [0, 1, 2],
  answerStreak: 0,
  questions: ["is the capital of...", "What country does it belong to"],
  answerLetters: ["a.", "b.", "c.", "d."],
  maxLength: ''
};

const appEl = document.querySelector(".app-container");
const nextButton = element('button', { className: ['app-next-btn', 'btn', 'btn-warning', 'offset-9','col-3', 'mx-', 'my-2'], textCont: 'Next' }, [])

/**
 * Add HTML elements in main contain
 * @param {*} markup typeof HTMLelement
 */
const generateAppItems = (markup) => {
  appEl.appendChild(markup);
};

/**
 * Add text at HTML elements 
 */
const generateAppTextItems = () => {
  appEl.innerHTML = "";
};

/**
 * Run the request and initialize the game
 */
const init = () => {
  fetchData();
  handleClicks();
};

/**
 * Fetch to graphql api
 */
const fetchData = async () => {
  const response = await fetch("https://countries.trevorblades.com/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query {
        countries {
          capital
          name
          continent{
            name
          }
        }
      }
  ` }),
  });

  const { data } = await response.json();
  const { countries } = data;
  maxLength = countries.length
  results = countries;
  createRandomData();
};

/**
 * Evaluates where you clicked within the main container
 */
const handleClicks = () => {
  appEl.addEventListener("click", ({target}) => {
    if (target.closest(".app-try-again-btn")) {
      newGame();
      return;
    }

    if (!target.closest(".app-answer-container")) return;

    checkAnswer(target.closest(".app-answer-container"));
  });
};

/**
 * Create questions of quiz
 */
const createQuestion = () => {
  let markup;
  if (currentQuestion === 0) {
    markup =
      element('p', { className: ['text-center', 'fw-semibold', 'fs-4', 'mb-2', ], textCont: `${results[currentRandomAnswerNumber].capital} ${questions[currentQuestion]}` }, [])
    generateAppItems(markup);
  }

  if (currentQuestion === 1) {
    markup =
      element('p', { className: ['text-center', 'fw-semibold', 'fs-4', 'mb-2',], textCont: `${questions[currentQuestion]} ${results[currentRandomAnswerNumber].continent.name}?` }, [])
    generateAppItems(markup);
  }
};

/**
 * Create answers of quiz
 */
const createAnswers = () => {
  const arrAnswers = currentBadAnswers.map((value) => {
    if(results[value].continent.name !== correctAnswer.continent.name)
    return results[value].name;
  });

  arrAnswers.push(results[currentRandomAnswerNumber].name);
  const answersShuffled = arrAnswers.sort((a, b) => 0.5 - Math.random());

  answerLetters.map((letter, index) => {
    let newElement = element('div', { className: ['app-answer-container', 'd-flex', 'gap-2', 'mx-auto', 'w-100', 'py-3', 'px-3', 'm-2', 'rounded-3'] }, [
      element('p', { className: ['app-answer-letter', 'm-0'], textCont: letter }, []),
      element('p', { className: ['app-answer-text', 'm-0'], textCont: answersShuffled[index] }, [])
    ]);
    generateAppItems(newElement);
  })
};

/**
 * Generate a random question from among the possible questions
 */
const getRandomQuestion = () => {
  currentQuestion = getRandomNumber(0, 2);
};

/**
 * Generate correct ansmwer
 */
const getRandomAnswer = () => {
  const ranNum = getRandomNumber(0, maxLength);
  currentRandomAnswerNumber = ranNum;
  correctAnswer = results[ranNum];
};

/**
 * Generate incorrect answers
 */

const getRandomBadAnswers = () => {
  currentBadAnswers.forEach((_, index) => {
    currentBadAnswers[index] = getRandomNumber(0, maxLength);
    if (currentBadAnswers[index] === currentRandomAnswerNumber)
      getRandomBadAnswers();
  });
  if (
    currentBadAnswers.some(
      (val, i) => currentBadAnswers.indexOf(val) !== i
    )
  )
    getRandomBadAnswers();
};

/**
 * Check the response and execute the corresponding function
 */
const checkAnswer = (answerEl) => {
  const answer = answerEl.querySelector(".app-answer-text").textContent;
  if (answer === correctAnswer) {
    answerEl.classList.add("correct-answer");
    answerStreak++;
    goodAnswer();
    return;
  }
  answerEl.classList.add("incorrect-answer");
  badAnswer();
};

/**
 * Show more random questions by answering correctly
 */
const goodAnswer = () => {
  generateAppItems(nextButton);
  document.querySelector(".app-next-btn").addEventListener("click", () => {
    generateAppTextItems()
    createRandomData();
  });
};

/**
 * Shows the result of incorrect answers after failing
 */
const badAnswer = () => {
  const elements = [...document.querySelectorAll(".app-answer-container")];
  elements.forEach((element) => {
    const elText = element.querySelector(".app-answer-text").textContent;
    if (elText === correctAnswer) element.classList.add("correct-answer");

  });

  generateAppItems(nextButton);

  document.querySelector(".app-next-btn").addEventListener("click", () => {
    const markup =
      element('div', { className: ['d-flex', 'flex-column', 'justify-content-center', 'align-items-center'] }, [
        element('p', { className: ['f-4', 'fw-semibold', ], textCont: 'RESULTS' }, []),
        element('p', { className: ['fs-6', 'text-secondary'], textCont: `You got ${answerStreak} correct answers` }, []),
        element('button', { className: ['app-try-again-btn', 'btn', 'btn-outline-success'], textCont: 'Try again' }, [])
      ])
    generateAppTextItems()
    generateAppItems(markup);
  });
};

/**
 * Restart the game
 */
const newGame = () => {
  answerStreak = 0;
  generateAppTextItems()
  createRandomData();
};

/**
 * Create random quiz
 */
const createRandomData = () => {
  getRandomQuestion();
  getRandomAnswer();
  getRandomBadAnswers();
  createQuestion();
  createAnswers();
  pointsCorrect();
};

init();

function pointsCorrect(){
  const points =  element('div', { className: ['text-secondary', 'w-100', 'm-2'] }, [
    element('p', { className: ['m-0', 'text-start'], textCont: `Score:${answerStreak}/${maxLength}` }, [])
  ]);

  generateAppItems(points);
}

