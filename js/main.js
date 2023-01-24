// Constants
    const SOURCE_DECK = [
        { name: "FireMario", img: "imgs/card1FireMario.png", matched: false},
        { name: "FireMario",  img: "imgs/card1FireMario.png", matched: false},
        { name: "RacoonMario",  img: "imgs/card2RacoonMario.png", matched: false},
        { name: "RacoonMario",  img: "imgs/card2RacoonMario.png", matched: false},
        { name: "FrogMario",  img: "imgs/card3FrogMario.png", matched: false},
        { name: "FrogMario",  img: "imgs/card3FrogMario.png", matched: false},
        { name: "ShoeMario",  img: "imgs/card4ShoeMario.png", matched: false},
        { name: "ShoeMario",  img: "imgs/card4ShoeMario.png", matched: false},
        { name: "SpinyMario",  img: "imgs/card5SpinyMario.png", matched: false},
        { name: "SpinyMario",  img: "imgs/card5SpinyMario.png", matched: false},
    ];

const CARD_BACK = "imgs/cardBack.png";

// Variables
let board, cardSelection, firstCard, continues;
let attemptCount = 1;
let firstCardShow = true;
let firstCardMatch = true;

// Cached Elements
const boardGrid = document.querySelectorAll("#gridImage");
const boardContinues = document.querySelector("#attempts-display");
let gridImages = document.getElementsByClassName("gridImage");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelector(".playButton").addEventListener("click", playGame)

// Functions
init();

function init() {
    board = getShuffledDeck();
    cardSelection = null;
    firstCard = null;
    firstCardMatch = null;
    console.log(board);
    console.log(attemptCount);
    contunues = 10
    winner = null;
    // boardSetup();
    render();
}

// creates a copy of the SOURCE_DECK using the spread function
// using the sort method to shuffle the deck and returning the shuffled deck
function getShuffledDeck () {
    let tempDeck = [...SOURCE_DECK];

    tempDeck.sort(() => Math.random() - 0.5)
    console.log(tempDeck)

    // for (let i = 0; i < tempDeck.length; i++) {
    //     gridImages[i].setAttribute("src", CARD_BACK);
    //     tempDeck[i].matched = false;
    // };

    return tempDeck;
}


// Render function used to display the current state to the player
function render() {
    board.forEach(function(card, idx) {
        console.log("In Render")
    });   
}

function handleSelection(evt) {
    // // guard
    if (evt.target.tagName !== "IMG") return console.log("NOPE");


    cardSelection = evt.target.id;

    const select = document.getElementById(evt.target.id)

    if (board[cardSelection].matched === false) {
        select.setAttribute("src", board[cardSelection].img);
        ignoreClick = true;
    }

    if (attemptCount !== 2){
        attemptCount++;
        firstCard = board[evt.target.id];
        firstCardmatch = evt.target.id;
    } else if (attemptCount === 2){
        checkMatch(evt);
        // getTimer();
        attemptCount = 1;
    }

    render();
};

function checkMatch (evt) {
    if (firstCard.img === board[evt.target.id].img) {
        firstCard.matched = true;
        board[evt.target.id].matched = true;
        console.log("ITS A MATCH");
        render();  
    } else {       
            console.log("ITS NOT A MATCH")
            setTimeout(function() {
                console.log("Inside Timeout");
            }, 5000);
            // firstCard.img = CARD_BACK;
            // board[evt.target.id].img = CARD_BACK;
            render();
        };
        console.log(board);
    }

// Starts the timer
// function getTimer() {
//     console.log("IN TIMER!")
//     setTimeout(function(){
//         render();
//     }, 5000);
// };
    

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
    init();
}

// call the playGame function to reset board state
function playAgain() {
    playGame();
}