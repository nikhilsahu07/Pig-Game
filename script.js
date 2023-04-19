'use strict';

//Selecting elments
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceImage = document.querySelector('.dice-image');
const BtnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const currentPlayer0 = document.getElementById('current--0');
const currentPlayer1 = document.getElementById('current--1')

let scores, currentScore, activePlayer, playing;

//initialize all things by an function
const init = function () {
    currentScore = 0;
    activePlayer = 0;
    //array of score of player 0 and player 1
    scores = [0, 0];
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;

    diceImage.classList.add('hidden');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}

//initialize on reloading
init();

//Switching to next player function
const switchPlayer = function () {
    //Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}


BtnRollDice.addEventListener('click', function () {
    if (playing) {

        //Generating a random dice roll
        let diceNum = Math.trunc(Math.random() * 6) + 1;
        // console.log(diceNum);

        //Display dice functionality
        diceImage.classList.remove('hidden');
        diceImage.src = `dice-${diceNum}.png`;

        //check for rolled 1
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

//User Holds score
btnHold.addEventListener('click', function () {
    if (playing) {

        //Add current score to the active-playerscore
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //score>= 100
        if (scores[activePlayer] >= 100) {
            //finish the game and show who is winner
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceImage.classList.add('hidden');
        } else {
            //switching player of the his next turn
            switchPlayer();
        }
    }
})


btnNewGame.addEventListener('click', init);
