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
let board, cardSelection, notACard, continues;

// Cached Elements
const boardGrid = document.querySelector("#cardContainer");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelectorAll(".cardClass");

// Functions
init();

function init() {
    board = getShuffledDeck();
    cardSelection = null;
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

    select.setAttribute("src", board[cardSelection].img);





    console.log(cardSelection)

    render();
};

// Sets up the board to contain our grid of cards
// function boardSetup () {
//     board.forEach(function(card, index) { 
//         const src = (card.matched || card === cardSelection) ? card.img : CARD_BACK;
//         var x = document.createElement("img");
//         x.setAttribute("src", CARD_BACK)
//         x.setAttribute("id", index);
//         x.setAttribute("class", "cardClass");
//         document.getElementById("cardContainer").appendChild(x);
//     });
// }

// call the init function to reset the board state
function playGame() {
    init();
}

// call the playGame function to reset board state
function playAgain() {
    playGame();
}