let gameWindow = document.querySelectorAll(".gameWindow");
let gameWindowReload = gameWindow[0].innerHTML;
let scoreboard = document.getElementById('scoreboard');
let message = "";
let buttons2 = document.getElementById('div-02');
const choices = ["rock", "paper", "scissors"];
let ps =0, cs=0;

window.onload = start();
//Start the game
function start(){
    fadeInText();
    setTimeout(() =>{
        loadButtons();
        updateScore();
        fadeScoreBoard();
    }, 2000);
}
//Fade the intro text in
function fadeInText() {
//Split animated text into spans to control animation
const text = document.querySelector('.fancy');
const splitText = text.textContent.split("");
text.textContent="";
//Loop through text and span each character
for(let i=0; i<splitText.length;i++){
    text.innerHTML += "<span>"+ splitText[i] + "</span>";
}
    let char=0;
    let timer = setInterval(onTick, 30);
    //Apply fade to text with 50ms delay
    function onTick(){
        const span = text.querySelectorAll('span')[char];
        span.classList.add('fade');        
        char++;
        //Ends function when all chars are given class fade
        if(char === splitText.length){
            complete();
            return;
        }
    }
    function complete(){
        clearInterval(timer);
        timer = null;
    }
}
//Load  Game Buttons into gameWindow
function loadButtons(){
    gameWindow[0].classList.remove('gameWindowVert');
    gameWindow[0].innerHTML = 
    `<div class="btn" role="button" id="rock">
    <img class="buttonpic" src="./Logos/rock-svgrepo-com.svg">
</div>
<div class="btn" role="button" id="paper">
    <img class="buttonpic" src="./Logos/paper-svgrepo-com.svg">
</div>
<div class="btn" role="button" id="scissors">
    <img class="buttonpic" src="./Logos/scissors-svgrepo-com.svg">
</div>`;
let buttons = document.querySelectorAll(".btn");
    //Iterate game buttons and add event listeners to them
    buttons.forEach((button) => {
        fadeButtonIn(button);
        console.log("Add FADE NOW");
        button.addEventListener("click", () => {
            const playerChoice = button.id;
            let x = playRound(getComputerChoice(), playerChoice);
            if(x==="tie"){
                displayResults(`<p class="tie result">TIE</p>`, `<div class="endRound"><img class="endRoundPic endRoundPicTie" src="./Logos/${playerChoice}-svgrepo-com.svg"></div>`);
            } else if(x==="computer wins"){
                cs++;
                displayResults(`<p class="loser result">You Lost</p>`, `<div class="endRound"><img class="endRoundPic endRoundPicLose" src="./Logos/${playerChoice}-svgrepo-com.svg"></div>`);
            //PLAYER WINS
            }else{
                ps++;
                displayResults(`<p class="winner result">Winner!!</p>`, `<div class="endRound"><img class="endRoundPic endRoundPicWin" src="./Logos/${playerChoice}-svgrepo-com.svg"></div>`);
            }
        })
    });
//fade scoreboard in
}
function fadeScoreBoard(){
    scoreboard.classList.add('btnFade');
}
//Gets a random choice for computer
function getComputerChoice() {
    let x = Math.floor(Math.random() * 3)
    return choices[x];
}
//Plays 1 Round of Rock Paper Scissors
function playRound(c,p){
    // If Tie
    if(c === p){
        console.log("Tie")
        return "tie";
    }
    // If Computer Wins
    else if((c === "rock" && p === "scissors") ||
      (c === "scissors" && p === "paper") ||
      (c === "paper" && p === "rock")) {
        return "computer wins"
        //Else PLAYER WINS
        }else{
        return ("player wins")
      }
}
//Check if given score is 5
function checkScore(i){
    let x = i===3 ? true : false;
    return x;
}
//Declare the winner (first to reach 5)
function declareWinner(w){
    if(!checkScore(w)){
    console.log("the computer wins IT ALL")
    gameEnd(false);
 }else{
    console.log("the player wins IT ALL!")
    gameEnd(true);
 }
}
//Update the score board, display round-end info, and load next round if there is champion
function displayResults(result, id){
    updateScore(); 
    //If a player has won the whole game, declare them winner
    if(checkScore(cs) || checkScore(ps)){
        declareWinner(ps);
    //otherwise queue up next round
    }else{
        gameWindow[0].classList.add('gameWindowVert')
        gameWindow[0].innerHTML = id + result;
        setTimeout(() =>{
            loadButtons();
        }, 1500);
     }
}
//fade in a button
function fadeButtonIn(button){
    setTimeout(() =>{
        button.classList.add('btnFade');
},100);
}
//Display the final result, add a play again button
function gameEnd(w){
    gameWindow[0].classList.add('gameWindowVert')
    if(w){
        message = `<h3 class="gameWon">CONGRATS!!!</h3>`
    }else{
        message = `<h3 class="gameLost">OH NO! YOU STINK!</h3>`
    }
    gameWindow[0].innerHTML = `${message}${playAgainButton()}`
    let pAB = document.getElementsByClassName('playAgain');
    console.log(pAB);
    pAB[0].addEventListener('click', () => {
        resetBoard();
        start();
    });
}
//html for a play again button
function playAgainButton(){
    return `<div class='playAgain' role="button"><p class='playAgainText'>Play Again</p></div>`
}
//reset scoreboard and gamewindow
function resetBoard(){
    ps=0;
    cs=0;
    scoreboard.innerHTML = ""
    gameWindow[0].innerHTML = "";
    scoreboard.classList.remove('btnFade');
}
//update scoreboard html to show new score
function updateScore(){
    scoreboard.innerHTML = (`<h3><span class='playerScore'>${ps}</span> - ${cs}</h3>`)
}