console.log("We live Babbbbyyyyy!")

let sequence = [];
let humanSequence = [];
let level = 0;

const newGameBtn = document.querySelector('#newGame');

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);

    tile.classList.add('activated');

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}
//Iterate over sequence array
function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow']
    const random = tiles[Math.floor(Math.random()* tiles.length)];
    console.log(random);

    return random; 
}

function nextRound(){
    //level will be incremented by 1 and next sequence will be prepared
    level += 1;
    // copy all eleemts in the 'sequence' array to 'nextSequence'
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);
    console.log(level);
}
function startGame (){
    nextRound();
}
newGameBtn.addEventListener('click', startGame)

