const questions = [
    {
        question: "What does 'HTTP' stand for in web development?",
        answers: [
            { text: "HyperText Transfer process", correct: false },
            { text: "HyperText Transfer protocol", correct: true },
            { text: "High Transfer protocol", correct: false },
            { text: "Hyperlink test Transfer process", correct: false },
        ]
    },

    {
        question: "What does 'OOP' stand for in programming?",
        answers: [
            { text: "Object-Oriented Programming", correct: true },
            { text: "Out of place", correct: false },
            { text: "Operational Optimization Process", correct: false },
            { text: "Object-Oriented Process", correct: false },
        ]

    },
    {
        question: "What is 'Pair Programming' in software development?",
        answers: [
            { text: "Writing code alone", correct: false },
            { text: "Two developers working on the same code together", correct: true },
            { text: "One developer writing code", correct: false },
            { text: "Hyperlink test Transfer process", correct: false },
        ]
    },
    {
        question: "In software development, what is the purpose of a 'library'?",
        answers: [
            { text: "To check out books", correct: false },
            { text: "To store user data", correct: true },
            { text: "To store reusable code and functions", correct: false },
            { text: "To run automated tests", correct: false },
        ]
    },
    {
        question: "What does 'DRY' stand for in software development?",
        answers: [
            { text: "Don't Repeat Yourself", correct: true },
            { text: "Design, Review, Yield", correct: false },
            { text: "Do Refractoring Yourself", correct: false },
            { text: "Deploy Regularly and Yell", correct: false },
        ]
    },
    {
        question: "What is the 'Smallest' country in the world?",
        answers: [
            { text: "Nepal", correct: false },
            { text: "Bhutan", correct: false },
            { text: "Nigeria", correct: false },
            { text: "Vatican City", correct: true },
        ]
    },
    {
        question: "What is 'Mobile App Development' primarily concerned with in software development?",
        answers: [
            { text: "Creating web content", correct: false },
            { text: "Designing user interface", correct: false },
            { text: "Testing software applications", correct: false },
            { text: "Developing software applications for mobile devices", correct: true },
        ]
    },
    {
        question: "What does 'IDE' stand for in software development?",
        answers: [
            { text: "Intergrated Design Environment", correct: true },
            { text: "Interactive Development Environment", correct: false },
            { text: "Intergrated Development Environment", correct: false },
            { text: "Interactive Design Environment", correct: false },
        ]
    },
    {
        question: "What does 'HTML' stand for in web development?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HyperText Makeup Language", correct: false },
            { text: "High Markup Language", correct: false },
            { text: "HyperText Memory Language", correct: false },
        ]
    },
    {
        question: "How many states are in Nigeria?",
        answers: [
            { text: "35", correct: false },
            { text: "47", correct: false },
            { text: "37", correct: false },
            { text: "36", correct: true },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 15000;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
 
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
    setTimeout(handleTimeout, timeLimit);

}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    clearTimeout();
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Test completed! You Scored ${score} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
   }
});
 
startQuiz();