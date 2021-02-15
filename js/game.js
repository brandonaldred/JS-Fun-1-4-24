const roll = () => Math.floor(Math.random() * 6 + 1);
const content = document.getElementById('content');
let keep = [];

const printRoll = (numberOfDice) => {
    let html = '';
    for (let i = 0; i < numberOfDice; i++) {
        html += `<p id="${i}">${roll()}</p>`;
    }
    document.getElementById('content').innerHTML = html;
}

printRoll(2);

content.addEventListener('click', () => {
    printRoll(19);
})