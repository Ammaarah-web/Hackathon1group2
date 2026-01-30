// =====================
// QUIZ DATA
// =====================
const questions = [
    { text: "Depression is a sign of weakness.", correct: "myth" },
    { text: "Talking about mental health can help recovery.", correct: "fact" },
    { text: "Stress always has negative effects.", correct: "myth" },
    { text: "Mental health conditions are medical issues.", correct: "fact" },
    { text: "Asking for help shows strength.", correct: "fact" },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// =====================
// ELEMENTS
// =====================
const startBtn = document.getElementById("startBtn");
const homeSection = document.getElementById("home");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");
const reviewsSection = document.getElementById("reviews");

const mythBtn = document.getElementById("myth");
const factBtn = document.getElementById("fact");
const nextBtn = document.getElementById("next");

const reviewMissedBtn = document.getElementById("reviewMissed");
const playAgainBtn = document.getElementById("playAgain");
const shareResultBtn = document.getElementById("shareResult");
const backToResultsBtn = document.getElementById("backToResults");

const shareMenu = document.getElementById("shareMenu");
const copyShareBtn = document.getElementById("copyShare");
const whatsappShareBtn = document.getElementById("whatsappShare");
const twitterShareBtn = document.getElementById("twitterShare");
const emailShareBtn = document.getElementById("emailShare");

// =====================
// LOAD QUESTION
// =====================
function loadQuestion() {
    const questionContainer = quizSection.querySelector(".question");

    // Remove old question
    const oldText = document.getElementById("questionText");
    if (oldText) oldText.remove();

    // Add new question text
    const questionText = document.createElement("h4");
    questionText.id = "questionText";
    questionText.className = "col-12 mb-3";
    questionText.textContent = questions[currentQuestion].text;

    questionContainer.prepend(questionText);

    nextBtn.disabled = true;
}

// =====================
// SHOW START BUTTON
// =====================
setTimeout(() => {
    startBtn.classList.add("show");
}, 200);

// =====================
// START QUIZ
// =====================
startBtn.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    loadQuestion();
});

// =====================
// HANDLE ANSWERS
// =====================
function handleAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    if (answer === questions[currentQuestion].correct) score++;
    nextBtn.disabled = false;
}

mythBtn.addEventListener("click", () => handleAnswer("myth"));
factBtn.addEventListener("click", () => handleAnswer("fact"));

// =====================
// NEXT QUESTION
// =====================
nextBtn.addEventListener("click", () => {
    if (!userAnswers[currentQuestion]) {
        alert("Please choose Myth or Fact before continuing.");
        return;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// =====================
// SHOW RESULTS
// =====================
function showResults() {
    quizSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    document.getElementById("finalScore").textContent =
        `Final Score: ${score} / ${questions.length}`;
}

// =====================
// REVIEW MISSED QUESTIONS
// =====================
function loadReview() {
    const reviewContainer = reviewsSection.querySelector(".review-list");
    reviewContainer.innerHTML = "";

    questions.forEach((q, i) => {
        if (userAnswers[i] !== q.correct) {
            const item = document.createElement("div");
            item.className = "mb-3 p-2 border rounded";
            item.innerHTML = `
                <p><strong>Q:</strong> ${q.text}</p>
                <p><strong>Correct Answer:</strong> ${q.correct}</p>
                <p><strong>Your Answer:</strong> ${userAnswers[i]}</p>
            `;
            reviewContainer.appendChild(item);
        }
    });

    if (!reviewContainer.hasChildNodes()) {
        reviewContainer.innerHTML =
            "<p>Congratulations! You got all questions correct.</p>";
    }
}

reviewMissedBtn.addEventListener("click", () => {
    resultsSection.classList.add("hidden");
    reviewsSection.classList.remove("hidden");
    loadReview();
});

backToResultsBtn.addEventListener("click", () => {
    reviewsSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
});

// =====================
// PLAY AGAIN
// =====================
playAgainBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    resultsSection.classList.add("hidden");
    reviewsSection.classList.add("hidden");
    quizSection.classList.add("hidden");
    homeSection.classList.remove("hidden");

    startBtn.classList.remove("show");
    setTimeout(() => startBtn.classList.add("show"), 200);
});

// =====================
// SHARE RESULT DROPDOWN
// =====================
shareResultBtn.addEventListener("click", () => {
    shareMenu.classList.toggle("hidden");
});

copyShareBtn.addEventListener("click", () => {
    navigator.clipboard
        .writeText(
            `I scored ${score} / ${questions.length} on the Myth vs Fact Quiz!`,
        )
        .then(() => alert("Copied to clipboard!"));
});

whatsappShareBtn.addEventListener("click", () => {
    window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(`I scored ${score} / ${questions.length} on the Myth vs Fact Quiz!`)}`,
        "_blank",
    );
});

twitterShareBtn.addEventListener("click", () => {
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${score} / ${questions.length} on the Myth vs Fact Quiz!`)}`,
        "_blank",
    );
});

emailShareBtn.addEventListener("click", () => {
    window.location.href = `mailto:?subject=My Quiz Score&body=${encodeURIComponent(`I scored ${score} / ${questions.length} on the Myth vs Fact Quiz!`)}`;
});
