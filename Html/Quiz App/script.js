// Quiz questions
const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "What is the largest planet in our Solar System?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: 2 },
    { question: "Which programming language is used for web development?", options: ["Python", "Java", "JavaScript", "C++"], answer: 2 },
    { question: "What is the boiling point of water in Celsius?", options: ["50", "100", "150", "200"], answer: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"], answer: 1 },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "500,000 km/s"], answer: 0 }

];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const quizContainer = document.getElementById('quiz');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

// Load a question
function loadQuestion(index) {
    clearInterval(timer);
    timeLeft = 10;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up!");
            nextQuestion();
        }
    }, 1000);

    const questionData = questions[index];
    quizContainer.innerHTML = `
        <h4>${questionData.question}</h4>
        <ul class="list-group mt-3">
            ${questionData.options.map((option, i) => `
                <li class="list-group-item" onclick="checkAnswer(${i})">${option}</li>
            `).join('')}
        </ul>
        <div id="feedback" class="feedback"></div>
    `;
}

// Check answer
function checkAnswer(selected) {
    const feedback = document.getElementById('feedback');
    if (selected === questions[currentQuestion].answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = "Incorrect.";
        feedback.style.color = "red";
    }
    clearInterval(timer);
    nextButton.disabled = false;
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
        prevButton.disabled = currentQuestion === 0;
        nextButton.disabled = true;
    } else {
        showScore();
    }
}

// Navigate to previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
        prevButton.disabled = currentQuestion === 0;
    }
}

// Display the score
function showScore() {
    quizContainer.innerHTML = '';
    timerDisplay.textContent = '';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    scoreDisplay.innerHTML = `<h4>Your Score: ${score}/${questions.length}</h4>`;
    scoreDisplay.classList.remove('d-none');
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);

// Initialize quiz
loadQuestion(currentQuestion);