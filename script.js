console.log("We live Babbbbyyyyy!")

let sequence = [];
let humanSequence = [];
let level = 0;
const instructions = document.querySelector('.Instructions')
console.log(instructions)

//const newGameBtn = document.querySelector('#newGame');
const newGameBtn = document.querySelector('#game');

const btnContainer = document.querySelector('.button-container')

function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    btnContainer.classList.add('unclickable');
    newGameBtn.classList.remove('unclickable')
}

function yourTurn(level) {
    btnContainer.classList.remove('unclickable')
}

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
    //Adds unclickable class until user turn
    btnContainer.classList.add('unclickable');
    //ES6 copy all eleemts in the 'sequence' array to 'nextSequence'
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);
    instructions.innerHTML = 'Wait for computer';

    console.log(level);

    //timeout will will execute yourTurn 1 second after last button in the sequence is activated
    sequence = [...nextSequence]
    setTimeout(() => {
        yourTurn(level);
        instructions.innerHTML = 'Your Turn!';
        console.log("Your Turn")
    }, level * 600 + 1000);
}
function handleClick(tile) {
    const index = humanSequence.push(tile) - 1; 
    const remainingClicks = sequence.length - humanSequence.length; 

    if (humanSequence[index] != sequence[index]){
        resetGame('Oops! Game over, you pressed the wrong tile!');
        instructions.innerHTML = 'You lose! Click start for new game!';
        return; 
    }

        //if compares the length of humanSequence to sequence. If equal round is over and nextRound should be called 
    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === 20){
            resetGame('Congrats! You completed all the levels!');
            instructions.innerHTML = 'Wow Great Memory! Click start for new game!';
            return
        }

        humanSequence = [];
        console.log("Ok! Keep going!");
        instructions.innerHTML = 'You have a good memory! Keep going!';
        setTimeout(() => {
            nextRound();
        }, 2000);
        return;
    }
    instructions.innerHTML = `You have ${remainingClicks} clicks left`;
    console.log(`You have ${remainingClicks} clicks left`)
}

function startGame (){
    nextRound();
    instructions.innerHTML = 'Wait for computer';
    newGameBtn.classList.add('unclickable')
}


newGameBtn.addEventListener('click', startGame)
btnContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset

    if (tile) handleClick(tile);
})

