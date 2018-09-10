/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var previousRoll;

document.querySelector('.btn-roll').addEventListener('click', function () {

	if (gamePlaying) {

		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		var secondDiceDOM = document.querySelector('.dice-2');
		diceDOM.style.display = 'block';
		secondDiceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		secondDiceDOM.src = 'dice-' + dice2 + '.png';

		//3. Update the round score IF the rolled number was not a 1 or if two sixes are rolled
		if (dice === 6 && previousRoll === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			alert('Oh no! You rolled two sixes in a row. You lose all your points!');
			nextPlayer();
		} else if (dice !== 1 && dice2 !==1) {
			// add score
			roundScore += dice + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {
			// next player
			nextPlayer();
		}
		previousRoll = dice;

	}

});



document.querySelector('.btn-hold').addEventListener('click', function () {

	if (gamePlaying) {
		// Add the current score to players global score
		scores[activePlayer] += roundScore;

		// Update the UI  
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.score').value;
		var winningScore;

		if (input) {
		  winningScore = input;
		} else {
		  winningScore = 100;
		}


		// Check if player won the game

		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {

			// Next Player
			nextPlayer();
		}
	}
});

function nextPlayer() {

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice;
//var x = document.querySelector('#score-0').textContent;