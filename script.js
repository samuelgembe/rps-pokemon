const buttons = document.querySelectorAll('.btn');
const messageRoundContainer = document.querySelector('#msg-round-container');
const mainMessageRound = document.querySelector('#main-msg-round');
const secondMessageRound = document.querySelector('#second-msg-round');
const playerScoreText = document.querySelector('#player-round-score-desktop');
const computerScoreText = document.querySelector('#computer-round-score-desktop');
const gameOverModal = document.querySelector('#game-over-modal');
const playAgainBtn = document.getElementById('play-again-btn');
const modalTextResult = document.querySelector('.modal-text-result');


const choices = [
    { name: 'Totodile', type: 'Water', imgPlayer: 'totodile-player.png', imgComputer: 'totodile-computer.png'},
    { name: 'Cyndaquil', type: 'Fire', imgPlayer: 'cyndaquil-player.png', imgComputer: 'cyndaquil-computer.png'},
    { name: 'Chikorita', type: 'Grass', imgPlayer: 'chikorita-player.png', imgComputer: 'chikorita-computer.png'}
  ];

let computerChoice;
let playerChoice;
let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
    button.addEventListener('click', (event) => {

        messageRoundContainer.classList.remove('hidden');
        document.getElementById('computer-card').classList.remove('hidden');
        document.getElementById('player-pokemon-img').classList.remove('hidden');
        document.getElementById('computer-pokemon-img').classList.remove('hidden');

        const buttonText = event.target.textContent.trim();
        playerChoice = choices.find(pokemon => pokemon.name === buttonText);
        console.log(`Player chose: ${playerChoice.name}`);
        let imgPokemon = document.querySelector('#player-pokemon-img img');
        imgPokemon.src = `img/${playerChoice.imgPlayer}`;
        getComputerChoice();
        playRound(playerChoice, computerChoice);
        checkForWinner(playerScore, computerScore);
    })


    // this lines are for hover buttons and make img pokemon visible
    // button.addEventListener('mouseenter', () => {
    //     const buttonText = button.textContent.trim();
    //     const pokemon = choices.find(p => p.name === buttonText);
    //     const preview = document.getElementById('player-pokemon-preview');
    //     preview.innerHTML = `<img src="img/${pokemon.imgPlayer}" alt="${pokemon.name} preview">`;
    //     preview.style.opacity = '0.3';
    //   });
    
    //   button.addEventListener('mouseleave', () => {
    //     document.getElementById('player-pokemon-preview').style.opacity = '0';
    //   });

});

function getComputerChoice(){
    const randomIndex = Math.floor(Math.random() * choices.length);
    computerChoice = choices[randomIndex];
    let imgPokemon = document.querySelector('#computer-pokemon-img img');
    imgPokemon.src = `img/${computerChoice.imgComputer}`;
    let computerNamePokemon = document.querySelector('.computer-name-pokemon');
    computerNamePokemon.textContent = computerChoice.name;
    console.log(`Computer chose: ${computerChoice.name}`);
}

const rules = {
    Water: 'Fire',   // Water (Totodile) beats Fire (Cyndaquil)
    Fire: 'Grass',  // Fire (Cyndaquil) beats Grass (Chikorita)
    Grass: 'Water'    // Grass (Chikorita) beats Water (Totodile)
  };


function playRound(playerChoice, computerChoice) {
    messageRoundContainer.classList.remove('pop', 'win', 'lose', 'tie');
    void messageRoundContainer.offsetWidth;

    if(playerChoice.type === computerChoice.type){
        mainMessageRound.textContent = `It's a Tie!`;
        secondMessageRound.textContent = `Both chose ${playerChoice.name}`;
        messageRoundContainer.classList.add('tie');
        messageRoundContainer.classList.add('pop', 'tie');
    } else if (rules[playerChoice.type] === computerChoice.type){
        mainMessageRound.textContent = "You Win!"
        secondMessageRound.textContent = `${playerChoice.type} beats ${computerChoice.type}`;
        messageRoundContainer.classList.add('win');
        playerScore++;
        document.querySelectorAll('[id^="player-round-score"]').forEach(el => el.textContent = playerScore);
    } else {
        mainMessageRound.textContent = "You Lose!";
        secondMessageRound.textContent = `${computerChoice.type} beats ${playerChoice.type}`;
        messageRoundContainer.classList.remove('win', 'tie');
        messageRoundContainer.classList.add('lose');
        computerScore++;
        document.querySelectorAll('[id^="computer-round-score"]').forEach(el => el.textContent = computerScore);
        messageRoundContainer.classList.add('lose');
    }
    setTimeout(() => {
        messageRoundContainer.classList.add('pop');
    }, 50);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;

    playerScoreText.textContent = '0';
    computerScoreText.textContent = '0';

    // Hide elements again
    document.getElementById('msg-round-container').classList.add('hidden');
    document.getElementById('computer-card').classList.add('hidden');
    document.getElementById('player-pokemon-img').classList.add('hidden');
    document.getElementById('computer-pokemon-img').classList.add('hidden');
    modalTextResult.classList.remove("win-text", "lose-text");
    modalTextResult.classList.add("lose-text"); // Reset to default color if needed

    gameOverModal.classList.add('hidden');

    mainMessageRound.textContent = '';
    secondMessageRound.textContent = '';

    const computerName = document.querySelector('.computer-name-pokemon');
    computerName.textContent = '';m

    // document.querySelector('#player-pokemon-img img').src = '';
    // document.querySelector('#computer-pokemon-img img').src = '';

  }

function checkForWinner (playerScore, computerScore){
    document.querySelector('#player-round-score-mobile').textContent = playerScore;
    document.querySelector('#computer-round-score-mobile').textContent = computerScore;

    const modalTitle = document.querySelector('.modal-title');
    const modalTextResult = document.querySelector('.modal-text-result');
    const modalPlayerScore = document.querySelector('#modal-player-score');
    const modalComputerScore = document.querySelector('#modal-computer-score');

    if (playerScore === 5) {
        gameOverModal.classList.remove('hidden');
        modalTitle.textContent = "What a battle!"; 
        modalTextResult.textContent = "You Win";
        modalTextResult.classList.remove("lose-text");
        modalTextResult.classList.add("win-text"); // Add this line
        modalComputerScore.textContent = computerScore;
        modalPlayerScore.textContent = playerScore;
    } 
    if (computerScore === 5) {
        gameOverModal.classList.remove('hidden');
        modalTitle.textContent = "Better luck next time, trainer"; 
        modalTextResult.textContent = "You Lose";
        modalTextResult.classList.remove("win-text");
        modalTextResult.classList.add("lose-text"); // Add this line
        modalComputerScore.textContent = computerScore;
        modalPlayerScore.textContent = playerScore;
    }
}


playAgainBtn.addEventListener('click', () => {
    resetGame();
})


