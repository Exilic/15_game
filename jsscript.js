
var gameNumbers = new Array(16);
var numberSixteen = 15;


function startNewGame() {
    for (let index = 0; index < 16; index++) {
        gameNumbers[index] = (index+1);
    }

    do {
        newRandomOrder();
        determineSixteen();
    } while (isSolvable() === false)

    rearrangeCSS();
    document.getElementById('result').innerHTML = "The present game is unsolved";
}

function newRandomOrder() {
    for (let i = gameNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameNumbers[i], gameNumbers[j]] = [gameNumbers[j], gameNumbers[i]];
    }
}

function rearrangeCSS() {
    for (let i = 0; i < 16; i++) {
        var c = gameNumbers[i];
        setRow(c, (1+Math.floor(i/4)));
        setColumn(c, ((i+1)-(Math.floor(i/4)*4)));    
    }
}

function determineSixteen() {
    for (let i = 0; i < 16; i++) {
        if (gameNumbers[i] == 16)
            numberSixteen = i;      
    }
}

function isSolvable() {
    const isEven = Math.floor((numberSixteen) / 4 ) % 2 === 0;
    let count = 0;
    for (let i = 0; i < 15; i++) {
        if(gameNumbers[i] !== 16) {
            for ( let j = i; j < 16; j++) {
                if(gameNumbers[i] > gameNumbers[j]) count++;
            }
        }
    }
    if(isEven &&  Math.abs(count % 2) === 1) return true;
    return !isEven && count % 2 === 0;
}

function swipeLeft() {
    if (((numberSixteen+1) % 4) != 0){
        var a = ((numberSixteen+1)-(Math.floor(numberSixteen/4)*4));
        setColumn(16,(a+1));
        setColumn(gameNumbers[(numberSixteen+1)], a);
        swapNumbers(numberSixteen, 1);
        numberSixteen = (numberSixteen+1);
        if (isGameWon()) document.getElementById('result').innerHTML = "You have won!";
    }else{}
}

function swipeRight() {
    if (((numberSixteen+4) % 4) != 0){
        var a = ((numberSixteen+1)-(Math.floor(numberSixteen/4)*4));
        setColumn(16,(a-1));
        setColumn(gameNumbers[(numberSixteen-1)], a);
        swapNumbers(numberSixteen, -1);
        numberSixteen = (numberSixteen-1);
        if (isGameWon()) document.getElementById('result').innerHTML = "You have won!";
    }else{}
}

function swipeDown() {
    if(numberSixteen>3){
        setRow(16, (Math.floor(numberSixteen/4)));
        setRow(gameNumbers[(numberSixteen-4)], ((Math.floor(numberSixteen/4))+1));
        swapNumbers(numberSixteen, -4);
        numberSixteen = (numberSixteen-4);
        if (isGameWon()) document.getElementById('result').innerHTML = "You have won!";
    }else{}
}

function swipeUp() {
    if(numberSixteen<12){
        setRow(16, ((Math.floor(numberSixteen/4)+2)));
        setRow(gameNumbers[(numberSixteen+4)], (Math.floor(numberSixteen/4)+1));
        swapNumbers(numberSixteen, 4);
        numberSixteen = (numberSixteen+4);
        if (isGameWon()) document.getElementById('result').innerHTML = "You have won!";
    }else{}
}

function setRow(tile, row) {
    document.getElementById('tile'+tile).style.gridRow = row;  
}

function setColumn(tile, column) {
    document.getElementById('tile'+tile).style.gridColumn = column;  
}

function swapNumbers(sixteen, other) {
    gameNumbers[sixteen] = gameNumbers[(sixteen + other)];
    gameNumbers[(sixteen + other)] = 16;
}

function isGameWon() {
    for (let i = 0; i < 16; i++) {
        if (gameNumbers[i] != (i+1)) {
        return false; 
        }else{}
        
    } return true;
}

document.addEventListener('keydown', function(event) {
    event.preventDefault();
    console.log(event);
    switch (event.key) {
        case 'ArrowLeft':
            swipeLeft();
            break;
        case 'ArrowUp':
            swipeUp();
            break;
        case 'ArrowRight':
            swipeRight();
            break;
        case 'ArrowDown':
            swipeDown();
            break;
        default:
            break;
    }
})