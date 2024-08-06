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

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;
    // api url
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            questions = data.results;
            startscreen.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
        });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector('.question');
    answersWrapper = document.querySelector('.answer-wrapper');
    questionNumber = document.querySelector('.number');

    questionText.innerHTML = question.question;
};