// Constants
    const SOURCE_DECK = [
        { name: "FireMario", img: "imgs/card1Mushroom.png", matched: false},
        { name: "FireMario",  img: "imgs/card1Mushroom.png", matched: false},
        { name: "RacoonMario",  img: "imgs/card2FireFlower.png", matched: false},
        { name: "RacoonMario",  img: "imgs/card2FireFlower.png", matched: false},
        { name: "FrogMario",  img: "imgs/card3Star.png", matched: false},
        { name: "FrogMario",  img: "imgs/card3Star.png", matched: false},
        { name: "ShoeMario",  img: "imgs/card4Chest.png", matched: false},
        { name: "ShoeMario",  img: "imgs/card4Chest.png", matched: false},
        { name: "SpinyMario",  img: "imgs/card5Coin.png", matched: false},
        { name: "SpinyMario",  img: "imgs/card5Coin.png", matched: false},
    ];

const CARD_BACK = "imgs/cardBack.png";

const CONTINUES = ["imgs/continue0.png", "imgs/continue1.png", 
"imgs/continue2.png", "imgs/continue3.png", "imgs/continue4.png", "imgs/continue5.png" ];

// Variables
let board, cardSelection, firstCard, continues;
let attemptCount = 1;
let firstCardShow = true;
let ignoreClick;
let firstRun = true;

// Cached Elements
const boardGrid = document.querySelectorAll("#gridImage");
const boardContinues = document.querySelector("#attempts-display");
const gridImages = document.getElementsByClassName("gridImage");
const attemptDisplay = document.getElementById("continue-display");
const containerOverlay = "imgs/winnerImage.png";
const matchAudio = new Audio("Sounds/Mario-match.wav");
const noMatchAudio = new Audio("Sounds/Mario-noMatch.wav");
const winEffect = new Audio("Sounds/Mario-winner.wav");
const gameOver = new Audio("Sounds/Mario-gameover.mp3");
const playButtonEffect = new Audio("Sounds/Mario-here-we-go.wav");
const playAgainEffect = new Audio("Sounds/Mario-lets-a-go.wav");
const cardSelectEffect = new Audio("Sounds/Mario-card-select.wav");
const backGroundTheme = new Audio("Sounds/Mario-grassland-theme.mp3");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelector(".playButton").addEventListener("click", playGame);

// Functions
init();

function init() {
    stopAudio();
    board = getShuffledDeck();
    cardSelection = null;
    firstCard = null;
    continues = 5;
    ignoreClick = false;
    boardReset();
    setAudio();
    render();
}

// creates a copy of the SOURCE_DECK using the spread function
// using the sort method to shuffle the deck and return a shuffled deck
function getShuffledDeck () {
    let tempDeck = [...SOURCE_DECK];

    tempDeck.sort(() => Math.random() - 0.5)    

    for (let i = 0; i < tempDeck.length; i++) {
        gridImages[i].setAttribute("src", CARD_BACK);
        tempDeck[i].matched = false;
    };
    return tempDeck;
}

// Render function used to display the current state to the player
function render() {
    board.forEach(function(card, index) {
        if (board[index].matched === true) {
            gridImages[index].setAttribute("src", board[index].img);
        } else {
            gridImages[index].setAttribute("src", CARD_BACK);
        }
    });
    const continueImg = CONTINUES[continues];
    document.getElementById("continueImg").setAttribute("src", continueImg);
    ignoreClick = false;
    getWinner();
}

// checks user input against the guard, flips the card if selected
// tracks how many cards have been selected, calls the checkMatch function
function handleSelection(evt) {
    // guard
    if (evt.target.tagName !== "IMG" || ignoreClick === true || board[evt.target.id] === firstCard || firstRun === true) return;

    cardSelection = evt.target.id;
    firstRun = false;

    const select = document.getElementById(evt.target.id)

    if (board[cardSelection].matched === false) {
        select.setAttribute("src", board[cardSelection].img);
    };

    if (attemptCount !== 2){
        attemptCount++;
        firstCard = board[evt.target.id];
    } else if (attemptCount === 2){
        checkMatch(evt);
        attemptCount = 1;
    }
};

