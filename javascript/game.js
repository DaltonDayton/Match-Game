'use strict';

window.addEventListener('load', () => {
  // Load
  document.getElementById('startButton').onclick = playNow;
});

function playNow() {
  var numSymbols = parseInt(document.getElementById('numSymbols').value);

  // Set max to 8
  if (numSymbols > 8) {
    numSymbols = 8;
  }

  // Symbols
  var symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];

  // Hide Start Form
  document.getElementById('startForm').style.display = 'none';

  // Display Game Board
  generateGameBoard(numSymbols);
}

function generateGameBoard(num) {
  var numCards = num * 2;

  // Select the container for the gameboard
  var gameBox = document.getElementById('game');

  // Create the gameboard
  var gameBoard = document.createElement('div');
  gameBoard.setAttribute('id', 'gameBoard');
  gameBox.appendChild(gameBoard);

  // Create the squares
  for (let i = 0; i < numCards; i++) {
    var gameSquares = document.createElement('div');
    gameSquares.setAttribute('class', 'square');
    gameBoard.appendChild(gameSquares);
  }
}
