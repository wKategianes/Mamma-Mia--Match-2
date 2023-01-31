// Constants
    const SOURCE_DECK = [
        { img: "imgs/card1Mushroom.png", matched: false},
        { img: "imgs/card1Mushroom.png", matched: false},
        { img: "imgs/card2FireFlower.png", matched: false},
        { img: "imgs/card2FireFlower.png", matched: false},
        { img: "imgs/card3Star.png", matched: false},
        { img: "imgs/card3Star.png", matched: false},
        { img: "imgs/card4Chest.png", matched: false},
        { img: "imgs/card4Chest.png", matched: false},
        { img: "imgs/card5Coin.png", matched: false},
        { img: "imgs/card5Coin.png", matched: false},
    ];

const CARD_BACK = "imgs/cardBack.png";

const CONTINUES = ["imgs/continue0.png", "imgs/continue1.png", 
"imgs/continue2.png", "imgs/continue3.png", "imgs/continue4.png", "imgs/continue5.png", 
"imgs/continue6.png", "imgs/continue7.png" ];

// Variables
let board, cardSelection, firstCard, ignoreClick;
let cardCount = 1;
let firstCardShow = true;
let firstRun = true;
let continues = 5;
let easySetting, normalSetting, hardSetting = false;
let difficultySettingChosen = false;

// Cached Elements
const boardGrid = document.querySelectorAll("#gridImage");
const boardContinues = document.querySelector("#attempts-display");
const gridImages = document.getElementsByClassName("gridImage");
const attemptDisplay = document.getElementById("continue-display");
const backgroundDisplay = document.querySelector("body");
const containerOverlay = "imgs/winnerImage.png";
const matchAudio = new Audio("Sounds/Mario-match.wav");
const noMatchAudio = new Audio("Sounds/Mario-noMatch.wav");
const winEffect = new Audio("Sounds/Mario-winner.wav");
const gameOver = new Audio("Sounds/Mario-gameover.mp3");
const playButtonEffect = new Audio("Sounds/Mario-here-we-go.wav");
const playAgainEffect = new Audio("Sounds/Mario-lets-a-go.wav");
const difficultySelection = new Audio("Sounds/Mario-difficulty-selection.wav");
const easyTheme = new Audio("Sounds/Mario-1-1.wav");
const normalTheme = new Audio("Sounds/Mario-grassland-theme.wav");
const hardTheme = new Audio("Sounds/Mario-bowser-castle.wav");

// Event Listeners
document.querySelector(".cardContainer").addEventListener("click", handleSelection);
document.querySelector(".playButton").addEventListener("click", playGame);
document.querySelector(".easyButton").addEventListener("click", easyDifficulty);
document.querySelector(".normalButton").addEventListener("click", normalDifficulty);
document.querySelector(".hardButton").addEventListener("click", hardDifficulty);

// Functions
init();

function init() {
    stopAudio();
    board = getShuffledDeck();
    cardSelection = null;
    firstCard = null;
    ignoreClick = false;
    boardReset();
    setAudio();
    render();
};

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
};

// Render function used to display the current state to the player
function render() {
    board.forEach(function(card, index) {
        if (board[index].matched === true) {
            gridImages[index].setAttribute("src", board[index].img);
        } else {
            gridImages[index].setAttribute("src", CARD_BACK);
        }
    });
    ignoreClick = false;
    setContinue();
    getWinner();
};

// checks user input against the guard, flips the card if selected
// tracks how many cards have been selected, calls the checkMatch function
function handleSelection(evt) {
    // guard
    if (evt.target.tagName !== "IMG" || ignoreClick === true || board[evt.target.id] === firstCard || firstRun === true) return;

    cardSelection = evt.target.id;
    firstRun = false;

    const select = document.getElementById(evt.target.id);

    if (board[cardSelection].matched === false) {
        select.setAttribute("src", board[cardSelection].img);
    };

    if (cardCount !== 2){
        cardCount++;
        firstCard = board[evt.target.id];
    } else if (cardCount === 2){
        checkMatch(evt);
        cardCount = 1;
    }
};

// checks to see if the user has picked two cards that have matching
// matched property
function checkMatch (evt) {
    if (firstCard.img === board[evt.target.id].img) {
        firstCard.matched = true;
        board[evt.target.id].matched = true;
        render();
        matchAudio.play();
    } else {       
        ignoreClick = true;
        noMatchAudio.play();
        continues--;
        continues = Math.max(continues--, 0);
        setTimeout(function() {            
            render();
        }, 1000);
        };
    };   

// call the init function to reset the board state
function playGame() {
    // guard
    if (difficultySettingChosen === false) return;

    playButtonEffect.play();
    document.querySelector(".playButton").style.visibility = "hidden";
    document.querySelector(".easyButton").style.visibility = "hidden";
    document.querySelector(".normalButton").style.visibility = "hidden";
    document.querySelector(".hardButton").style.visibility = "hidden";
    firstRun = false;
    if (easySetting === true) {
        easyTheme.play();
        easyTheme.loop = true;
    }  else if (normalSetting === true) {
        normalTheme.play();
        normalTheme.loop = true;
    } else {
        hardTheme.play();
        hardTheme.loop = true;
    }
    init();
};


