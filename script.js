let order = [];
let playerOrder = [];
let flash; // int, keep track of number of flashes that hava appeared
let turn; //int, to keep track of turn
let good; //boolean, keep track of whether the player has made a mistake
let compTurn; //boolean, keep track of whether it is computer or player's turn
let playing = false; //added to check whether a game has been started and run check after color click
let intervalID;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const blueButton = document.querySelector("#blue");
const greenButton = document.querySelector("#green");
const yellowButton = document.querySelector("#yellow");
const redButton = document.querySelector("#red");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
//changes whether playing in strict mode or not
strictButton.addEventListener("click",(event) => {
  if(strictButton.checked == true) {
    strict = true;
  }
  else strict = false;
});
//turns on the game
onButton.addEventListener("click",(event) => {
  if(onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-"; //.innerHTML adds dash in turn counter
  }
  else {
    on = false;
    playing = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval();
  }
});
//starts the game
startButton.addEventListener("click",(event) => {
  if(on || win) {
    playing = true;
    play();
  }
});
//play function plays the sequence of colors
function play() {
  //reset variable for new game
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalID = 0;
  turn = 1;
  //change dash to the turn number
  turnCounter.innerHTML = turn;
  good = true;
  //fill order array with sequence of colors
  for(var i = 0; i<20; i++) {
    order.push(Math.floor(Math.random()*4));
  }
  compTurn = true;
  intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false; //to prevent player from clicking colors when flashing
  //check when colors are done flashing
  if(flash == turn)
  {
    clearInterval(intervalID);
    compTurn = false;
    clearColor();
    on = true;
  }
  else {
    clearColor();
    setTimeout(() => {
      if(order[flash] == 0) red();
      else if(order[flash] == 1) yellow();
      else if(order[flash] == 2) blue();
      else green();
      flash++;
    }, 200);
  }
}

function red() {
  if(noise) {
    let audio = document.querySelector("#clip1");
    audio.play();
  }
  redButton.style.backgroundColor = "#ea1616";
}

function yellow() {
  if(noise) {
    let audio = document.querySelector("#clip2");
    audio.play();
  }
  yellowButton.style.backgroundColor = "#ff1";
}

function blue() {
  if(noise) {
    let audio = document.querySelector("#clip3");
    audio.play();
  }
  blueButton.style.backgroundColor = "#1191ee";
}

function green() {
  if(noise) {
    let audio = document.querySelector("#clip4");
    audio.play();
  }
  greenButton.style.backgroundColor = "#1d1";
}

function clearColor() {
  greenButton.style.backgroundColor = "#0c0";
  blueButton.style.backgroundColor = "#0080dd";
  yellowButton.style.backgroundColor = "#ee0";
  redButton.style.backgroundColor = "#d90505";
}

function flashColor() {
  greenButton.style.backgroundColor = "#1d1";
  blueButton.style.backgroundColor = "#1191ee";
  yellowButton.style.backgroundColor = "#ff1";
  redButton.style.backgroundColor = "#ea1616";
}

redButton.addEventListener("click",(event) => {
  if(on) {
    playerOrder.push(0);
    if(playing) check()
    red();
    setTimeout(() => {
      clearColor();
    },300);
  }
});

yellowButton.addEventListener("click",(event) => {
  if(on) {
    playerOrder.push(1);
    if(playing) check()
    yellow();
    setTimeout(() => {
      clearColor();
    },300);
  }
});

blueButton.addEventListener("click",(event) => {
  if(on) {
    playerOrder.push(2);
    if(playing) check();
    blue();
    setTimeout(() => {
      clearColor();
    },300);
  }
});

greenButton.addEventListener("click",(event) => {
  if(on) {
    playerOrder.push(3);
    if(playing) check();
    green();
    setTimeout(() => {
      clearColor();
    },300);
  }
});

function check() {
  if(playerOrder[playerOrder.length-1] != order[playerOrder.length-1]) {
    good = false;
  }
  if(playerOrder.length == 20 && good) {
    winGame();
  }
  else if(!good) {
    flashColor();
    turnCounter.innerHTML = "NO";
    setTimeout(() => {
      clearColor();
      if(strict) {
        play();
      }
      else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalID = setInterval(gameTurn, 800);
      }
    },800);
  }
  else if(turn == playerOrder.length && !win) {
    turn++;
    compTurn = true;
    flash = 0;
    playerOrder = [];
    good = true;
    turnCounter.innerHTML = turn;
    intervalID = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN";
  on = false;
  win = true;
}