// checks to see if the user has picked two cards that have matching
// matched property
function checkMatch (evt) {
    if (firstCard.img === board[evt.target.id].img) {
        firstCard.matched = true;
        board[evt.target.id].matched = true;
        console.log("ITS A MATCH");
        render();
        matchAudio.play();
    } else {       
        console.log("ITS NOT A MATCH")
        ignoreClick = true;
        noMatchAudio.play();
        continues--;
        continues = Math.max(continues--, 0);
        setTimeout(function() {            
            render();
        }, 1000);
        };
    }    

// call the init function to reset the board state
function playGame() {
    playButtonEffect.play();
    backGroundTheme.loop = true;
    backGroundTheme.play();
    document.querySelector(".playButton").style.visibility = "hidden";
    firstRun = false;
    init();
}


// checks the board.matched property to see if we have a winner
function getWinner () {
    let checkWinner = board.every(function(bool) {
                        return bool.matched === true;
    });
        
    if (checkWinner === true) {
        cardClear()
        gameWinScreen();
        winEffect.play();
        ignoreClick = true;
        return console.log("WINNER");
    }

    if (checkWinner === false && continues == 0) {
        cardClear();
        gameOverScreen();
        gameOver.play();
        ignoreClick = true;
        return console.log("Game Over!")
    }
}

function getHoverEffect () {
    cardSelectEffect.play();
}

// stops all the audio from playing
function stopAudio() {
    matchAudio.pause();
    noMatchAudio.pause();
    winEffect.pause();
    gameOver.pause();
    playAgainEffect.pause();
    cardSelectEffect.pause();
}

// displays the game over image to the user once the game over 
// condition has been met
function gameOverImage () {
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", "imgs/gameOverImage.png");
    document.getElementById("cardContainer").appendChild(imageEl);
}

// shows the cards then hides the win/game over image when called
function boardReset () {
    document.getElementById("continue-display").style.opacity = "100%";
    document.getElementById("title-img").style.opacity = "100%";
    for (let i = 0; i < board.length ; i++) {
        document.getElementById([i]).style.opacity = "100%";
    }
    document.getElementById("mainId").style.backgroundImage = "none";
    
}

// sets the opacity of all the cards to 0% making the hidden
function cardClear () {
    for (let i = 0; i < board.length ; i++) {
        document.getElementById([i]).style.opacity = "0.0";
    }
}

// turns the <main> tag style to backgroundImage to show the win image 
// and turns the opacity of continue & title <img> tag to 0%,
// also shows the play button
function gameWinScreen () {
    document.getElementById("mainId").style.backgroundImage = "url(imgs/marioWin.png)"
    document.getElementById("mainId").style.backgroundPosition = "center";
    document.getElementById("mainId").style.backgroundRepeat = "no-repeat";
    document.getElementById("continue-display").style.opacity = "0%";
    document.getElementById("title-img").style.opacity = "0%";
    backGroundTheme.pause();
    document.querySelector(".playButton").style.visibility = "visible";
    document.getElementById("mainId").style.pos
}

// turns the <main> tag style to backgroundImage to show the game over image 
// and turns the opacity of continue & title <img> tag to 0%,
// also shows the play button
function gameOverScreen () {
    document.getElementById("mainId").style.backgroundImage = "url(imgs/gameOverImage.png)"
    document.getElementById("mainId").style.backgroundPosition = "center";
    document.getElementById("mainId").style.backgroundRepeat = "no-repeat";
    document.getElementById("continue-display").style.opacity = "0%";
    document.getElementById("title-img").style.opacity = "0%";
    backGroundTheme.pause();
    document.querySelector(".playButton").style.visibility = "visible";
}

// sets the volume levels of all audio variables
function setAudio () {
    matchAudio.volume = 0.05;
    noMatchAudio.volume = 0.05;
    winEffect.volume = 0.05;
    gameOver.volume = 0.05;
    playButtonEffect.volume = 0.05;
    playAgainEffect.volume = 0.05;
    cardSelectEffect.volume = 0.05;
    backGroundTheme.volume = 0.01;
}