const game = document.getElementById("game");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset");
const aiPlayer = "X",
  huPlayer = "O";

const circle = `<svg class="circle"><circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round" /></svg>`;
const cross = `<svg class="cross"><line class="first" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
		    <line class="second" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" /></svg>`;

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
    resetBtn.addEventListener("click", () => {
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
      const cell = document.createElement("button"); //**** */
      cell.setAttribute("data-id", i);
      cell.addEventListener("click", this.humanPlay());
      game.appendChild(cell);
      this.cellList.push(cell);
    }
  }

  resetGame() {
    this.board = [...Array(this.limit).keys()];
    result.innerHTML = "";
    game.innerHTML = "";
    this.turnCount = 0;
    this.cellList = [];
    this.init();
  }

  humanPlay() {
    return (e) => {
      this.turnCount += 1;
      const id = e.target.getAttribute("data-id");
      this.board[+id] = huPlayer;
      this.cellList[+id].innerHTML = circle;
      this.cellList[+id].setAttribute("disabled", true);
      if (this.turnCount >= this.limit) {
        result.innerHTML = "<h4>Ничья!</h4>";
        return;
      }
      if (this.checkWinner(this.board, huPlayer)) {
        this.disabledBtn();
        result.innerHTML = "<h4>Вы выиграли!!!</h4>";
        return;
      }
      this.makeAiTurn();
    };
  }
  disabledBtn() {
    for (let i = 0; i < 9; i++) {
      this.cellList[i].setAttribute("disabled", true);
    }
  }

  makeAiTurn() {
    this.turnCount += 1;
    const bestMove = this.minimax(this.board, aiPlayer);
    this.board[bestMove.idx] = aiPlayer;
    this.cellList[bestMove.idx].innerHTML = cross;
    this.cellList[bestMove.idx].setAttribute("disabled", true);
    if (this.turnCount >= this.limit) {
      result.innerHTML = "<h4>Ничья!</h4>";
      return;
    }
    if (this.checkWinner(this.board, aiPlayer)) {
      this.disabledBtn();
      result.innerHTML = "<h4>Вы проиграли!</h4>";
      return;
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

  minimax(board, player) {
    const emptyCells = this.findEmptyCells(board);
    if (this.checkWinner(board, huPlayer)) {
      return { score: -1 };
    } else if (this.checkWinner(board, aiPlayer)) {
      return { score: 1 };
    } else if (emptyCells.length === 0) {
      return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < emptyCells.length; i++) {
      let move = [];
      board[emptyCells[i]] = player;
      move.idx = emptyCells[i];
      if (player === huPlayer) {
        const payload = this.minimax(board, aiPlayer);
        move.score = payload.score;
      }
      if (player === aiPlayer) {
        const payload = this.minimax(board, huPlayer);
        move.score = payload.score;
      }
      board[emptyCells[i]] = move.idx;
      moves.push(move);
    }

    let bestMove = null;

    if (player === aiPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  findEmptyCells(board) {
    return board.filter((c) => c !== huPlayer && c !== aiPlayer);
  }
}

new Game();
