const GameBoard = (() => {
  let gameBoard = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
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

        elem.addEventListener("click", (e) => {
          console.log(e.target.dataset.index);
          console.log(e.target.textContent);

          let l = 0; // Counter index
          for (let j = 0; j < gameBoard.length; j += 1) {
            for (let k = 0; k < 3; k += 1) {
              if (l === +e.target.dataset.index && gameBoard[j][k] === 0) {
                gameBoard[j][k] = "X";
                e.target.textContent = "X";
                return;
              }
              l += 1;
            }
          }
        });
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
