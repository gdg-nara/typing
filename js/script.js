// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

// list of words for game
const words = ['abs', 'all', 'and', 'any', 'as', 'ascii', 'assert', 'async', 'await', 'bin', 'bool', 'break', 'breakpoint', 'bytearray', 'bytes', 'chr', 'class', 'compile', 'complex', 'continue', 'copyright', 'credits', 'def', 'del', 'delattr', 'dict', 'dir', 'divmod', 'elif', 'else', 'eval', 'except', 'exec', 'exit', 'filter', 'finally', 'float', 'for', 'format', 'from', 'frozenset', 'global', 'globals', 'hash', 'help', 'hex', 'id', 'if', 'import', 'in', 'input', 'int', 'is', 'isinstance', 'issubclass', 'iter', 'lambda', 'len', 'list', 'locals', 'map', 'max', 'min', 'next', 'nonlocal', 'not', 'object', 'oct', 'open', 'or', 'ord', 'pass', 'pow', 'print', 'quit', 'raise', 'range', 'repr', 'return', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'str', 'sum', 'super', 'try', 'tuple', 'type', 'while', 'with', 'yield', 'zip','Exception', 'False', 'None', 'True', '_', ];

// 現在の単語
var currentWord = "";

// 現在の問題番号
var currentNumber = 0;

// Init score
let score = 0;

// Init time
let time = 180;

// player
const player = new talkify.Html5Player();
player.forceLanguage('en');
player.setRate(0.7);

function playWord(word){
  player.playText(word);
}

// Set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on text on start
text.focus();

// count down
const timeInterval = setInterval(updateTime, 1000);

// Random words generator from Array
function getCurrentWord() {
  //
  currentWord = words[currentNumber];
  return currentWord
}

// add word to DOM
function addWordToDOM() {
    currentWord = getCurrentWord();
    word.innerHTML = currentWord;
    playWord(currentWord);
}

// update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + "秒";

  if (time === 0) {
    clearInterval(timeInterval);

    //   game over
    gameOver();
  }
}

// show Game over
function gameOver() {
  endGameElement.innerHTML = `
  <h1>タイムオーバー</h1>
  <p>得点は  ${score} です。</p>
  <button onclick="location.reload()" style="
  background: #4e5e73; color: #fff;">もう一度挑戦する</button>
    `;

  endGameElement.style.display = "flex";
}

// show Game over
function gameClear() {
  endGameElement.innerHTML = `
  <h1>ゲームクリア！！</h1>`;
  endGameElement.style.display = "flex";
}

// Typing Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  
  if (insertedText === currentWord) {

    if(currentNumber <= 98){
      currentNumber = currentNumber + 1;
    } else {
      gameClear();
    }

    addWordToDOM();
    updateScore();

    e.target.value = "";
  }
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

addWordToDOM();