// PAGE SWITCH
function openColorGame(){
  document.getElementById("home").style.display = "none";
  document.getElementById("colorGame").style.display = "block";
  newRound();
}

function goHome(){
  document.getElementById("home").style.display = "block";
  document.getElementById("colorGame").style.display = "none";
}

// COLOR DATA
let colors = ["red","blue","yellow","green","orange","purple","pink","brown","black","white"];
let previous = "";
let answer = "";
let score = 0;

// CREATE BUTTONS DYNAMICALLY
function createButtons(){
  let container = document.getElementById("colorButtons");
  container.innerHTML = "";

  // shuffle array
  let shuffled = [...colors].sort(() => Math.random()-0.5);

  shuffled.forEach(color => {
    let btn = document.createElement("button");
    btn.className = "colorBtn";
    btn.style.background = color;
    btn.onclick = () => checkColor(color);
    container.appendChild(btn);
  });
}

// NEW ROUND
function newRound(){
  do{
    answer = colors[Math.floor(Math.random()*colors.length)];
  } while(answer === previous);

  previous = answer;

  document.getElementById("instruction").innerText = "Click the color: " + answer.toUpperCase();
  document.getElementById("result").innerText = "";

  createButtons();
}

// CHECK ANSWER
function checkColor(choice){
  if(choice === answer){
    document.getElementById("result").innerText = "Correct! 🎉";
    score++;
    document.getElementById("score").innerText = score;
  } else {
    document.getElementById("result").innerText = "Try again 🙂";
  }
}