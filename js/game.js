class Player {
    constructor(name) {
        this.name = name;
        this.turn = true;
        this.rolls = 0;
        this.score = 0;
        this.toRoll = 6;
        this.rolled = [];
        this.holding = [];
        this.qualified = false;
        this.wins = 0;

    }
}

//**Note** Hide game-scores div when getting number of players and player names.

const container = document.getElementById('container');

const welcomeContainer = document.getElementById('welcome');
const welcomeNextButton = welcomeContainer.querySelector('button');

welcomeNextButton.addEventListener('click', () => {
    playerCount();
});

function playerCount() {
    container.removeChild(welcomeContainer);
    const gameContainer = document.createElement('DIV');
    gameContainer.setAttribute('id','game-play');
    const header = document.createElement('DIV');
    header.className = 'header-logo';
    const headerLogo = document.createElement('IMG');
    headerLogo.setAttribute('src','img/logo.svg');

    header.appendChild(headerLogo);
    gameContainer.appendChild(header);

    const gameScores = document.createElement('DIV');
    gameScores.setAttribute('id','game-scores');
    gameScores.className = 'hide';

    container.appendChild(gameContainer);
    gameContainer.appendChild(gameScores);

    const playersNumContainer = document.createElement('DIV');
    playersNumContainer.setAttribute('id','number-of-players');
    playersNumContainer.className = 'helper';

    const playersNumP = document.createElement('P');
    playersNumP.innerText = 'How Many Players';

    const playersNumControl = document.createElement('DIV');
    playersNumControl.className = 'number-of-players';
    const subtractButton = document.createElement('IMG');
    subtractButton.setAttribute('src', 'img/minus.svg');
    const numPlayers = document.createElement('P');
    numPlayers.innerText = '2';
    const addButton = document.createElement('IMG');
    addButton.setAttribute('src', 'img/plus.svg');

    playersNumControl.appendChild(subtractButton);
    playersNumControl.appendChild(numPlayers);
    playersNumControl.appendChild(addButton);

    playersNumContainer.appendChild(playersNumP);
    playersNumContainer.appendChild(playersNumControl);
    
    const playerNumNext = document.createElement('BUTTON');
    playerNumNext.innerText = "Next"
    playerNumNext.className = 'new-screen';

    playersNumContainer.appendChild(playerNumNext);

    gameContainer.appendChild(playersNumContainer);
    addRemovePlayers();
}

function addRemovePlayers() {
    const numberOfPlayers = document.querySelector('.number-of-players');
    const buttons = numberOfPlayers.querySelectorAll('img');
    const number = numberOfPlayers.querySelector('p');
    const subtract = buttons[0];
    const add = buttons[1];
    add.addEventListener('click', () => {
        let currentNum = number.innerText;
        if (currentNum < 15) {
            currentNum ++;
            number.innerText = currentNum;
        }
    });
    subtract.addEventListener('click', () => {
        let currentNum = number.innerText;
        if (currentNum > 2) {
            currentNum --;
            number.innerText = currentNum;
        }
    });
}






//Test array
// const players = [];
// players.push(new Player('Brandon'));

// function roll(num) {
//     let rolled = [];
//     for (let i = 0; i < num; i++) {
//         rolled.push(Math.ceil(Math.random() * 6));
//     }
//     return rolled;
// }

// let i = 0
// let player = players[i];
// player.toRoll = 6;

// // Players Turn loop. Need to nest in a keep function
// while(player.turn) {
//     for (let i = 0; i < player.toRoll; i++) {
//         player.rolled = roll(player.toRoll);
//     }
//     player.rolls++;
//     player.rolled.forEach(die => {
//         document.getElementById('content').innerHTML = `<p>${die}</p>`;
//     });
//     player.toRoll--;
//     player.toRoll === 0 ? player.turn = false : player.turn;
// }
