const btn = document.querySelector('.btn');
const enterNum = document.getElementById('enterNum');
const btnNew = document.getElementById('newGame');
let countClik = 0;
let numberRandom;
let movesmain = 7;
let moves = movesmain;
let inputNum = 3;

// ***********  Статистика игры
const game = document.getElementById('game');
const wongame = document.getElementById('wongame');
const failgame = document.getElementById('failgame');
let gameCount = 0;
let wongameCount = 0;
let failgameCount = 0;
let wonprocent;
let failprocent;

// ***********  Переключатель сложности
let currentValue = 100;

function handleClick(myRadio) {
  console.log('New value: ' + myRadio.value);
  currentValue = Number(myRadio.value);

  fNew();

  // **********  Количество попыток
  switch (currentValue) {
    case 10:
      movesmain = 4;
      inputNum = 2;
      fNew();
      break;
    case 100:
      movesmain = 7;
      inputNum = 3;
      fNew();
      break;
    case 1000:
      movesmain = 10;
      inputNum = 4;
      fNew();
      break;
  }
}

//*****  деактивация кнопки
function fbtnOf() {
  btn.setAttribute('disabled', true);
  btn.style.backgroundColor = 'rgba(128, 128, 128, 0.4)';
}

// ****   Функция статистики
function f2() {
  failgameCount = Number(localStorage.getItem('fail'));
  wongameCount = Number(localStorage.getItem('won'));
  gameCount = failgameCount + wongameCount;
  game.innerHTML = `Сыграно игр: ${failgameCount + wongameCount}`;

  if (wongameCount === 0) {
    wonprocent = 0;
  } else {
    wonprocent = (100 * (wongameCount / gameCount)).toFixed(0);
  }

  if (failgameCount === 0) {
    failprocent = 0;
  } else {
    failprocent = ((failgameCount / gameCount) * 100).toFixed(0);
  }

  wongame.innerHTML = `Победы: ${Number(localStorage.getItem('won'))} = ${wonprocent}%`;
  failgame.innerHTML = `Поражения: ${Number(localStorage.getItem('fail'))} = ${failprocent}%`;
}
//****  Максимальное количество символов в поле ввода
function maxLengthCheck(object) {
  if (object.value.length > inputNum) object.value = object.value.slice(0, inputNum);
}

// ***********  Новая игра
function fNew() {
  // *****  показать кнопку
  btn.removeAttribute('disabled', true);
  btn.style.backgroundColor = '#7fffd4';
  numberRandom = Math.round(Math.random() * (currentValue - 1 + 1));
  countClik = 0;
  console.log('Random = ' + numberRandom);
  out.innerHTML = 'Введите число для начала игры';
  out.style.color = '#fcef38';
  enterNum.innerHTML = `Введите число от 1 до ${currentValue}`;
  moves = movesmain;
  f2();
  usernum.focus();
  usernum.value = '';
}

fNew();

function f1() {
  let userNumber = document.getElementById('usernum').value;
  let out = document.getElementById('out');

  usernum.value = '';
  usernum.focus();

  console.log(countClik);

  if (userNumber < 1 || userNumber > currentValue) {
    out.innerHTML = `Вы ввели неправильное значение. Введите число от 1 до ${currentValue}`;
    out.style.color = 'orange';
    countClik -= 1;
  } else if (numberRandom < userNumber) {
    console.log('Загаданное число меньше');
    out.innerHTML = `${userNumber} - это число больше загаданного. Попробуй еще. Осталось попыток: ${
      moves - 1 - countClik
    }`;
    out.style.color = '#fcef38';
  } else if (numberRandom > userNumber) {
    console.log('Загаданное число больше');
    out.innerHTML = `${userNumber} - это число меньше загаданного. Попробуй еще. Осталось попыток: ${
      moves - 1 - countClik
    }`;
    out.style.color = '#fcef38';
  } else {
    console.log('Вы выиграли');
    out.innerHTML = `Вы выиграли!!!!! Количество ходов ${countClik + 1}`;
    out.style.color = '#7fff00';
    fbtnOf();
    wongameCount++;
    moves = 0; //для блокиловки работы клавиши Enter

    localStorage.setItem('won', wongameCount); //запись в куки

    f2();
  }

  countClik++;

  if (moves - countClik === 0 && numberRandom === userNumber) {
    console.log('Вы выиграли');
    out.innerHTML = `Вы выиграли!!!!! Количество ходов ${countClik + 1}`;
    out.style.color = '#7fff00';

    fbtnOf();

    wongameCount++;
    moves = 0; //для блокиловки работы клавиши Enter
    localStorage.setItem('won', wongameCount); //запись в куки

    f2();
  } else if (moves - countClik === 0 && numberRandom != userNumber) {
    out.innerHTML = `Вы проиграли :( Загаданное число - ${numberRandom} -`;
    out.style.color = '#FF6666';

    fbtnOf();
    failgameCount += 1;
    console.log(failgameCount);

    localStorage.setItem('fail', failgameCount); //запись в куки
    f2();
  }
}
// *********** ENTER ******
function clickPress(event) {
  if (event.keyCode == 13) {
    if (moves - countClik > 0) {
      f1();
    }
  }
}
//запись в куки
function stat() {
  localStorage.setItem('fail', 0);
  localStorage.setItem('won', 0);
  f2();
}
