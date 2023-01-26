'use strict';
const guess = document.querySelector('.message');
const highscore = document.querySelector('.highscore');
const body = document.querySelector('body');
const secretBox = document.querySelector('.number');
let lastHighScore = 0;
let score = 10;
const points = document.querySelector('.score');

// Render the game by generating a random secret number and setting up event listener
function renderGame() {
  const secretNumber = Math.floor(Math.random() * 20 + 1);
  const playerCheck = document.getElementById('check-btn');
  const playerNumbers = [];
  console.log(secretNumber);

  playerCheck.onclick = () => {
    const numberValue = document.querySelector('.guess');
    playerNumbers.push(numberValue.value);

    if (numberValue.value < 1 || numberValue.value > 20) {
      guess.textContent =
        'Invalid number, please enter a number between 1 and 20';
      return;
    }

    numberValue.onclick = () => (numberValue.value = '');

    return player(secretNumber, playerNumbers, score);
  };
}
//compare secret number with player number and decrease score
function player(secretNumber, numbers, score) {
  let alive = true;

  for (let i = 0; i < numbers.length; i++) {
    if (score <= 1) {
      guess.innerHTML = '<p class="message">You lose...</p>';
      alive = false;
      document.querySelector('.label-score').innerHTML =
        '💯 Score: <span class="score">0</span>';
      body.style.backgroundColor = 'red';
      secretBox.textContent = '👿';
      break;
    } else {
      if (numbers[i] > secretNumber) {
        score--;
      } else if (numbers[i] < secretNumber) {
        score--;
      } else {
        guess.innerHTML = '<p class="message">You win !!</p>';
        body.style.backgroundColor = 'green';
        secretBox.textContent = secretNumber;
        return again(score);
      }
    }
  }
  if (alive) {
    guess.textContent =
      numbers[numbers.length - 1] > secretNumber ? 'Too high...' : 'Too low...';
  }
  points.textContent = score;
}
// Chec if the new score is higher than the last score
function again(newScore) {
  if (lastHighScore < newScore) {
    lastHighScore = newScore;
    highscore.textContent = lastHighScore;
  }
}
//re-render the game with the higher score save
document.getElementById('again-Btn').addEventListener('click', function () {
  body.style.backgroundColor = '#222';
  secretBox.textContent = '?';
  score = 10;
  points.textContent = score;
  renderGame();
});
renderGame();
