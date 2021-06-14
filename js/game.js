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

const players = [];

//**Note** Hide game-scores div when getting number of players and player names.
const container = document.getElementById('container');

const welcomeButton = document.querySelector('BUTTON');
welcomeButton.addEventListener('click', () => {
    playerCount()
});

function playerCount() {
    const welcomeContainer = document.getElementById('welcome');
    container.removeChild(welcomeContainer);
    const gameContainer = document.createElement('DIV');
    gameContainer.setAttribute('id', 'game-play');
    const header = document.createElement('DIV');
    header.className = 'header-logo';
    const headerLogo = document.createElement('IMG');
    headerLogo.setAttribute('src', 'img/logo.svg');

    header.appendChild(headerLogo);
    gameContainer.appendChild(header);

    const gameScores = document.createElement('DIV');
    gameScores.setAttribute('id', 'game-scores');
    gameScores.className = 'hide';

    container.appendChild(gameContainer);
    gameContainer.appendChild(gameScores);

    const playersNumContainer = document.createElement('DIV');
    playersNumContainer.setAttribute('id', 'number-of-players');
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
    playerNumNext.addEventListener('click', () => {
        insertPlayers(numPlayers.innerText);
    })
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
            currentNum++;
            number.innerText = currentNum;
        }
    });
    subtract.addEventListener('click', () => {
        let currentNum = number.innerText;
        if (currentNum > 2) {
            currentNum--;
            number.innerText = currentNum;
        }
    });
}

function insertPlayers(num) {
    const gamePlayContainer = document.getElementById('game-play');
    if (players.length === 0) {
        const numberOfPlayers = document.getElementById('number-of-players');
        gamePlayContainer.removeChild(numberOfPlayers);
        buildNameCapture(gamePlayContainer);
    }
    if (players.length >= 1) {
        gamePlayContainer.removeChild(document.getElementById('insert-player-names'));
        buildNameCapture(gamePlayContainer);
        let p = document.getElementById('insert-player-names').querySelector('P');
        p.innerText = `Insert Player ${players.length + 1}'s Name`;
    }
    let button = document.getElementById('insert-player-names').querySelector('BUTTON');
    if (players.length != num) {
        button.addEventListener('click', () => {
            let name = document.getElementById('insert-player-names').querySelector('INPUT').value;
            if (name) {
                players.push(new Player(name));
                players.length == num ? game(0) : insertPlayers(num);
            } else { alert('Please enter a name'); }
        });
    }
}

function game(i) {
    const gamePlayContainer = document.getElementById('game-play');
    const gameScreen = document.createElement('DIV');
    gameScreen.setAttribute('id', 'game-screen');
    gamePlayContainer.removeChild(document.getElementById('insert-player-names'));
    let player = players[i];
    const diceDiv = document.createElement('DIV');
    diceDiv.setAttribute('id', 'dice');

    const activePlayer = document.createElement('DIV');
    activePlayer.setAttribute('id', 'active-player');
    const playerP = document.createElement('P');
    playerP.innerText = `${player.name}'s Turn`;
    const rollButton = document.createElement('BUTTON');
    rollButton.innerText = 'Roll';
    rollButton.setAttribute('class', 'roll-dice');

    activePlayer.appendChild(playerP);
    activePlayer.appendChild(rollButton);

    diceDiv.appendChild(activePlayer);

    gameScreen.appendChild(diceDiv);
    gamePlayContainer.appendChild(gameScreen);

    rollButton.addEventListener('click', () => { 
        rollDice(player);
     });


}



function rollDice(player) {
    const gamePlayContainer = document.getElementById('game-play');
    let dieContainer = document.querySelector('.die-container');
    let noticeP = document.createElement('P')
    noticeP.innerText = 'Select dice to hold. Must select at least one.';
    document.getElementById('dice').appendChild(noticeP);
    if (dieContainer) { gamePlayContainer.removeChild(dieContainer); } else { 
        dieContainer = document.createElement('DIV');
        dieContainer.setAttribute('class', 'die-container');
        gamePlayContainer.querySelector('#dice').appendChild(dieContainer);
    }
    for (let i = 0; i < player.toRoll; i ++) {
        let dieDiv = document.createElement('DIV');
        dieDiv.setAttribute('class', 'die');
        let dieImg = document.createElement('IMG');
        let number = Math.ceil(Math.random() * 6);
        dieImg.setAttribute('src', `img/${ number }.svg`);
        dieImg.setAttribute('data-status', 'rolled');
        dieImg.setAttribute('data-value', number);
        dieImg.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-status') === 'rolled') {
                e.target.setAttribute('data-status', 'selected');
                e.target.setAttribute('src', `img/${ e.target.getAttribute('data-value') }s.svg`);
                document.querySelector('.roll-dice').className = 'roll-dice';
                document.getElementById('dice').querySelectorAll('P')[1].style.display = 'none';
            } else {
                e.target.setAttribute('data-status', 'rolled');
                e.target.setAttribute('src', `img/${ e.target.getAttribute('data-value') }.svg`);
                const dieGroup = document.querySelector('.die-container');
                const dice = dieGroup.querySelectorAll('IMG');
                let helper = document.getElementById('dice').querySelectorAll('P');
                for (let i = 0; i < dice.length; i++) {
                    if (dice[i].getAttribute('data-status') === 'selected') {
                        helper[1].style.display = 'none';
                        document.querySelector('.roll-dice').className = 'roll-dice';
                        break;
                    } else {
                        helper[1].style.display = '';
                        document.querySelector('.roll-dice').className = 'roll-dice inactive';
                    }
                }
            }
        });
        dieDiv.appendChild(dieImg);
        dieContainer.appendChild(dieDiv);
        document.querySelector('.roll-dice').className = 'roll-dice inactive';
    }

}


function buildNameCapture(gamePlayContainer) {
    const insertPlayersContainer = document.createElement('DIV');
        insertPlayersContainer.setAttribute('id', 'insert-player-names');
        insertPlayersContainer.setAttribute('class', 'helper');

        const helperText = document.createElement('P');
        helperText.innerText = `Insert Player ${players.length + 1}'s Name`;

        const input = document.createElement('INPUT');
        input.setAttribute('type', 'text');

        const button = document.createElement('BUTTON');
        button.setAttribute('class', 'new-screen');
        button.innerText = 'Next';

        insertPlayersContainer.appendChild(helperText);
        insertPlayersContainer.appendChild(input);
        insertPlayersContainer.appendChild(button);

        gamePlayContainer.appendChild(insertPlayersContainer);
}