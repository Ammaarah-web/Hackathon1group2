// =====================
// QUIZ DATA
// =====================
const questions = [
    {
        text: "Depression is a sign of weakness.",
        correct: "myth",
        info: "Depression is a medical condition, not a character flaw. It affects millions of people and is treatable with therapy, medication, or both. Seeking help is a sign of strength and self-awareness."
    },
    {
        text: "Talking about mental health can help recovery.",
        correct: "fact",
        info: "Communication is crucial for mental health recovery. Talking to trusted friends, family, or mental health professionals can help process emotions, reduce isolation, and create a support system."
    },
    {
        text: "Stress always has negative effects.",
        correct: "myth",
        info: "While chronic stress is harmful, some stress (eustress) can be motivating and improve performance. The key is managing stress levels through exercise, relaxation, and healthy coping strategies."
    },
    {
        text: "Mental health conditions are medical issues.",
        correct: "fact",
        info: "Mental health conditions have biological, psychological, and social components. They deserve the same medical attention and treatment as physical illnesses. Stigma should not prevent people from seeking care."
    },
    {
        text: "Asking for help shows strength.",
        correct: "fact",
        info: "Reaching out for help demonstrates self-awareness and courage. Whether it's talking to a therapist, counselor, or trusted person, asking for support is an important step toward wellness and recovery."
    }
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

const infoModal = document.getElementById("infoModal");
const closeModalBtn = document.getElementById("closeModal");
const modalNextBtn = document.getElementById("modalNext");
const modalTitle = document.getElementById("modalTitle");
const modalInfo = document.getElementById("modalInfo");

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
function showModal() {
    modalTitle.textContent = questions[currentQuestion].correct === "myth" ? "About This Myth" : "Important Fact";
    modalInfo.textContent = questions[currentQuestion].info;
    infoModal.classList.remove("hidden");
}

function closeModal() {
    infoModal.classList.add("hidden");
}

function proceedToNextQuestion() {
    infoModal.classList.add("hidden");
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

nextBtn.addEventListener("click", () => {
    if (!userAnswers[currentQuestion]) {
        alert("Please choose Myth or Fact before continuing.");
        return;
    }
    showModal();
});

closeModalBtn.addEventListener("click", closeModal);
modalNextBtn.addEventListener("click", proceedToNextQuestion);

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
