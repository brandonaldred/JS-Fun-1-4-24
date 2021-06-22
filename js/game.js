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

document.querySelector('.new-screen').addEventListener('click', () => {
    document.getElementById('welcome').remove();
    const gamePlayContainer = elementBuilder('DIV', [{ att: 'id', val: 'game-play' }]);
    document.getElementById('container').appendChild(gamePlayContainer);
    const headerLogoContainer = elementBuilder('DIV', [{ att: 'class', val: 'header-logo' }]);
    const headerLogo = elementBuilder('IMG', [{ att: 'src', val: 'img/logo.svg' }]);
    headerLogoContainer.appendChild(headerLogo)
    
    const numberOfPlayersContainer = elementBuilder('DIV', [{ att: 'id', val: 'number-of-players' }, { att: 'class', val: 'helper' }]);
    const p = document.createElement('P');
    p.innerText = 'How many players?'
    numberOfPlayersContainer.appendChild(p);

    const numberOfPlayersSelect = elementBuilder('DIV', [{ att: 'class', val: 'number-of-players'}]);
    const decreasePlayerButton = elementBuilder('IMG', [{ att: 'src', val: 'img/minus.svg' }]);
    const increasePlayerButton = elementBuilder('IMG', [{ att: 'src', val: 'img/plus.svg' }]);
    const playerCount = document.createElement('P');
    playerCount.innerText = '2';

    const nextButton = elementBuilder('BUTTON', [{ att: 'class', val: 'new-screen' }]);
    nextButton.innerText = 'Next';

    decreasePlayerButton.addEventListener('click', (e) => { if (playerCount.innerText > 2) { playerCount.innerText --; } });
    increasePlayerButton.addEventListener('click', (e) => { if (playerCount.innerText < 15) { playerCount.innerText ++; } });

    appendChildren(numberOfPlayersSelect,[decreasePlayerButton, playerCount, increasePlayerButton]);
    appendChildren(numberOfPlayersContainer, [numberOfPlayersSelect, nextButton])
    appendChildren(gamePlayContainer,[headerLogoContainer, numberOfPlayersContainer]);

    nextButton.addEventListener('click', () => {
        document.getElementById('number-of-players').remove();
        const gameScoresContainer = elementBuilder('DIV', [{ att: 'id', val: 'game-scores' }]);
        for (let i = 1; i <= playerCount.innerText; i++) {
            let player = new Player('Player ' + i);
            players.push(player);
            const playerContainer = elementBuilder('DIV', [{ att: 'class', val: 'player' }]);
            const playerAvatar = elementBuilder('IMG', [{ att: 'src', val: 'img/profile.svg' }]);
            const playerScoreP = document.createElement('P');
            playerScoreP.innerHTML = `${player.name}'s Score: <span>${player.score}</span>`;

            appendChildren(playerContainer,[playerAvatar, playerScoreP]);
            gameScoresContainer.appendChild(playerContainer);
        }
        document.getElementById('game-play').appendChild(gameScoresContainer);
        playerRoll();
    })
});

function playerRoll(n) {
        const gameScreen = elementBuilder('DIV', [{ att: 'id', val: 'game-screen' }]);
        const playerTurn = elementBuilder('DIV', [{ att: 'id', val: 'turn' }]);
        const activePlayerContainer = elementBuilder('DIV',[{ att: 'id', val: 'active-player' }]);
        const activePlayer = document.createElement('P');
        activePlayer.innerText = `Player 1's Turn`;
        const rollButton = elementBuilder('BUTTON', [{ att: 'class', val: 'roll-dice' }]);
        rollButton.innerText = 'Roll';

        appendChildren(activePlayerContainer, [activePlayer, rollButton]);
        playerTurn.appendChild(activePlayerContainer);
        gameScreen.appendChild(playerTurn);

        const selectHelper = elementBuilder('P', [{ att: 'class', val: 'hide' }]);
        selectHelper.innerText = 'Must select at least one die.';

        playerTurn.appendChild(selectHelper);
        document.getElementById('game-play').appendChild(gameScreen);

        rollButton.addEventListener('click', () => {
            if (!document.querySelector('.die-container')) {
                const dieContainer = elementBuilder('DIV', [{ att: 'class', val: 'die-container' }]);
                playerTurn.appendChild(dieContainer);
                for (let i = 0; i < 6; i++) {
                    const die = elementBuilder('DIV', [{ att: 'class', val: 'die unselected'}]);
                    const n = Math.ceil(Math.random() * 6);
                    const dieImg = elementBuilder('IMG', [{ att: 'src', val: `img/${n}.svg` },{ att: 'data-val', val: n }]);
                    die.appendChild(dieImg);
                    dieContainer.appendChild(die);
                    dieImg.addEventListener('click', () => {

                    });
                }
            }
        });
}
//Helper functions
function elementBuilder(el,attributes) {
    let element = document.createElement(el);
    for (let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i].att, attributes[i].val);
    }
    return element;
}

function appendChildren (el,children) {
    for (let i = 0; i < children.length; i++) {
        el.appendChild(children[i]);
    }
}