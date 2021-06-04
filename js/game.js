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

//Test array
const players = [];
players.push(new Player('Brandon'));

function roll(num) {
    let rolled = [];
    for (let i = 0; i < num; i++) {
        rolled.push(Math.ceil(Math.random() * 6));
    }
    return rolled;
}

let i = 0
let player = players[i];
player.toRoll = 6;

// Players Turn loop. Need to nest in a keep function
while(player.turn) {
    for (let i = 0; i < player.toRoll; i++) {
        player.rolled = roll(player.toRoll);
    }
    player.rolls++;
    player.rolled.forEach(die => {
        document.getElementById('content').innerHTML = `<p>${die}</p>`;
    });
    player.toRoll--;
    player.toRoll === 0 ? player.turn = false : player.turn;
}
