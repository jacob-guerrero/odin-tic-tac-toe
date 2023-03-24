// Factory Function to create players:
const Player = (name) => {
  console.log(name);
  return { name };
};

// Module pattern to create the game:
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
    if (
      playerMark === 0 &&
      document.querySelector('[data-index="0"]').style.pointerEvents === "none"
    ) {
      console.log("player1 Wins!");
    } else {
      console.log("player2 Wins!");
    }
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

    // Tie:
    let fullCounter = 0;
    gameBoard.forEach((cell) => {
      cell.forEach((value) => {
        if (value !== "") {
          fullCounter += 1;
        }
      });
      if (
        fullCounter === 9 &&
        document.querySelector('[data-index="0"]').style.pointerEvents !==
          "none"
      ) {
        console.log("Tie!");
        const spots = document.querySelectorAll(".spot");
        spots.forEach((spot) => {
          spot.style.pointerEvents = "none";
        });
      }
    });
  };

  // Switch Player
  let playerMark = 0;
  let mark = "";
  const switchPlayer = () => {
    if (playerMark === 1) {
      mark = "X";
      playerMark = 0;
      console.log("Player 2 turn");
    } else {
      mark = "O";
      playerMark = 1;
      console.log("Player 1 turn");
    }
    return mark;
  };

  const addMark = (elem) => {
    elem.addEventListener("click", (e) => {
      // console.log(e.target.dataset.index);
      // console.log(e.target.textContent);

      let l = 0; // Index counter
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

      const span = document.createElement("span");
      rows.appendChild(span);

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

  const startGame = () => {
    const button = document.querySelector(".start-reset");
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    button.addEventListener("click", () => {
      if (button.textContent === "Start") {
        if (player1.value === "") {
          player1.value = "Player1";
        }
        if (player2.value === "") {
          player2.value = "Player2";
        }
        showBoard();
        switchPlayer();
      }

      // Reset values
      if (button.textContent === "Reset") {
        for (let i = 0; i < gameBoard.length; i += 1) {
          for (let j = 0; j < 3; j += 1) {
            gameBoard[i][j] = "";
          }
        }

        const spots = document.querySelectorAll("[data-index]");
        spots.forEach((spot) => {
          spot.textContent = "";
          spot.style.pointerEvents = "auto";
        });

        playerMark = 1;
      }

      const playerOne = Player(player1.value);
      const playerTwo = Player(player2.value);

      button.textContent = "Reset";
    });
  };

  return { startGame };
})();

GameBoard.startGame();
