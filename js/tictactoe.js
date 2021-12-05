const area = document.getElementById('area');
let wonXp = document.getElementById('wonx');
const wonOp = document.getElementById('wono');
const newgame = document.getElementById('newgame');

const title1 = document.getElementById('title1');
const title2 = document.getElementById('title2');

const game = document.getElementById('game');
const result = document.getElementById('result');
const resetBtn = document.getElementById('reset');
const huPlayer = 'X',
  huPlayer1 = 'O';
let move = 0;
const circle = `<svg class="circle"><circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round" /></svg>`;
const cross = `<svg class="cross"><line class="first" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
		    <line class="second" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" /></svg>`;
let wonX = 0;
let wonO = 0;
/**
 * Основной класс
 */
class Game {
  /**
   *
   * @param {Number} size - длина доски
   */
  constructor(size = 3) {
    this.size = size;
    this.turn = Math.floor(Math.random() * 2); // рандомно выбираем первый ход
    this.turnCount = 0; // учет кол-ва ходов

    // сбрасывает текущее состояние игры
    resetBtn.addEventListener('click', () => {
      this.resetGame();
    });

    this.cellList = []; // сюда пихаем дом элементы
    this.resetGame();
  }

  // делаем удобный геттер
  get limit() {
    return this.size * this.size;
  }

  // создаем клетки, биндим обработчик нажатия и закидываем в массив
  init() {
    for (let i = 0; i < this.limit; i++) {
      const cell = document.createElement('button'); //**** */
      cell.setAttribute('data-id', i);
      // move++;
      // if (move % 2 === 0) {
      //   cell.addEventListener('click', this.humanPlay());
      //   console.log(move);
      // } else {
      //   cell.addEventListener('click', this.humanPlay1());

      //   console.log(move);
      // }
      cell.addEventListener('click', e => {
        if ((e.target.className = 'btn-game')) {
          if (move % 2 === 0) {
            // e.target.innerHTML = cross;
            // e.target.classList.add('x');
            // ********************************************************
            const idx = e.target.getAttribute('data-id');
            this.turnCount += 1;
            this.board[+idx] = huPlayer;
            this.cellList[+idx].innerHTML = cross;
            this.cellList[+idx].setAttribute('disabled', true);
            if (this.turnCount >= this.limit) {
              result.innerHTML = '<h4>Ничья!</h4>';
              return;
            }
            if (this.checkWinner(this.board, huPlayer)) {
              this.disabledBtn();

              wonX++;
              wonXp.innerHTML = wonX;
              title2.innerHTML = 'Победа!!!';
              // result.innerHTML = '<h4>Вы выиграли!!!</h4>';

              return;
            }
            // ****************************************************************
          } else {
            // e.target.innerHTML = circle;
            // e.target.classList.add('o');
            const idx = e.target.getAttribute('data-id');
            this.turnCount += 1;
            this.board[+idx] = huPlayer1;
            this.cellList[+idx].innerHTML = circle;
            this.cellList[+idx].setAttribute('disabled', true);
            if (this.turnCount >= this.limit) {
              result.innerHTML = '<h4>Ничья!</h4>';
              return;
            }
            if (this.checkWinner(this.board, huPlayer1)) {
              this.disabledBtn();
              // result.innerHTML = '<h4>Вы выиграли5!!!</h4>';
              wonO++;
              wonOp.innerHTML = wonO;
              title1.innerHTML = 'Победа!!!';
              return;
            }
          }

          move++;
          // this.check();
          // console.log(result);
        }
      });
      game.appendChild(cell);
      this.cellList.push(cell);
    }
  }

  resetGame() {
    this.board = [...Array(this.limit).keys()];
    result.innerHTML = '';
    game.innerHTML = '';
    this.turnCount = 0;
    this.cellList = [];
    this.init();
    move = 0;
    title2.innerHTML = '';
    title2.innerHTML = '';
  }
  // check() {
  //   const board = document.getElementsByClassName('btn-game');
  //   const arr = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];

  //   for (let i = 0; i < arr.length; i++) {
  //     if (
  //       board[arr[i][0]].classList.contains('x') &&
  //       board[arr[i][1]].classList.contains('x') &&
  //       board[arr[i][2]].classList.contains('x')
  //     ) {
  //       wonX++;
  //       wonXp.innerHTML = wonX;
  //       // prepareResult(result);
  //       result = 'крестики';
  //       return;
  //     } else if (
  //       board[arr[i][0]].classList.contains('o') &&
  //       board[arr[i][1]].classList.contains('o') &&
  //       board[arr[i][2]].classList.contains('o')
  //     ) {
  //       result = 'нолики';
  //       console.log(result);
  //       wonO++;
  //       wonOp.innerHTML = wonO;
  //       // prepareResult(result);
  //       return;
  //     }
  //   }
  // }

  // humanPlay() {
  //   return e => {
  //     this.turnCount += 1;
  //     const idx = e.target.getAttribute('data-id');
  //     // const bestMove = 1;
  //     this.board[+idx] = huPlayer;
  //     this.cellList[+idx].innerHTML = cross;
  //     this.cellList[+idx].setAttribute('disabled', true);
  //     if (this.turnCount >= this.limit) {
  //       result.innerHTML = '<h4>Ничья!</h4>';
  //       return;
  //     }
  //     if (this.checkWinner(this.board, huPlayer)) {
  //       this.disabledBtn();
  //       result.innerHTML = '<h4>Вы выиграли!!!</h4>';

  //       return;
  //     }
  //     // this.makeAiTurn();
  //     // humanPlay1();
  //   };
  // }

  // humanPlay1() {
  //   return e => {
  //     this.turnCount += 1;
  //     const id = e.target.getAttribute('data-id');
  //     this.board[+id] = huPlayer1;
  //     this.cellList[+id].innerHTML = circle;
  //     this.cellList[+id].setAttribute('disabled', true);
  //     if (this.turnCount >= this.limit) {
  //       result.innerHTML = '<h4>Ничья!</h4>';
  //       return;
  //     }
  //     if (this.checkWinner(this.board, huPlayer1)) {
  //       this.disabledBtn();
  //       result.innerHTML = '<h4>Вы выиграли1!!!</h4>';
  //       // wonO++;
  //       // wonOp.innerHTML = wonO;
  //       return;
  //     }
  //     // this.makeAiTurn();
  //     // humanPlay();
  //   };
  // }

  // makeAiTurn() {
  //   this.turnCount += 1;
  //   const bestMove = this.minimax(this.board, aiPlayer);
  //   this.board[bestMove.idx] = aiPlayer;
  //   this.cellList[bestMove.idx].innerHTML = cross;
  //   this.cellList[bestMove.idx].setAttribute('disabled', true);
  //   if (this.turnCount >= this.limit) {
  //     result.innerHTML = '<h4>Ничья!</h4>';
  //     return;
  //   }
  //   if (this.checkWinner(this.board, aiPlayer)) {
  //     this.disabledBtn();
  //     result.innerHTML = '<h4>Вы проиграли!</h4>';
  //     return;
  //   }
  // }
  disabledBtn() {
    for (let i = 0; i < 9; i++) {
      this.cellList[i].setAttribute('disabled', true);
    }
  }
  checkWinner(board, player) {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    }
    return false;
  }

  findEmptyCells(board) {
    return board.filter(c => c !== huPlayer && c !== aiPlayer);
  }
}

new Game();
