// Constants
// array of objects that store card images and current state
const SOURCE_DECK = [
    { img: "card1FireMario.png", matched: false},
    { img: "card2RacoonMario.png", matched: false},
    { img: "card3FrogMario.png", matched: false},
    { img: "card4ShoeMario.png", matched: false},
    { img: "card5SpinyMario.png", matched: false}
];

const CARD_BACK = "img/cardBack.png"

// Variables
let board, cardSelection, notACard, continues;


// Cached Elements
// const attemptsEl = document.querySelector("h2");
const cardTileEls = document.querySelectorAll("section > img");

// Event Listeners

// Functions
init()

function init() {
    board = getShuffledDeck();
    cardSelection = null;
    console.log(board);
    notACard = false;
    contunues = 10
    winner = null;
    render(); 
}

// Render function used to display the current state to the player
function render() {
    // board.forEach(function(card, index) { 
    //     const imageEl = document.getElementById(index);
    //     const source = (card.matched || card === cardSelection) ? card.img : CARD_BACK;
    //     imageEl.source = source;
    // });
}


// handleSelection function will determine where the player has clicked
// Checks for a match and winner
function handleSelection(evt) {
    const cardIndex = parseInt(evt.target.id);
    const card = card[cardIndex];
    // conditional used to check if player clicked on notACard or matched card
    if (notACard || isNaN(cardIndex) || card.matched) return;
    // checking to see if there is a match and if there is a winner
    if (cardSelection && cardSelection === card) {
        cardSelection = null;
    } else if (cardSelection) {
        if (card.img === cardSelection.img) {
            card.matched = cardSelection = true;
            cardSelection = null;
            winner.every(card => card.matched);
        } else {
            notACard = true;
            cardSelection = null;
            card.matched = true;
            render();
        }
    }
};

function getShuffledDeck() {
    const tempCards = [];
    // array that will be returned
    const cards = [];
    // copy each source card twice and add to tempCards
    for (let img of SOURCE_DECK) {
    // Use spread syntax to copy source tile object's properties.
    // If we don't make copies, the objects in SOURCE_DECK will
    // be changed when we update matched to true.
        tempCards.push({...img}, {...img})};

    // Randomly choose a tile in tempCards, remove it, and 
    // add it to the cards array
    while (tempCards.length) {
        const randomIndex = Math.floor(Math.random() * tempCards.length);
        // Remove tile - note that splice always returns an array
        // and that is why the [0] is appended to splice
        const randomCard = tempCards.splice(randomIndex, 1)[0];
        cards.push(randomCard);
    }
    return cards;
    };