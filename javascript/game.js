'use strict';

// TODO: Keep track of the number of flip pairs
//       Create an element that shows you the number of guesses
//       Add a guess after every two cards are flipped
// TODO: Update Flip Animation to something better

window.addEventListener('load', () => {
  document.getElementById('startButton').onclick = playNow;

  // ------- REMOVE -------
  // default symbol count
  // document.getElementById('numSymbols').value = 8;
  // play
  // playNow();
  // ----------------------
});

// Starts the game
function playNow() {
  // Clicked Squares
  window.clickedSquares = [];
  // Matched Squares
  window.matchedSquares = [];

  var numSymbols = parseInt(document.getElementById('numSymbols').value);

  // Set max to 8
  if (numSymbols > 8) {
    numSymbols = 8;
  }

  // Set min to 1
  if (numSymbols <= 0) {
    numSymbols = 1;
  }

  // Hide Start Form
  document.getElementById('startForm').style.display = 'none';

  // Display Game Board
  generateGameBoard(numSymbols);
}

// Generates the game board and assigns symbols
function generateGameBoard(num) {
  window.numCards = num * 2;
  var symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];

  // Select the container for the gameboard
  var gameBox = document.getElementById('game');

  // Create the gameboard
  var gameBoard = document.createElement('div');
  gameBoard.setAttribute('id', 'gameBoard');
  gameBox.appendChild(gameBoard);

  // Create the squares
  for (i = 0; i < numCards; i++) {
    var gameSquares = document.createElement('div');
    gameSquares.setAttribute('class', 'square');
    gameSquares.setAttribute('id', i);
    gameBoard.appendChild(gameSquares);
  }

  // Select random numbers from 1 to numCards
  // Create array and fill with numbers up to card limit
  var cardCountNums = [];
  for (i = 0; i < numCards; i++) {
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
  for (i = 1; i < symbols.length + 1; i++) {
    // breaks out of the loop when max num of symbols is reached
    if (cardCountNums.length == cardCounter) break;

    document.getElementById('gameBoard').children[
      cardCountNums[cardCounter]
    ].innerHTML = '<div>' + symbols[i - 1] + '</div>';
    cardCounter++;
    for (j = i - 1; j < i; j++) {
      document.getElementById('gameBoard').children[
        cardCountNums[cardCounter]
      ].innerHTML = '<div>' + symbols[j] + '</div>';
      cardCounter++;
    }
  }

  console.log(numCards);
  if (numCards === 4) {
    document.getElementById('gameBoard').setAttribute('style', 'width: 200px');
  }

  addSquareEventListener();
}

function cardFlip(e) {
  // If number of cards hasn't hit 2, allow a click
  if (clickedSquares.length <= 1) {
    // Check if card is already clicked

    if (!clickedSquares.includes(e.target.id)) {
      e.target.children[0].classList.toggle('showSquare');
      clickedSquares.push(e.target.id);
    }
  }

  // If number of active cards is 2: wait 1 second, toggle display, clear cards
  if (clickedSquares.length > 1) {
    // Disable ability to click
    removeSquareEventListener();

    // Check if match
    var matchCheckOne = document.getElementById(clickedSquares[0]).innerText;
    var matchCheckTwo = document.getElementById(clickedSquares[1]).innerText;
    if (matchCheckOne === matchCheckTwo) {
      matchedSquares.push(clickedSquares[0]);
      matchedSquares.push(clickedSquares[1]);

      // Check for win
      if (matchedSquares.length === numCards) {
        win();
      }

      // Clear the Array
      clickedSquares.splice(0, clickedSquares.length);
      addSquareEventListener();
    } else {
      // Wait 1 second
      setTimeout(() => {
        // Toggle the Classes
        for (let i = 0; i < clickedSquares.length; i++) {
          document
            .getElementById(clickedSquares[i])
            .children[0].classList.toggle('showSquare');
        }
        // Clear the Array
        clickedSquares.splice(0, clickedSquares.length);
        addSquareEventListener();
      }, 500);
    }
  }
}

function addSquareEventListener() {
  var allSquares = document.getElementById('gameBoard').children;
  for (let i = 0; i < allSquares.length; i++) {
    allSquares[i].addEventListener('click', (e) => {
      cardFlip(e);
    });
  }
  // remove event listener for matched squares
  for (let i = 0; i < matchedSquares.length; i++) {
    var squareElem = document.getElementById(matchedSquares[i]);
    var newSquare = squareElem.cloneNode(true);
    squareElem.parentNode.replaceChild(newSquare, squareElem);
  }
}

function removeSquareEventListener() {
  var allSquares = document.getElementById('gameBoard').children;
  for (let i = 0; i < allSquares.length; i++) {
    var newSquare = allSquares[i].cloneNode(true);
    allSquares[i].parentNode.replaceChild(newSquare, allSquares[i]);
  }
}

function win() {
  // Hide Game Board
  var gameBoard = document.getElementById('game');
  // gameBoard.style.display = 'none';
  gameBoard.innerHTML = '';

  // Create End Game Screen
  var endGame = document.createElement('div');
  var endGameHead = document.createElement('h2');
  var endGameText = document.createElement('p');
  endGameHead.innerText = 'You Win!';
  endGameText.innerText = 'Thank you for playing!';
  endGame.appendChild(endGameHead);
  endGame.appendChild(endGameText);

  gameBoard.appendChild(endGame);
}
