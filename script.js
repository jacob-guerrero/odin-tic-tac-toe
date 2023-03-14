const GameBoard = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

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
  }

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
