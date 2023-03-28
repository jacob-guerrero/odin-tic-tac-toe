// Factory Function to create players:
const Player = (name) => {
  let numWin = 0;
  const addWin = () => numWin++;
  const getWins = () => numWin;

  return { name, addWin, getWins };
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
      document.querySelector(
        ".play-turn"
      ).textContent = `${playerOne.name} Wins!`;
      // console.log(`${playerOne.name} Wins!`);
      playerOne.addWin();
      document.querySelector(".scoreP1").textContent = playerOne.getWins();
      // console.log(playerOne.getWins());
    } else {
      document.querySelector(
        ".play-turn"
      ).textContent = `${playerTwo.name} Wins!`;
      // console.log(`${playerTwo.name} Wins!`);
      playerTwo.addWin();
      document.querySelector(".scoreP2").textContent = playerTwo.getWins();
      // console.log(playerTwo.getWins());
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

        // Add row strikethrough
        const span = document.createElement("span");
        span.classList.add("strikethrough");
        document.getElementsByClassName("row")[i].prepend(span);

        endGame();
        return;
      }
      // Win Columns:
      if (
        gameBoard[0][i] !== "" &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        console.log("Win!");

        // Add column strikethrough
        const span = document.createElement("span");
        span.classList.add("strikethrough-ver");
        span.classList.add(`strikethrough-ver${i}`);
        document.querySelector(".container").prepend(span);

        endGame();
        return;
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
        document.querySelector(".play-turn").textContent = `It's a Tie!`;
        // console.log("Tie!");
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
      document.querySelector(
        ".play-turn"
      ).textContent = `${playerTwo.name} turn`;
      // console.log(`${playerTwo.name} turn`);
    } else {
      mark = "O";
      playerMark = 1;
      document.querySelector(
        ".play-turn"
      ).textContent = `${playerOne.name} turn`;
      // console.log(`${playerOne.name} turn`);
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

  const changeElements = (name1, name2) => {
    const player1 = document.querySelector(".name1");
    const player2 = document.querySelector(".name2");
    const nameP1 = document.createElement("p");
    const scoreP1 = document.createElement("p");
    const nameP2 = document.createElement("p");
    const scoreP2 = document.createElement("p");
    nameP1.classList.add("nameP1");
    nameP2.classList.add("nameP2");
    scoreP1.classList.add("scoreP1");
    scoreP2.classList.add("scoreP2");

    nameP1.textContent = name1;
    nameP2.textContent = name2;
    scoreP1.textContent = "0";
    scoreP2.textContent = "0";

    player1.replaceChildren(nameP1, scoreP1);
    player2.replaceChildren(nameP2, scoreP2);
  };

  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const startGame = () => {
    const button = document.querySelector(".start-reset");
    button.addEventListener("click", () => {
      if (button.textContent === "Start") {
        if (player1.value === "") {
          player1.value = "Player1";
          playerOne.name = player1.value;
        } else {
          playerOne.name = player1.value;
        }
        if (player2.value === "") {
          player2.value = "Player2";
          playerTwo.name = player2.value;
        } else {
          playerTwo.name = player2.value;
        }

        document.querySelector(".container").classList.add("smooth-show");
        document.querySelector(".name1").classList.add("smooth-show");
        document.querySelector(".name2").classList.add("smooth-show");
        document.querySelector(".play-turn").classList.add("smooth-show");

        changeElements(playerOne.name, playerTwo.name);
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

        document.querySelector(
          ".play-turn"
        ).textContent = `${playerOne.name} turn`;
        playerMark = 1;

        if (document.querySelector(".strikethrough")) {
          document.querySelector(".strikethrough").remove();
        } else if (document.querySelector(".strikethrough-ver")) {
          document.querySelector(".strikethrough-ver").remove();
        }

        document.querySelector(".container").classList.remove("smooth-show");
        void document.querySelector(".container").offsetWidth;
        document.querySelector(".container").classList.add("smooth-show");
        document.querySelector(".play-turn").classList.remove("smooth-show");
        void document.querySelector(".play-turn").offsetWidth;
        document.querySelector(".play-turn").classList.add("smooth-show");
      }

      button.textContent = "Reset";
    });
  };

  // Create players:
  const playerOne = Player(player1.value);
  const playerTwo = Player(player2.value);

  return { startGame };
})();

GameBoard.startGame();
