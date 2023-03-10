const GameBoard = (() => {
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
})();

const Player = (name) => {
    console.log(name);
    return {name}
}
