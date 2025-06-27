// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "Who is the Prime Minister of India as of 2012?",
    answers: [
      { text: "Narendra Modi", correct: false },
      { text: "Atal Bihari Vajpayee", correct: false },
      { text: "DR.Manmohan Singh", correct: true },
      { text: "Guljarilal Nanda", correct: false },
    ],
  },
  {
    question: "Which is the third largest economy in the world as of 2025?",
    answers: [
      { text: "India", correct: false },
      { text: "Germany", correct: true },
      { text: "China", correct: false },
      { text: "United Kingdom", correct: false },
    ],
  },
  {
    question: "who is the Governor of Jharkhand?",
    answers: [
      { text: "Ramesh Bais", correct: false },
      { text: "Arif Mohammad Khan", correct: false },
      { text: "S.Radhakrishnan", correct: false },
      { text: "Santosh Kumar Gangwar", correct: true },
    ],
  },
  {
    question: "Which of these is not a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "Who is the current Vice Chancellor of Vinoba Bhave University?",
    answers: [
      { text: "Dr.Pawan Kumar Poddar", correct: false },
      { text: "Dr.Dinesh Kumar Singh", correct: false },
      { text: "Dr.Chandra Bhushan Sharma", correct: true },
      { text: "Dr.Khemlal Mahato", correct: false },
    ],
  },
];


// Game State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initialize
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Theme Preference Setup
document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = localStorage.getItem("theme") === "dark";
  if (prefersDark) {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

// Theme Toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selected) {
      btn.classList.add("incorrect");
    }
  });

  if (correct) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }

  progressBar.style.width = "100%";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}