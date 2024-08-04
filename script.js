const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;

const startBtn = document.querySelector('.start');
const numQuestions = document.querySelector('#num-questions');
const category = document.querySelector('#category');
const difficulty = document.querySelector('#difficulty');
const timePerQuestion = document.querySelector('#time');
const quiz = document.querySelector('.quiz');
const startscreen = document.querySelector('.start-screen');