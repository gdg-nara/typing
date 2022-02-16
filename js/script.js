function typing(language){

document.getElementById("playground").style.display = "";

// セレクタ
const symbol = document.getElementById("symbol");
const symbolDocs = document.getElementById("symbolDocs");
const text = document.getElementById("text");

document.getElementById("targetLanguage").style.display = "true";
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");

document.getElementById("menu").style.display ="none";

targetLanguage.innerText = language;

// Python
const Python = [
['abs','絶対値'], 
['all', '全て'],
['and', 'さらに'],
['any', 'どれか'],
['as', '〜として'],
['ascii', 'アスキー'],
['assert', 'アサート文の実行'],
['async', '非同期'],
['await', '非同期処理を待機'],
['bin', '2進数へ変換'],
['bool', '真偽値の判定'],
['break', 'ループを抜ける'],
['breakpoint', 'ブレイクポイントの設定'],
['bytearray', 'バイト配列へ変換する'],
['bytes', 'bytes型へ変換する'],
['chr', 'Unicode 文字に変換'],
['class', 'クラス'],
['compile', 'コンパイル'],
['complex', '複素数'],
['continue', '繰り返し処理を1つスキップする'],
['copyright', 'コピーライト'],
['credits', 'クレジット'],
['def', '自作関数の定義'],
['del', '削除'],
['delattr', '属性削除'],
['dict', '辞書の作成'],
['dir', '全ての属性を出す'],
['divmod', '整数の商と余りを出す'],
['elif', 'もし〜ならば'],
['else', 'でなければ'],
['eval', '文字列をコードとして実行する（文は不可）'],
['except', '例外'],
['exec', '文字列をコードとして実行する（文も可能）'],
['exit', 'REPLの処理を終了する'],
['filter', '条件に合う要素を抜き出す'],
['finally', '最後に'],
['float', '浮動小数点'],
['for', 'for 繰り返し'],
['format', '文字列内に変数値を埋め込む'],
['from', '読み込むモジュールの指定'],
['frozenset', ''],
['global', ''],
['globals', ''],
['hash', 'ハッシュ'],
['help', ''],
['hex', '16進数へ変換'],
['id', '変数の id を確認する'],
['if', ''],
['import', ''],
['in', 'リストやタプルなどに特定の要素が含まれるか判定'],
['input', 'インプット'],
['int', '整数にする'],
['is', '〜である'],
['isinstance', 'あるオブジェクトがサブクラスかを判定する'],
['issubclass', 'あるクラスがサブクラスかを判定する'],
['iter', 'イテレータへ変換する'],
['lambda', 'ラムダ式'],
['len', '長さ'],
['list', 'リスト'],
['locals', '定義されているローカル変数を返す'],
['map', '各値に関数を実行する'],
['max', '最大値を求める'],
['min', '最小値を求める'],
['next', '次'],
['nonlocal', 'nonlocal スコープ'],
['not', '〜でない'],
['object', 'オブジェクト'],
['oct', '8進数へ変換'],
['open', 'ファイルを開く'],
['or', 'または'],
['ord', '文字をUnicode値へ変換する'],
['pass', '何もしないときに(まだ未実装のときに)記述する'],
['pow', ''],
['print', '出力する'],
['quit', 'スクリプトを終了させる'],
['raise', ''],
['range', '連続した数値を生成する'],
['repr', 'コードの例を生成する'],
['return', '値を返す'],
['reversed', '要素を逆にする'],
['round', '四捨五入'],
['set', '集合型'],
['setattr', 'オブジェクトに属性を追加する'],
['slice', '部分選択・代入'],
['sorted', '並べ替え'],
['str', '文字列にする'],
['sum', '合計する'],
['super', '親クラスに関するオブジェクトを返す'],
['try', '例外が発生する可能性がある処理を実行する'],
['tuple', 'タプルにする'],
['type', '型を調べる'],
['while', '〜の間 繰り返す'],
['with', '特定の処理の前処理と後処理を設定する'],
['yield', 'ジェネレータで値を生成する'],
['zip', '複数のリストを同時に処理する'],
['Exception', '例外'],
['False', '偽'],
['None', '初期化がされていない状態'],
['True', '真'],
['_', '前の処理を呼び出す']
];

const Ruby = [
  ['def', '関数宣言'],
  ['map',''], 
  ['reduce', ''],
];

const JavaScript = [
  ['function', '関数'],
  ['if','もし'], 
  ['else', 'でなければ'],
];

const HTML = [
  ['div', ''],
  ['table',''], 
  ['head', ''],
];


let symbols = eval(language);

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

// 現在のワードを取得
function getCurrentWord() {
  currentWord = symbols[currentNumber][0];
  return currentWord
}

function getCurrentWordDocs() {
  currentWordDocs = symbols[currentNumber][1];
  return currentWordDocs
}


// DOMに単語を追加
function addWordToDOM() {
    let currentWord = getCurrentWord();
    symbol.innerHTML = currentWord;
    symbolDocs.innerHTML = getCurrentWordDocs();
    playWord(currentWord);

}

// スコアを更新
function updateScore() {
  score++;
  scoreElement.innerHTML = `${score} 点`;
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

// カウントダウン
const timeInterval = setInterval(updateTime, 1000);

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

}