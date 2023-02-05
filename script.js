'use strict';

//TODO: New Game button --> reset game, revert both player's scores to 0
//DONE: Randomly generate numbers 1 - 6 and depending on the role, display respective dice image (png)
//DONE: Roll dice button -->
//a. DONE: randomly generate number and dice image
//b. DONE: add value to CURRENT score
//TODO: Hold button --> add 'CURRENT' value to player total score.
//a. Next player's turn --> gray out previous player's side and 'illuminate' new active player's side
//DONE: CURRENT value --> For every non-1 value (2-6), increment CURRENT value by respective number (dice role). If 1 is roled, set CURRENT value to 0.

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Init game
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayerNum,
  currentScore,
  playerScore = 0;
let scores = [0, 0];

const init = () => {
  // remove winner styling
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //rest player 1 to active
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnHold.style.display = 'block';
  btnRoll.style.display = 'block';

  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayerNum = 0;
  currentScore = 0;
  playerScore = 0;
  scores = [0, 0];
};

//toggle Player
const togglePlayer = () => {
  activePlayerNum = activePlayerNum === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice
const rollDice = () => {
  //depending on roll change .dice src='dice-{roll}.png'
  btnRoll.addEventListener('click', () => {
    console.log(`Active Player: ${activePlayerNum}`);
    //generate random dice roll
    let roll = Math.floor(Math.random() * 6 + 1);

    //display dice
    diceEl.classList.remove('hidden');
    // console.log(`roll dice: ${roll}`);
    //display dice
    diceEl.src = `dice-${roll}.png`;

    //Get current player
    let activePlayerCurrent = document.getElementById(
      `current--${activePlayerNum}`
    );

    if (roll !== 1) {
      currentScore += roll;
    } else {
      currentScore = 0;
      togglePlayer();
      //use toggle instead
      //   if (activePlayerNum === 0) {
      //     player0El.classList.remove('player--active');
      //     player1El.classList.add('player--active');
      //   } else {
      //     player1El.classList.remove('player--active');
      //     player0El.classList.add('player--active');
      //   }
    }

    activePlayerCurrent.textContent = currentScore;
  });

  btnHold.addEventListener('click', () => {
    //Player score
    scores[activePlayerNum] += currentScore;
    currentScore = 0;
    document.getElementById(`current--${activePlayerNum}`).textContent =
      currentScore; //reset current score

    document.getElementById(`score--${activePlayerNum}`).textContent =
      scores[activePlayerNum];

    if (scores[activePlayerNum] >= 100) {
      document
        .querySelector(`.player--${activePlayerNum}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerNum}`)
        .classList.remove('player--active');
      btnHold.style.display = 'none';
      btnRoll.style.display = 'none';
      diceEl.classList.add('hidden');
    } else {
      togglePlayer();
    }
  });

  btnNew.addEventListener('click', init);
};

//Main game
init();
rollDice();
