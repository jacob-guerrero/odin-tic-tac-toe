const GameBoard = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const endGame = () => {
    const spots = document.querySelectorAll(".spot");
    spots.forEach((spot) => {
      spot.style.pointerEvents = "none";
    });
  };

  const checkWin = () => {
    for (let i = 0; i < gameBoard.length; i += 1) {
      // Win Rows:
      if (
        gameBoard[i][0] !== "" &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        console.log("Win!");
        endGame();
      }
      // Win Columns:
      if (
        gameBoard[0][i] !== "" &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        console.log("Win!");
        endGame();
      }
    }
    // Win Crossed:
    if (
      gameBoard[0][0] !== "" &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      console.log("Win!");
      endGame();
    }
    if (
      gameBoard[0][2] !== "" &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[0][2] === gameBoard[2][0]
    ) {
      console.log("Win!");
      endGame();
    }
  };

  let playerMark = 1;
  let mark = "";
  const switchPlayer = () => {
    if (playerMark === 1) {
      mark = "X";
      playerMark = 0;
    } else {
      mark = "O";
      playerMark = 1;
    }
    return mark;
  };

  const addMark = (elem) => {
    elem.addEventListener("click", (e) => {
      console.log(e.target.dataset.index);
      console.log(e.target.textContent);

      let l = 0; // Counter index
      for (let j = 0; j < gameBoard.length; j += 1) {
        for (let k = 0; k < 3; k += 1) {
          if (l === +e.target.dataset.index && gameBoard[j][k] === "") {
            mark = switchPlayer();
            gameBoard[j][k] = mark;
            e.target.textContent = mark;
            checkWin();
            return;
          }
          l += 1;
        }
      }
    });
  };

  const showBoard = () => {
    let i = 0; // Dataset counter
    gameBoard.forEach((row) => {
      const container = document.querySelector(".container");
      const rows = document.createElement("div");
      rows.classList.add("row");
      container.appendChild(rows);

      row.forEach((value) => {
        const elem = document.createElement("div");
        elem.setAttribute("data-index", i);
        elem.classList.add("spot");
        elem.textContent = value;
        rows.appendChild(elem);

        addMark(elem);
        i += 1;
      });
    });
  };

  return { showBoard };
})();

const Player = (name) => {
  console.log(name);
  return { name };
};

GameBoard.showBoard();
const playerOne = Player("Jhon");
const playerTwo = Player("Doe");
