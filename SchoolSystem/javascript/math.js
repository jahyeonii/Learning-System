let currentLevel = 1;
let currentOperation = '';
let currentAnswer = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;

const optionsButtons = Array.from(document.querySelectorAll('.options button'));
const correctWrongDiv = document.getElementById('correctWrong');

function startGame(operation) {
  currentOperation = operation;
  currentLevel = 1;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  correctWrongDiv.classList.add('hidden');
  document.querySelector('.menu').classList.add('hidden');
  document.querySelector('.game').classList.remove('hidden');
  updateScore();
  generateQuestion();
}

function generateQuestion() {
  // Use small numbers for 5-8 years old
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  if(currentOperation === 'subtraction' && num2 > num1) {
    [num1, num2] = [num2, num1]; // avoid negative
  }

  if(currentOperation === 'division') {
    num1 = num1 * num2; // ensures whole number division
  }

  switch(currentOperation) {
    case 'addition': currentAnswer = num1 + num2; break;
    case 'subtraction': currentAnswer = num1 - num2; break;
    case 'multiplication': currentAnswer = num1 * num2; break;
    case 'division': currentAnswer = num1 / num2; break;
  }

  document.getElementById('question').textContent = `${num1} ${operationSymbol(currentOperation)} ${num2} = ?`;

  // Generate 3 wrong answers close to correct answer
  let answers = [currentAnswer];
  while(answers.length < 4) {
    let wrong = currentAnswer + Math.floor(Math.random()*5 - 2); // small offset
    if(wrong < 0) wrong = 0;
    if(!answers.includes(wrong)) answers.push(wrong);
  }

  shuffleArray(answers);

  optionsButtons.forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.onclick = () => checkAnswer(answers[i]);
  });
}

function operationSymbol(op) {
  switch(op) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
}

function checkAnswer(selected) {
  if(selected === currentAnswer) {
    score++;
    correctCount++;
    updateScore();
    spawnStar();
  } else {
    wrongCount++;
    spawnWrong();
  }
  currentLevel++;
  setTimeout(generateQuestion, 700);
}

function updateScore() {
  document.getElementById('score').textContent = `Score: ${score} ⭐`;
  document.getElementById('level').textContent = `Level: ${currentLevel}`;
}

function shuffleArray(arr) {
  for(let i = arr.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function spawnStar() {
  const star = document.createElement('div');
  star.className = 'star';
  star.textContent = '⭐';
  star.style.left = `${Math.random()*280}px`;
  document.querySelector('.container').appendChild(star);
  setTimeout(()=> star.remove(), 1000);
}

function spawnWrong() {
  const wrong = document.createElement('div');
  wrong.className = 'wrong';
  wrong.textContent = '❌';
  wrong.style.left = `${Math.random()*280}px`;
  document.querySelector('.container').appendChild(wrong);
  setTimeout(()=> wrong.remove(), 1000);
}

// Change lesson button with confirmation
document.getElementById('changeLesson').addEventListener('click', () => {
  const confirmChange = confirm("Are you sure you want to change the lesson?");
  if(confirmChange) {
    correctWrongDiv.innerHTML = `<p>✅ Correct Answers: ${correctCount}</p>
                                 <p>❌ Wrong Answers: ${wrongCount}</p>
                                 <p>Total Score: ${score} ⭐</p>`;
    correctWrongDiv.classList.remove('hidden');
    document.querySelector('.menu').classList.remove('hidden');
    document.querySelector('.game').classList.add('hidden');
  }
});
