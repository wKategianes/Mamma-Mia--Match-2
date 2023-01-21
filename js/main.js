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
let cardSelect, badClicks, cardMatch, attempts;

// Cached Elements
const attemptsEl = document.querySelector("h2");

// Event Listeners

// Functions
init()

function init() {
    cardSelect = getSuffledDeck();
    badClicks = false;
    attempts = 10;
    winner = null;
    render();
}

// Render function used to display the current state to the player
function render() {
    attemptsEl.innerHTML = `Continues: ${attempts}`;


    
}

// handleSelection function will determine where the player has clicked
// Checks for a match and winner
function handleSelection(evt) {
    const cardIdx = evt.target.id;
};

// getSuffledDeck will create an array that uses the SOURCE_DECK
// it will push the cards into the array
function getSuffledDeck() {
    let tempC = [];
    let cards = [];
    for (let card of SOURCE_DECK) {
        tempC.push({...card}, {...card})
    }

    while (tempC.length) {
        let randomIdx = Math.floor(Math.random() * tempC.length);
        let card = tempC.splice(randomIdx, 1)[0];
        cards.push(card);
    }
    return cards;
}