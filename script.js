const GameBoard = (() => {
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const showBoard = () => {
    gameBoard.forEach((value) => {
      const container = document.querySelector(".container");
      const elem = document.createElement("p");
      elem.textContent = value;
      container.appendChild(elem);
      // const showIt = document.querySelector("p");
      // showIt.textContent() = value;
    });
  };
  return {showBoard}
})();

const Player = (name) => {
  console.log(name);
  return { name };
};

GameBoard.showBoard();