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

const submitBtn = document.querySelector(".submit"),
    nextBtn = document.querySelector(".next");

const showQuestion = (question) => {
    const questionText = document.querySelector('.question');
    answersWrapper = document.querySelector('.answer-wrapper');
    questionNumber = document.querySelector('.number');

    questionText.innerHTML = question.question;

    // correct an wrong answer are separate lets mix them
    const answers = [
        ...question.incorrect_answers,
        question.correct_answer.toString(),
    ];
    //correct answer will be always at last
    // lets shuffle the array
    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
        <div class="answer ">
                    <span class="text">${answer}</span>
                    <span class="checkbox">
                        <span class="icon">✔</span>
                    </span>
                </div>`;
    });

    questionNumber.innerHTML = `
    Question <span class="current">${questions.indexOf(question) + 1
        }</span><span class="total">/${questions.length}</span>`;

    // add event listener on answers

    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
            if (!answer.classList.contains("checked")) {
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                });
                answer.classList.add("selected");
                submitBtn.disabled = false;
            }
        });
    });

    // after updating question start timer
    time = timePerQuestion.value;
    startTimer(time);

};

const startTimer = (time) => {
    timer = setInterval(() => {
        if (time >= 0) {
            //if timer more than 0 means time remaining
            //move progress
            progress(time);
            time--;
        } else {
            //if time finishes means less than 0
            checkAnswer();
        }
    }, 1000);
};

submitBtn.addEventListener("click", () => {
    checkAnswer();
});

const checkAnswer = () => {
    //firstclear inteval when check answer triggerd
    clearInterval(timer);

    const selectedAnswer = document.querySelector(".answer.selected");
    //any answer is elekected
    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text");
        if (answer === questions[currentQuestion - 1].correct_answer) {
            //if answer matched with current question currect answer
            //increase score
            score++;
            //add correct class on selected
            selectedAnswer.classList.add('correct');
        } else {
            //if worng selected
            //add wrong class on selected but then also add correct on correct answer
            //correct added lets add wrong on selected
            selectedAnswer.classList.add("wrong");
            const correctAnswer = document.querySelectorAll(".answer")
                .forEach((answer) => {
                    if (
                        answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer
                    ) {
                        //only add correct class to correct answer
                        answer.classList.add("correct");
                    }
                });
        }
    }
    //answer check will be also triggered when time reaches 0
    //what if nothing selected and time finishes
    else {
        const correctAnswer = document.querySelectorAll(".answer")
            .forEach((answer) => {
                if (
                    answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer
                ) {
                    //only add correct class to correct answer
                    answer.classList.add("correct");
                }
            });
    }

    //lets block user to selected further answers
    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        answer.classList.add("checked");
    });
};
