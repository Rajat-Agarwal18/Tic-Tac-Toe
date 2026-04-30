var boxes=document.querySelectorAll(".box");//select all the boxes / make array of all the boxes
var reset=document.querySelector(".reset");//select the reset button
var result=document.querySelector(".result");//select the result element
var win=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]//2d array for all winning possibilities
var turnX=true;//variable to keep track of player's turn, true for player X and false for player O

//get player names from local storage
document.getElementById("startBtn").addEventListener("click", () => {
    const p1 = document.getElementById("player1").value;
    const p2 = document.getElementById("player2").value;
    if (p1 && p2) {
        localStorage.setItem("player1", p1);
        localStorage.setItem("player2", p2);
        window.location.href = "index.html"; // navigate AFTER saving

    }
    else{
        alert("Please enter both player names!");
    }
});

//retrieve player names from local storage or use default names if not set
var ply1 = localStorage.getItem("player1") || "Player 1";
var ply2 = localStorage.getItem("player2") || "Player 2";

//add click event listener to each box
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){//player X's turn
            box.innerHTML="X";
            turnX=false;
        }
        else{//player O's turn
            box.innerHTML="O";
            turnX=true;
        }
        box.disabled=true;   //disable the box after clicking  
        checkWin();
    });
});

//check winning conditions
let checkWin=()=>{
        for(let pattern of win){
            let pos1=boxes[pattern[0]].innerHTML;//stores value of the box at index pattern[0]
            let pos2=boxes[pattern[1]].innerHTML;//stores value of the box at index pattern[1]
            let pos3=boxes[pattern[2]].innerHTML;//stores value of the box at index pattern[2]
            if(pos1!="" && pos2!="" && pos3!=""){//check if all three positions are filled
                if( pos1==pos2 && pos2==pos3){//check if all three positions have the same value
                    if(pos1=="X"){//if the value is X, player X wins
                        result.style.display="block";
                        result.innerHTML=ply1+" wins!";
                    }
                    else if(pos1=="O"){//if the value is O, player O wins
                        result.style.display="block";
                        result.innerHTML=ply2+" wins!";
                    }
                    boxes.forEach((box)=>{
                        box.disabled=true;//disable all boxes after a win
                    });
                }
            }
        }
};

//reset game
reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.innerHTML="";
        box.disabled=false;
    });
    result.style.display="none";//hide the result element
});