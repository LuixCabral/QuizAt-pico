let quizData = [
  {
    question: "O autismo é uma condição caracterizada por:",
    options: ["Deficiência visual", "Altura acima da média", "Hiperatividade", "Dificuldades de comunicação e interação social"],
    correct: "Dificuldades de comunicação e interação social",
  },
  {
    question: "Qual alternativa representa uma característica comum entre pessoas com TEA?",
    options: ["Facilidade de adesão á rotina", "Dificuldade em situações de Transição e mudanças", "Dificuldades na tomada de decisões", "Extroversão elevada"],
    correct: "Dificuldade em situações de Transição e mudanças",
  },
  {
    question: "O machismo estrutural contribui de fato para o Masking?",
    options: [
      "Sim , podendo levar também á transtornos psicológicos como ansiedade e depressão",
      "Sim , o machismo é o principal causador de Masking na sociedade",
      "Não , o machismo não tem interferência direta no fenômeno",
      "Nenhuma das alternativas",
    ],
    correct: "Sim , podendo levar também á transtornos psicológicos como ansiedade e depressão",
  },
  {
    question: "A hereditariedade deve ser considerada um dos fatores determinantes na realização de um diagnóstico?",
    options: ["Não , somente se os avós do indivíduo possuírem TEA", "Sim , hereditariedade é o principal fator a ser analisado", "Sim , porque á partir da determinação de existência dessa relação pode-se elaborar uma estratégia mais bem elaborada acerca da possibilidade de TEA", "Não , somente se os avós do indivíduo possuírem TEA"],
    correct: "Sim , porque á partir da determinação de existência dessa relação pode-se elaborar uma estratégia mais bem elaborada acerca da possibilidade de TEA",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container .question");
const optionsElement = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = quizData.length;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

const checkAnswer = (e) => {
  const userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  const allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  optionsElement.innerHTML = "";
  questionElement.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.textContent = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    optionsElement.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.textContent = `Você acertou ${score} de ${MAX_QUESTIONS}.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    const answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Questão ${i + 1}: ${quizData[i].question}</div>
    <div class="user-answer">Sua resposta: ${userAnswer || "Não Respondida "}</div>
    <div class="correct-answer">Resposta correta: ${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.textContent = "Refazer Quiz";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);

  const repositoryBtn = document.createElement("button");
  repositoryBtn.classList.add("repository-btn");
  repositoryBtn.textContent = "Visitar Repositório";
  repositoryBtn.addEventListener("click", () => {
    window.open('rep.html', '_blank');
  });
  quizResult.appendChild(repositoryBtn);
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});
