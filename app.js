let boxes = document.querySelectorAll(".box");

let turnO = true;  //Starting from PlayerO

//Make 2D array of all winning patterns
const winnerPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

// let clickCount = 0;
boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turnO){  //When turnO is true, mark O and then change turnO to false for the next marking to be X.
            box.innerText = "O";
            box.classList.add("colorO");  /*Giving different color to O*/
            turnO = false;
            
        }
        else{
            box.innerText = "X";
            box.classList.add("colorX");  /*Giving different color to X*/
            turnO = true;
        }
        box.disabled = true;  //Once clicked, the value cannot be changed as box is disabled
        checkWinner();  //Check winner after every turn
        // clickCount++;
    });
});


let msgContainer = document.querySelector(".msg-container");
const showWinner = (winner) => {
    let msg = document.querySelector("#msg");
    msg.innerText = `Congratulations, Winner is ${winner}`;

    
    msgContainer.classList.remove("hide");  //remove hide class to display msg-container

    disableBoxes(); //Calling function
}

const disableBoxes = () => {
     //Disable all buttons after winner is found
     for(let box of boxes){
        box.disabled = true;
    }
}

/*let drawMsg = document.querySelector("#draw-msg");
let drawMsgContainer = document.querySelector(".draw-msg-container");
const drawMatch = () => {
    
    drawMsg.innerText = "Both players are equally good. Match draw!";
    drawMsgContainer.classList.remove("hide");
}*/

const checkWinner = () => {
    for(let pattern of winnerPatterns){
        /*pattern[0], pattern[1], pattern[2] are box numbers, i.e. indices*/

        let pos1Val = boxes[pattern[0]].innerText;  //Value in box at index pattern[0]
        let pos2Val = boxes[pattern[1]].innerText;  //Value in box at index pattern[1]
        let pos3Val = boxes[pattern[2]].innerText;  //Value in box at index pattern[2]

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
               showWinner(pos1Val);
            }
            
        }
    
    }
}


const resetGame = () => {
    
    for(let box of boxes){
       box.disabled = false;  //Remove disabling
       box.innerText = "";  //Empty all boxes  
   }
   msgContainer.classList.add("hide");
//    drawMsgContainer.classList.add("hide");
//    clickCount = 0;
}


//Resetting the game
let newGameBtn = document.querySelector("#newGame");
let resetGameBtn = document.querySelector("#reset-btn");

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);