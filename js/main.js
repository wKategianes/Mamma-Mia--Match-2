// Constants
    const SOURCE_DECK = [
        { name: "FireMario", img: "card1FireMario.png", matched: false},
        { name: "FireMario",  img: "card1FireMario.png", matched: false},
        { name: "RacoonMario",  img: "card2RacoonMario.png", matched: false},
        { name: "RacoonMario",  img: "card2RacoonMario.png", matched: false},
        { name: "FrogMario",  img: "card3FrogMario.png", matched: false},
        { name: "FrogMario",  img: "card3FrogMario.png", matched: false},
        { name: "ShoeMario",  img: "card4ShoeMario.png", matched: false},
        { name: "ShoeMario",  img: "card4ShoeMario.png", matched: false},
        { name: "SpinyMario",  img: "card5SpinyMario.png", matched: false},
        { name: "SpinyMario",  img: "card5SpinyMario.png", matched: false},
    ];

const CARD_BACK = "imgs/cardBack.png";

// Variables
let board, cardSelection, notACard, continues;

// Cached Elements
const boardGrid = document.querySelector("#cardContainer");

// Event Listeners


// Functions
init();

function init() {
    board = getShuffledDeck();
    cardSelection = null;
    console.log(board);
    notACard = false;
    contunues = 10
    winner = null;
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
    board.forEach(function(card) { 
        const src = (card.matched || card === cardSelection) ? card.img : CARD_BACK;
        var x = document.createElement("img");
        x.setAttribute("src", src)
        document.getElementById("cardContainer").appendChild(x);
    });
}

// handleSelection function will determine where the player has clicked
// Checks for a match and winner
function handleSelection(evt) {
    const cardIndex = parseInt(evt.target.id);
    const card = board[cardIndex];
    // conditional used to check if player clicked on notACard or matched card
    if (notACard || isNaN(cardIndex) || card.matched) return;
    // checking to see if there is a match and if there is a winner
    if (cardSelection && cardSelection === card) {
        cardSelection = null;
    } else if (cardSelection) {
        if (card.img === cardSelection.img) {
            card.matched = cardSelection = true;
            cardSelection = null;
            winner= board.every(card => card.matched);
        } else {
            notACard = true;
            cardSelection = null;
            card.matched = true;
            render();
        }
    }
};

function boardSetup() {
    for (let i = 0; i < SOURCE_DECK.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", "img/cardBack.png");
        card.setAttribute("card-id", i);
        card.addEventListener("click", flipCard);
        boardGrid.appendChild(card);
    }
};

// call the init function to reset the board state
function playGame() {
    init();
}

// call the playGame function to reset board state
function playAgain() {
    playGame();
}