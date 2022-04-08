var moves = ['r', 'p', 's'];

var playerMoveText = document.querySelector('.player-move-text');
var playerMoveImage = document.querySelector('.player-move-image');

var computerMoveText = document.querySelector('.computer-move-text');
var computerMoveImage = document.querySelector('.computer-move-image');

var playerScore = 0;
var computerScore = 0;

var playerScoreText = document.querySelector('.player-score');
var computerScoreText = document.querySelector('.computer-score');

var alertBox = document.querySelector('.alert');

(
    function () {
        playerMoveText.style.display = "none";
        playerMoveImage.style.display = "none";

        computerMoveText.style.display = "none";
        computerMoveImage.style.display = "none";

        playerScoreText.innerHTML = playerScore;
        computerScoreText.innerHTML = computerScore;
    }
)();


computerMove = arr => (arr[Math.floor(Math.random() * arr.length)]);

function game(e, comp) {
    showAll();
    console.log(comp);
    var player = e.key;
    player = player.toLowerCase();

    
    if (!moves.includes(player)) {
        var displayStatus = window.getComputedStyle(alertBox).getPropertyValue('display');

        if (displayStatus === "none") {
            alertBox.style.display = "flex";
        }
        return;
    } else if (player === comp) {

        showAll();
        hideAlert();
        updateDom("text")(playerMoveText, `${win("DRAW")}`);
        updateDom("text")(computerMoveText, `${win("DRAW")}`);
        updateDom("img")(playerMoveImage, `./src/images/${player}.png`);
        updateDom("img")(computerMoveImage, `./src/images/${comp}.png`);
        updateDom("text")(playerScoreText, playerScore);
        updateDom("text")(computerScore, computerScore);

    }else if(player === "r" && comp === "s"){

        if(checkZeroBug(computerScore)){
            computerScore = 0;
        }
        else{
            computerScore--;
        }
        playerScore++;

        updateDom("text")(playerMoveText,`Rock | ${win("WIN")}`);
        updateDom("img")(playerMoveImage, `./src/images/${player}.png`);
        updateDom("text")(playerScoreText, playerScore);

        updateDom("text")(computerMoveText, `Scissors | ${lose("LOSE")}`);
        updateDom("img")(computerMoveImage, `./src/images/${comp}.png`);
        updateDom("text")(computerScoreText, computerScore);
    }else if(player === "p" && comp === "r"){

        if(checkZeroBug(computerScore)){
            computerScore = 0;
        }
        else{
            computerScore--;
        }
        playerScore++;

        updateDom("text")(playerMoveText,`Paper | ${win("WIN")}`);
        updateDom("img")(playerMoveImage, `./src/images/${player}.png`);
        updateDom("text")(playerScoreText, playerScore);

        updateDom("text")(computerMoveText, `Rock | ${lose("LOSE")}`);
        updateDom("img")(computerMoveImage, `./src/images/${comp}.png`);
        updateDom("text")(computerScoreText, computerScore);
    }
    else if(player === "s" && comp === "p"){

        if(checkZeroBug(computerScore)){
            computerScore = 0;
        }
        else{
            computerScore--;
        }
        playerScore++;

        updateDom("text")(playerMoveText,`Scissors | ${win("WIN")}`);
        updateDom("img")(playerMoveImage, `./src/images/${player}.png`);
        updateDom("text")(playerScoreText, playerScore);

        updateDom("text")(computerMoveText, `Paper | ${lose("LOSE")}`);
        updateDom("img")(computerMoveImage, `./src/images/${comp}.png`);
        updateDom("text")(computerScoreText, computerScore);
    }else{
        if(checkZeroBug(playerScore)){
            playerScore = 0;
        }
        else{
            playerScore--;
        }
        computerScore++;

        updateDom("text")(playerMoveText, `${(player == 'r' ? "Rock" : null || player == 'p' ? "Paper" : null || player == 's' ? "Scissors" : null) + " | " + lose("LOSE") }`);
        updateDom("img")(playerMoveImage, `./src/images/${player}.png`);
        updateDom("text")(playerScoreText, playerScore);

        updateDom("text")(computerMoveText, `${(comp == 'r' ? "Rock" : null || comp == 'p' ? "Paper" : null || comp == 's' ? "Scissors" : null) + " | " + win("WIN") }`);
        updateDom("img")(computerMoveImage, `./src/images/${comp}.png`);
        updateDom("text")(computerScoreText, computerScore);
    }

}

function updateDom(what) {
    if (what === "img") {
        return function (location, data) {
            location.src = data;
        }
    } else if (what === "text") {
        return function (location, data) {
            location.innerHTML = data;
        }
    } else if (what === "display") {
        return function (location, data) {
            location.style.display = data;
        }
    }
    return;
}

function showAll() {
    updateDom("display")(playerMoveText, "block");
    updateDom("display")(playerMoveImage, "block");
    updateDom("display")(computerMoveText, "block");
    updateDom("display")(computerMoveImage, "block");
    return;
}

var win = word => (`<strong class="win">${word}</strong>`);
var lose = word => (`<strong class="lose">${word}</strong>`);


function hideAlert() {
    alertBox.style.display = "none";
}

checkZeroBug = score => (score === 0);

window.onkeydown = (e) => game(e, computerMove(moves));