// checks the board.matched property to see if we have a winner
function getWinner () {
    let checkWinner = board.every(function(bool) {
        return bool.matched === true;
    });
        
    if (checkWinner === true) {
        ignoreClick = true;
        cardClear();
        gameWinScreen();
    }

    if (checkWinner === false && continues == 0) {
        ignoreClick = true;
        cardClear();
        gameOverScreen();
    }
};

// stops all the audio from playing
function stopAudio() {
    matchAudio.pause();
    noMatchAudio.pause();
    winEffect.pause();
    gameOver.pause();
    playAgainEffect.pause();
};

// pauses the background audio
function stopBackgroundAudio() {
    easyTheme.pause();
    normalTheme.pause();
    hardTheme.pause();
};

// displays the game over image to the user once the game over 
// condition has been met
function gameOverImage () {
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", "imgs/gameOverImage.png");
    document.getElementById("cardContainer").appendChild(imageEl);
};

// shows the cards then hides the win/game over image when called
function boardReset () {
    document.getElementById("continue-display").style.opacity = "100%";
    document.getElementById("title-img").style.opacity = "100%";
    for (let i = 0; i < board.length ; i++) {
        document.getElementById([i]).style.opacity = "100%";
    }
    document.getElementById("mainId").style.backgroundImage = "none";   
};

// sets the opacity of all the cards to 0% making the hidden
function cardClear () {
    for (let i = 0; i < board.length ; i++) {
        document.getElementById([i]).style.opacity = "0.0";
    }
};

// turns the <main> tag style to backgroundImage to show the win image 
// and turns the opacity of continue & title <img> tag to 0%,
// also shows the play button
function gameWinScreen () {
    stopBackgroundAudio();
    winEffect.play();
    document.getElementById("mainId").style.backgroundImage = "url(imgs/marioWin.png)";
    document.getElementById("mainId").style.backgroundPosition = "center";
    document.getElementById("mainId").style.backgroundRepeat = "no-repeat";
    document.getElementById("continue-display").style.opacity = "0%";
    document.getElementById("title-img").style.opacity = "0%";
    document.querySelector(".playButton").style.visibility = "visible";
    document.querySelector(".easyButton").style.visibility = "visible";
    document.querySelector(".normalButton").style.visibility = "visible";
    document.querySelector(".hardButton").style.visibility = "visible";
};

// turns the <main> tag style to backgroundImage to show the game over image 
// and turns the opacity of continue & title <img> tag to 0%,
// also shows the play button
function gameOverScreen () {
    stopBackgroundAudio();
    gameOver.play();
    document.getElementById("mainId").style.backgroundImage = "url(imgs/gameOverImage.png)";
    document.getElementById("mainId").style.backgroundPosition = "center";
    document.getElementById("mainId").style.backgroundRepeat = "no-repeat";
    document.getElementById("title-img").style.opacity = "0%"; 
    document.querySelector(".playButton").style.visibility = "visible";
    document.querySelector(".easyButton").style.visibility = "visible";
    document.querySelector(".normalButton").style.visibility = "visible";
    document.querySelector(".hardButton").style.visibility = "visible";
};

// sets the volume levels of all audio variables
function setAudio () {
    matchAudio.volume = 0.05;
    noMatchAudio.volume = 0.05;
    winEffect.volume = 0.05;
    gameOver.volume = 0.05;
    playButtonEffect.volume = 0.05;
    playAgainEffect.volume = 0.05;
    difficultySelection.volume = 0.05;
    easyTheme.volume = 0.02;
    normalTheme.volume = 0.02;
    hardTheme.volume = 0.02;
};

// checks the amount of continues and then changes the image
function setContinue () {
        const continueImg = CONTINUES[continues];
        document.getElementById("continueImg").setAttribute("src", continueImg);
};

// sets the difficultySettingChosen variable to true
function difficulyChosenState () {
    difficultySettingChosen = true;
}

// adjusts the amount of continues and changes the background
function easyDifficulty() {
    backgroundDisplay.style.backgroundImage = "url(imgs/easyDifficulty.jpg";
    document.getElementById("mainId").style.backgroundImage = "";
    difficultySelection.play();
    continues = 7;
    easySetting = true;
    normalSetting = false;
    hardSetting = false;
    difficulyChosenState();
    setContinue();
};

// adjusts the amount of continues and changes the background
function normalDifficulty() {
    backgroundDisplay.style.backgroundImage = "url(imgs/normalDifficulty.jpg";
    document.getElementById("mainId").style.backgroundImage = "";
    difficultySelection.play();
    continues = 5;
    easySetting = false;
    normalSetting = true;
    hardSetting = false;
    difficulyChosenState();
    setContinue();
};

// adjusts the amount of continues and changes the background
function hardDifficulty() {
    backgroundDisplay.style.backgroundImage = "url(imgs/hardDifficulty.jpg";
    document.getElementById("mainId").style.backgroundImage = "";
    difficultySelection.play();
    continues = 3;
    easySetting = false;
    normalSetting = false;
    hardSetting = true;
    difficulyChosenState();
    setContinue();
};