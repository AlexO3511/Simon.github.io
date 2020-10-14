// These arrays are to keep track of sequence given and store User Sequence.
let sequence = [];
let humanSequence = [];

// Game level user is currently at and will be incremented by 1 each level.
let level = 0;

// DOM used to select buttons and prompt instructions
const instructions = document.querySelector('.Instructions')
const currentLevel = document.querySelector('.Level')
const newGameBtn = document.querySelector('#game');
const btnContainer = document.querySelector('.button-container')

// When invoked, function resets arrays, level, and adds/removes unclickable class to game buttons.
function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    btnContainer.classList.add('unclickable');
    newGameBtn.classList.remove('unclickable')
}

// When invoked, function removes unclickable class to game buttons and allows user to reiterate user clicks.
function yourTurn(level) {
    btnContainer.classList.remove('unclickable')
}

//When invoked, tile will appear as pressed. 
function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    tile.classList.add('activated');
    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

//Iterate over nextSequence array and activate each tile. setTimeout is used for delay between button presses
function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}
// Math.floor and Math.random used to round the numbers down to largest integer. Gives value between 0-3 which is used to retrieve random value from array. 
function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow']
    const random = tiles[Math.floor(Math.random()* tiles.length)];

    return random; 
}
//Function invoked from startGame. This increments level on screen, invokes next step for next random tile, and pushes random tile to next sequencearray. 
function nextRound(){
    level += 1;
    //Adds unclickable class until user turn
    btnContainer.classList.add('unclickable');

    //Copy all eleemts in the 'sequence' array to 'nextSequence' 
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);
    instructions.innerHTML = 'Wait for computer!';
    currentLevel.innerHTML = `Level ${level}/20`


    //timeout will will execute yourTurn 1 second after last button in the sequence is activated
    sequence = [...nextSequence]
    setTimeout(() => {
        yourTurn(level);
        instructions.innerHTML = 'Your Turn!';
    }, level * 600 + 1000);
}

// Function will handle user clicks and compare the sequences to see if user either advances, loses, or wins the whole game. 
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
        instructions.innerHTML = 'You have a good memory! Keep going!';
        setTimeout(() => {
            nextRound();
        }, 2000);
        return;
    }
    instructions.innerHTML = `You have ${remainingClicks} clicks left`;
}

// Function will be invoked when start button is clicked. New Game button will now be unlickable for user, instructions on screen, and nextRound invoked. 
function startGame (){
    nextRound();
    instructions.innerHTML = 'Wait for computer';
    newGameBtn.classList.add('unclickable')
}

// Center Console button to invoke startGame which starts the first sequence of the game. 
newGameBtn.addEventListener('click', startGame)

// Event listinter will store value of data-tile from the element clicked to tile. It will call activate tile to show user press and handleclick to compare user vs computer clicks.
btnContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset
    if (tile) activateTile(tile);
    if (tile) handleClick(tile);
})

