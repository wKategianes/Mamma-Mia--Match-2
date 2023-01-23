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
        { name: "SpinyMario",  img: "imgs/card5SpinyMario.png", matched: true},
    ];

const CARD_BACK = "imgs/cardBack.png";

// Variables
let board, cardSelection, firstCard, continues;
let attemptCount = 1;

// Cached Elements
const boardGrid = document.querySelectorAll("#gridImage");
const boardContinues = document.querySelector("#attempts-display");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelectorAll(".cardClass");

// Functions
init();

function init() {
    board = getShuffledDeck();
    cardSelection = null;
    firstCard = null;
    console.log(board);
    notACard = false;
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

    return tempDeck;
}


// Render function used to display the current state to the player
function render() {
    
}

function handleSelection(evt) {
    // // guard
    if (evt.target.tagName !== "IMG") return console.log("NOPE");


    cardSelection = evt.target.id;

    const select = document.getElementById(evt.target.id)

    if (board[cardSelection].matched === false) {
        select.setAttribute("src", board[cardSelection].img);
    }
    console.log(cardSelection)

    if (attemptCount !== 2){
        firstCard = board[evt.target.id];
        attemptCount++;
    } else if (attemptCount === 2){
        checkMatch(evt);
        attemptCount = 1;
    }

    console.log(attemptCount);

    render();
};

function checkMatch (evt) {
    if (firstCard.img === board[evt.target.id].img) {
        console.log("ITS A MATCH");
    } else {
        setTimeout(function() {
            console.log("ITS NOT A MATCH")
            firstCard.img = CARD_BACK;
            board[evt.target.id].img = CARD_BACK;
        }, 500);
    }
    render();    
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
    init();
}

// call the playGame function to reset board state
function playAgain() {
    playGame();
}