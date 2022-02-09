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
const words = ['min', 'oct', 'None', 'format', 'frozenset', 'tuple', 'while', 'pass', 'breakpoint', 'if', 'reversed', 'bool', 'or', 'pow', 'finally', 'chr', 'globals', 'in', 'elif', 'round', 'issubclass', 'len', 'bytearray', 'print', 'break', 'Exception', 'filter', 'object', 'await', 'def', 'int', 'as', 'yield', 'eval', 'except', 'delattr', 'str', 'help', 'not', 'iter', '_', 'bytes', 'class', 'list', 'compile', 'float', 'slice', 'sum', 'sorted', 'del', 'abs', 'map', 'dir', 'for', 'hash', 'global', 'with', 'zip', 'exit', 'raise', 'async', 'set', 'divmod', 'import', 'else', 'dict', 'True', 'continue', 'nonlocal', 'is', 'return', 'isinstance', 'False', 'exec', 'assert', 'repr', 'setattr', 'and', 'ascii', 'complex', 'all', 'super', 'from', 'open', 'hex', 'lambda', 'quit', 'max', 'any', 'next', 'copyright', 'credits', 'range', 'id', 'ord', 'locals', 'try', 'bin', 'input', 'type'];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 180;

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
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
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

addWordToDOM();

// Typing Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 0;
    } else if (difficulty === "medium") {
      time += 0;
    } else {
      time += 0;
    }

//    updateTime();
  }
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
