let gameWindow = document.querySelectorAll(".gameWindow");
console.log(gameWindow[0]);
let buttons = document.querySelectorAll(".btn");
console.log(buttons);
let buttons2 = document.getElementById('div-02');
console.log(buttons2);
const choices = ["rock", "paper", "scissors"];
let ps =0, cs=0;

window.onload = start();
console.log("first line");


function start(){
    fadeIn();
    // const fadeCheck = document.querySelector('#desc1');
    // console.log(fadeCheck);
    // console.log(fadeCheck.querySelector('span'))
    // let fadeCheckArray = fadeCheck.querySelectorAll('span');
    // console.log(fadeCheckArray);
    // fadeCheckArray = Array.from(fadeCheckArray);

    // let computerChoice = getComputerChoice();
    // let playerChoice = getComputerChoice();
    // playRound(computerChoice, playerChoice);    

}

// let buttons = document.querySelectorAll(".btn");
// console.log(buttons[1].id);


//Fade the intro text in
function fadeIn() {
//Split animated text into spans to control animation
const text = document.querySelector('.fancy');
const splitText = text.textContent.split("");
text.textContent="";
//Loop through text and span each character
for(let i=0; i<splitText.length;i++){
    text.innerHTML += "<span>"+ splitText[i] + "</span>";
}
    let char=0;
    let timer = setInterval(onTick, 50);
    //Apply fade to text with 50ms delay
    function onTick(){
        const span = text.querySelectorAll('span')[char];
        span.classList.add('fade');
        
        // if(span.textContent===" "){
    
        //     span.classList.add('space');
        // }
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
//Gets a random choice for computer
function getComputerChoice() {
    let x = Math.floor(Math.random() * 3)
    return choices[x];
}
//Plays 1 Round of Rock Paper Scissors
function playRound(c,p){

    if(c === p){
        console.log("Tie")
        return "tie";
    }
    //Computer Wins
    else if((c ==="rock" && p ==="scissors") ||
      (c ==="scissors" && p ==="paper")||
      ( c ==="paper" && p ==="rock")){
        console.log("Computer Wins!")
        return "computer wins"
        //PLAYER WINS
        }else{
        console.log("player wins!");
        return ("player wins")
      }
}
//Play a full game, first to 5 wins
function playFullGame(pChoice){


    
}

//Check if given score is 5
function checkScoreis5(i){
    let x = i===5 ? true : false;
    return x;
}
//Declare the winner
function declareWinner(w){

    

    
    for(let i =0;i<3;i++){
        console.log("for loopx3")
        buttons[i].classList.add('hide')
    }
    console.log(buttons);
    if(w===5){
    console.log("the computer wins")
 }else{
    console.log("the player wins!")
 }
}
function hideButton(b){
    console.log("BLAH" + b);
    // b.classList.add('hide');
    b.remove();
}
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerChoice = button.id;
        let x = playRound(getComputerChoice(), playerChoice);
             if(x==="tie"){
                displayResults("TIE GAME");
             } else if(x==="computer wins"){
                 cs++;
                 console.log(cs);
                 displayResults("COMPUTER WINS");
                //PLAYER WINS
                }else{
                 console.log(ps);
                 ps++;
                 displayResults("PLAYER WINS");
             }
             if(cs===5 || ps===5){
                declareWinner(ps);
                displayResults("GAME OVER");
             }
             
    })
});
function displayResults(result){
     
     gameWindow[0].innerHTML = `<h1>${result}</h1>`;
     console.log("test")
    console.log(`<h1>${result}</h1>`)
    
}