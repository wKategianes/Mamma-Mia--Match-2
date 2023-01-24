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

// Variables
let board, cardSelection, firstCard, continues;
let attemptCount = 1;
let firstCardShow = true;
let ignoreClick;

// Cached Elements
const boardGrid = document.querySelectorAll("#gridImage");
const boardContinues = document.querySelector("#attempts-display");
const gridImages = document.getElementsByClassName("gridImage");
const attemptDisplay = document.getElementById("attempts-display")
const matchAudio = new Audio("Sounds/Mario-match.wav");
const noMatchAudio = new Audio("Sounds/Mario-noMatch.wav");
const winEffect = new Audio("Sounds/Mario-winner.wav");
const gameOver = new Audio("Sounds/Mario-mamma-mia.wav");
const playButtonEffect = new Audio("Sounds/Mario-here-we-go.wav")
const playAgainEffect = new Audio("Sounds/Mario-lets-a-go.wav");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelector(".playButton").addEventListener("click", playGame);
// document.querySelector(".playAgain").addEventListener("click", playAgain)

// Functions
init();

function init() {
    board = getShuffledDeck();
    cardSelection = null;
    firstCard = null;
    continues = 5;
    winner = null;
    ignoreClick = false;
    matchAudio.volume = 0.01;
    noMatchAudio.volume = 0.01;
    winEffect.volume = 0.01;
    gameOver.volume = 0.01;
    playButtonEffect.volume = 0.01;
    playAgainEffect.volume = 0.01;
    render();
}

// creates a copy of the SOURCE_DECK using the spread function
// using the sort method to shuffle the deck and returning the shuffled deck
function getShuffledDeck () {
    let tempDeck = [...SOURCE_DECK];

    tempDeck.sort(() => Math.random() - 0.5)
    console.log(tempDeck)

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
    attemptDisplay.innerHTML = "Continues: " + continues;
    ignoreClick = false;
    getWinner();
}

function handleSelection(evt) {
    // guard
    if (evt.target.tagName !== "IMG" || ignoreClick === true) return console.log("NOPE");

    cardSelection = evt.target.id;

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
            console.log("Inside Timeout");
            render();
        }, 1000);
        };
    }    

// Sets up the board to contain our grid of cards
function boardSetup () {
    board.forEach(function(card, index) { 
        const src = (card.matched || card === cardSelection) ? card.img : CARD_BACK;
        var x = document.createElement("img");
        x.setAttribute("src", CARD_BACK)
        x.setAttribute("id", index);
        x.setAttribute("class", "cardClass");
        document.getElementById("cardContainer").appendChild(x);
    });
}

// call the init function to reset the board state
function playGame() {
    playButtonEffect.play();
    init();
}

// call the playGame function to reset board state
// function playAgain() {
//     playAgainEffect.play();
//     init();
// }

// checks the board.matched property to see if we have a winner
function getWinner () {
    let checkWinner = board.every(function(bool) {
                        return bool.matched === true;
    });
        
    if (checkWinner === true) {
        winEffect.play();
        ignoreClick = true;
        return console.log("WINNER");
    }

    if (checkWinner === false && continues == 0) {
        gameOver.play();
        ignoreClick = true;
        return console.log("Game Over!")
    }
}