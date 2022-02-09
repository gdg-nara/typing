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
const words = ['min', 'oct', 'None', 'format', 'staticmethod', 'NotImplemented', 'ChildProcessError', 'license', 'frozenset', 'ImportWarning',  'tuple', 'while', 'pass', 'BufferError', 'breakpoint', 'TimeoutError', 'IOError', 'StopIteration', 'ConnectionAbortedError', 'if', 'TypeError', 'reversed', 'bool', 'ConnectionResetError', 'ZeroDivisionError', 'or', 'UnboundLocalError', 'UnicodeDecodeError', 'property', 'Ellipsis', 'SystemExit', 'pow', 'finally', 'chr', 'globals', 'in', 'NotImplementedError', 'elif', 'round', 'ProcessLookupError', 'issubclass', 'len', 'ConnectionError', 'RuntimeError', 'bytearray', 'UnicodeTranslateError', 'print', 'break', 'Exception', 'ModuleNotFoundError', 'filter', 'object', 'FileExistsError', 'hasattr', 'GeneratorExit', 'await', 'BrokenPipeError', 'EnvironmentError', 'def', 'int', 'BlockingIOError', 'LookupError', 'as', 'yield', 'enumerate', 'RecursionError', 'UnicodeEncodeError', 'eval', 'Warning', 'except', 'delattr', 'str', 'help', 'not', 'iter', 'ReferenceError', 'RuntimeWarning', 'callable', '__', 'StopAsyncIteration', 'bytes', 'class', 'EOFError', 'UserWarning', 'list', 'compile', 'SyntaxWarning', 'IndexError', 'float', 'slice', 'vars', 'BaseException', 'OSError', 'sum', 'UnicodeWarning', 'classmethod', 'FutureWarning', 'getattr', 'TabError', 'sorted', 'del', 'abs', 'ConnectionRefusedError', 'map', 'FileNotFoundError', 'dir', 'PermissionError', 'memoryview', 'ResourceWarning', 'MemoryError', 'for', 'hash', 'global', 'with', 'zip', 'exit', 'raise', 'async', 'set', 'InterruptedError', 'divmod', 'import', 'OverflowError', 'else', 'dict', 'True', 'continue', 'nonlocal', 'is', 'return', 'ValueError', 'UnicodeError', 'isinstance', 'False', 'exec', 'KeyboardInterrupt', 'assert', 'repr', 'SystemError', 'BytesWarning', 'NotADirectoryError', 'setattr', 'IsADirectoryError', 'IndentationError', 'ArithmeticError', 'and', 'ascii', 'complex', 'KeyError', 'all', 'FloatingPointError', 'super', 'from', 'ImportError', 'open', 'PendingDeprecationWarning', 'hex', 'lambda', 'AttributeError', 'quit', 'max', 'any', 'next', 'AssertionError', 'copyright', 'credits', 'range', 'id', 'DeprecationWarning', 'ord', 'SyntaxError', 'locals', 'try', 'bin', 'input', 'NameError', 'type'];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 120;

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
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
