// セレクタ
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");

// 課題の単語
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

// スタート時のテキストにフォーカス
text.focus();

// カウントダウン
const timeInterval = setInterval(updateTime, 1000);

// 現在のワードを取得
function getCurrentWord() {
  currentWord = words[currentNumber];
  return currentWord
}

// DOMに単語を追加
function addWordToDOM() {
    currentWord = getCurrentWord();
    word.innerHTML = currentWord;
    playWord(currentWord);
}

// スコアを更新
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// 時間を更新
function updateTime() {
  time--;
  timeElement.innerHTML = time + "秒";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameElement.innerHTML = `
  <h1>タイムオーバー</h1>
  <p>得点は  ${score} です。</p>
  <button onclick="location.reload()" style="
  background: #4e5e73; color: #fff;">もう一度挑戦する</button>
    `;

  endGameElement.style.display = "flex";
}

function gameClear() {
  endGameElement.innerHTML = `<h1>ゲームクリア！！</h1>`;
  endGameElement.style.display = "flex";
}

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


addWordToDOM();