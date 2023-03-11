const GameBoard = (() => {
  let gameBoard = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const showBoard = () => {
    gameBoard.forEach((row) => {
      const container = document.querySelector(".container");
      const rows = document.createElement("div");
      rows.classList.add("row");
      container.appendChild(rows);
      row.forEach((value) => {
        const elem = document.createElement("div");
        elem.classList.add("spot");
        elem.textContent = value;
        rows.appendChild(elem);
      });
      // const showIt = document.querySelector("p");
      // showIt.textContent() = value;
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
