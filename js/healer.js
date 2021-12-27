const enterNum = document.getElementById('enterNum');
const btnNew = document.getElementById('newGame');
const btnClick = document.getElementById('btnClick');
const usernum = document.getElementById('usernum');
const words = [
  'амазонка',
  'нил',
  'миссисипи',
  'янцзы',
  'хуанхэ',
  'енисей',
  'лена',
  'луалаба',
  'днепр',
  'псёл',
  'днестр',
  'горинь',
  'десна',
  'ингулец',
  'ворскла',
  'случ',
  'стыр',
  'тетерев',
  'сула',
  'ингул',
  'рось',
  'самара',
  'прут',
  'тиса',
  'припять',
  'айдар',
  'сейм',
  'збруч',
  'серет',
  'стрий',
  'оскол',
  'дунай',
  'дон',
];
let guess;
let word = [];
let answerArray = [];
let remainingLetters = 0;

enterNum.innerHTML = 'Для начала игры нажмите <br>"Новая игра".';

btnOff();
newGame.focus();

function fNew() {
  word = [];
  answerArray = [];
  word = words[Math.floor(Math.random() * words.length)];

  // Создаем итоговый массив
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = '_';
  }
  remainingLetters = word.length;
  // console.log(answerArray);
  enterNum.innerHTML = `Угадайте букву,<br> ${answerArray.join(' ')}`;
  usernum.value = '';
  usernum.focus();
  btnOn();
}

function f1() {
  guess = document.getElementById('usernum').value.toLowerCase();
  // console.log(guess);

  usernum.value = '';
  usernum.focus();

  if (answerArray.includes(guess)) {
    enterNum.innerHTML = `Такая буква уже была "${guess}"<br> ${answerArray.join(' ')}`;
    // console.log(remainingLetters);
  } else if (guess.length !== 1) {
    enterNum.innerHTML = `Введите одиночную букву. <br> ${answerArray.join(' ')}`;
  } else if (!word.includes(guess)) {
    enterNum.innerHTML = `Такой буквы нет "${guess}" <br> ${answerArray.join(' ')}`;
    // console.log(remainingLetters);
  } else if (guess.length === 1 && remainingLetters === 1) {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === guess) {
        answerArray[j] = guess;
        remainingLetters--;
        enterNum.innerHTML = `Отлично! Было загадано слово "${word}"`;
        // console.log(remainingLetters);
        btnOff();
        newGame.focus();
      }
    }
  } else if (guess.length === 1) {
    // Обновляем состояние игры
    for (let j = 0; j < word.length; j++) {
      if (word[j] === guess) {
        answerArray[j] = guess;
        remainingLetters--;
        enterNum.innerHTML = `Вы ввели букву "${guess}" <br> ${answerArray.join(' ')}`;
        // console.log(remainingLetters);
      }
    }
  }
}
// Скрываем кнопку и поле ввода
function btnOff() {
  btnClick.classList.add('is-visible');
  usernum.classList.add('is-visible');
}
// Показываем кнопку и поле ввода
function btnOn() {
  btnClick.classList.remove('is-visible');
  usernum.classList.remove('is-visible');
}

// *********** ENTER ******
function clickPress(event) {
  if (event.keyCode == 13) {
    f1();
  }
}
