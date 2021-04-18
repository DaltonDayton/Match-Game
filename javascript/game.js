'use strict';

window.addEventListener('load', () => {
  // Load
  document.getElementById('startButton').onclick = playNow;
});

// Starts the game
function playNow() {
  var numSymbols = parseInt(document.getElementById('numSymbols').value);

  // Set max to 8
  if (numSymbols > 8) {
    numSymbols = 8;
  }

  // Hide Start Form
  // document.getElementById('startForm').style.display = 'none';

  // Display Game Board
  generateGameBoard(numSymbols);
}

// Generates the game board and assigns symbols
function generateGameBoard(num) {
  var numCards = num * 2;
  var symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];

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

  // Select random numbers from 1 to numCards
  // Create array and fill with numbers up to card limit
  var cardCountNums = [];
  for (let i = 0; i < numCards; i++) {
    cardCountNums.push(i);
  }

  // Shuffle the numbers using the Fisher-Yates shuffle
  for (
    var j, x, i = cardCountNums.length;
    i;
    j = parseInt(Math.random() * i),
      x = cardCountNums[--i],
      cardCountNums[i] = cardCountNums[j],
      cardCountNums[j] = x
  );

  // Select each symbol twice and insert into the grid
  var cardCounter = 0;
  for (let i = 1; i < symbols.length + 1; i++) {
    document.getElementById('gameBoard').children[
      cardCountNums[cardCounter]
    ].innerText = symbols[i - 1];
    cardCounter++;
    for (let j = i - 1; j < i; j++) {
      document.getElementById('gameBoard').children[
        cardCountNums[cardCounter]
      ].innerText = symbols[j];
      cardCounter++;
    }
  }
}
