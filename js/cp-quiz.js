// Banque de questions CP - À enrichir selon vos besoins
const cpQuestions = [
  // FRANÇAIS - SYLLABES
  {
    id: 1,
    question: "Comment se prononce la syllabe 'ba' ?",
    options: ["[ba]", "[bə]", "[bɑ]"],
    correct: 0,
    audio: "sons/syllabes/ba.mp3",
    matière: "français",
    compétence: "phonologie"
  },
  {
    id: 2,
    question: "Combien de syllabes dans 'papillon' ?",
    options: ["2", "3", "4"],
    correct: 1,
    audio: "sons/mots/papillon.mp3",
    matière: "français",
    compétence: "syllabation"
  },
  {
    id: 3,
    question: "Quel son fait la lettre 'ch' dans 'château' ?",
    options: ["[ʃ]", "[k]", "[tʃ]"],
    correct: 0,
    audio: "sons/syllabes/cha.mp3",
    matière: "français",
    compétence: "phonologie"
  },
  {
    id: 4,
    question: "Combien de syllabes dans 'maison' ?",
    options: ["1", "2", "3"],
    correct: 1,
    audio: "sons/mots/maison.mp3",
    matière: "français",
    compétence: "syllabation"
  },
  {
    id: 5,
    question: "Quel son fait 'ou' ?",
    options: ["[u]", "[o]", "[ɔ]"],
    correct: 0,
    audio: "sons/syllabes/ou.mp3",
    matière: "français",
    compétence: "phonologie"
  },
  // MATHÉMATIQUES - NUMÉRATION
  {
    id: 6,
    question: "Quel nombre vient après 29 ?",
    options: ["28", "30", "39"],
    correct: 1,
    audio: null,
    matière: "mathématiques",
    compétence: "numération"
  },
  {
    id: 7,
    question: "Combien font 7 + 5 ?",
    options: ["10", "11", "12"],
    correct: 2,
    audio: null,
    matière: "mathématiques",
    compétence: "addition"
  },
  {
    id: 8,
    question: "Combien font 15 - 3 ?",
    options: ["10", "12", "18"],
    correct: 1,
    audio: null,
    matière: "mathématiques",
    compétence: "soustraction"
  },
  // SCIENCES
  {
    id: 9,
    question: "Quel est l'état de l'eau à 0°C ?",
    options: ["Liquide", "Solide", "Gazeux"],
    correct: 1,
    audio: null,
    matière: "sciences",
    compétence: "états de l'eau"
  },
  {
    id: 10,
    question: "Combien de pattes a une araignée ?",
    options: ["6", "8", "10"],
    correct: 1,
    audio: null,
    matière: "sciences",
    compétence: "vivant"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function startQuiz() {
  shuffledQuestions = [...cpQuestions].sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  document.getElementById("start-quiz-btn").style.display = "none";
  showQuestion();
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const questionObj = shuffledQuestions[currentQuestionIndex];
  let audioButton = '';
  if (questionObj.audio) {
    audioButton = `<button class="audio-btn" onclick="playAudio('${questionObj.audio}')">🔊 Écouter</button>`;
  }
  quizContainer.innerHTML = `
    <div class="question-card">
      <div class="question-header">
        <h2>Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}</h2>
        <span class="matiere-badge">${questionObj.matière}</span>
      </div>
      <p class="question-text">${questionObj.question}</p>
      ${audioButton}
      <div class="options">
        ${questionObj.options.map((opt, i) => 
          `<button class="option-btn" onclick="checkAnswer(${i})">${opt}</button>`
        ).join('')}
      </div>
    </div>
  `;
}

function checkAnswer(selectedIndex) {
  const questionObj = shuffledQuestions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach(btn => btn.disabled = true);
  if (selectedIndex === questionObj.correct) {
    score++;
    optionButtons[selectedIndex].classList.add("correct");
    playAudio('sons/feedback/correct.mp3');
  } else {
    optionButtons[selectedIndex].classList.add("incorrect");
    optionButtons[questionObj.correct].classList.add("correct");
    playAudio('sons/feedback/incorrect.mp3');
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
      setTimeout(() => {
        document.querySelectorAll(".option-btn").forEach(btn => {
          btn.disabled = false;
          btn.classList.remove("correct", "incorrect");
        });
      }, 500);
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  const pourcentage = Math.round((score / shuffledQuestions.length) * 100);
  let message, emoji;
  if (pourcentage === 100) {
    message = "Excellent ! Tu as tout juste ! 🌟";
    emoji = "🏆";
  } else if (pourcentage >= 80) {
    message = "Très bien ! Continues à pratiquer ! 👍";
    emoji = "😊";
  } else if (pourcentage >= 60) {
    message = "Pas mal ! Reviens bientôt pour t'améliorer ! 💪";
    emoji = "🙂";
  } else {
    message = "Continue à t'entrainer, tu vas y arriver ! 💪";
    emoji = "😅";
  }
  resultContainer.innerHTML = `
    <div class="result-card">
      <h2>Quiz terminé ! ${emoji}</h2>
      <p>Votre score : ${score}/${shuffledQuestions.length} (${pourcentage}%)</p>
      <p class="result-message">${message}</p>
      <button onclick="startQuiz()" class="retry-btn">Recommencer</button>
      <button onclick="showHome()" class="home-btn">Retour à l'accueil</button>
    </div>
  `;
}

function showHome() {
  document.getElementById("result-container").style.display = "none";
  document.getElementById("start-quiz-btn").style.display = "block";
}

function playAudio(src) {
  if (!src) return;
  const audio = new Audio(src);
  audio.play().catch(e => console.log("Erreur lecture audio :", e));
}

document.addEventListener('DOMContentLoaded', () => {
  const cpContent = document.querySelector(".cp-content");
  if (cpContent && !document.getElementById("start-quiz-btn")) {
    const startButton = document.createElement("button");
    startButton.id = "start-quiz-btn";
    startButton.textContent = "Commencer le quiz CP";
    startButton.className = "start-quiz-btn";
    startButton.onclick = startQuiz;
    cpContent.appendChild(startButton);
    
    const quizContainer = document.createElement("div");
    quizContainer.id = "quiz-container";
    quizContainer.style.display = "none";
    cpContent.appendChild(quizContainer);
    
    const resultContainer = document.createElement("div");
    resultContainer.id = "result-container";
    resultContainer.style.display = "none";
    cpContent.appendChild(resultContainer);
  }
});
