let gameState= {
    gameGrid:
    [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]],

    gameStats:{
    gamesPlayed: 0,
    gamesWonB:0,
    gamesWonR:0,
    intervalLoopID:undefined
    },

    players :["red", "blue"],
    //set current player token to color token name "r" red starts first (for now)
    currentPlayerToken:"r",

    swapCurrentPlayerToken: function() {
        if (this.currentPlayerToken[0] == "r"){
            return this.currentPlayerToken = "b";
        } 
           else if(this.currentPlayerToken[0] == "b")
        {
           return this.currentPlayerToken = "r";
        } else
        {
            console.log("something went very wrong with your player tokens");
        }
    }


}

//Dom loader wooo > this event occurs when your html document gets rendered on the DOM
//How to turn your game state(js) into HTML
// Step 1) grab the location where we want to render the HTML

let gameBoardContainer = document.getElementById("gridBox")

let allXElements=document.getElementsByClassName("x")

//Step 2 lets write the callback function we want to run when our DomContentLoader event occurs.
function renderGameBoard(){

    //for loop to create rows to put cells in. 
    for (let numOfRowsMade =0; numOfRowsMade< gameState.gameGrid.length; numOfRowsMade++){

        //create element for new row and class it as a "row"
        let newRowElement = document.createElement("div");
        newRowElement.classList.add("row");

        //current javascript row == the current row 
        let currentJSRow = gameState.gameGrid[numOfRowsMade];
        //create cells for each row 
        for (let numOfCellsMade = 0; numOfCellsMade< currentJSRow.length; numOfCellsMade++){
            let newCellElement = document.createElement("section")
            newCellElement.classList.add(`${[numOfRowsMade,numOfCellsMade]}`)
            newCellElement.classList.add("cell");
            

            if(currentJSRow[numOfCellsMade] != 0){
                newCellElement.textContent = currentJSRow[numOfCellsMade];
            }else{
            
                newCellElement.textContent = "";
            }

            newRowElement.appendChild(newCellElement);
            
        }
        gameBoardContainer.appendChild(newRowElement);
    }
    gameBoardContainer = document.addEventListener("click",makeYourMove)
}

//step 3 I want to use the dom content loaded event and
// attach a new event listener to the entire document itself
document.addEventListener("DOMContentLoaded",renderGameBoard);

// to play the game 
// shows a spinning token of the players color when it's their turn
// player clicks on the column that they're going to play in and it puts a piece at the bottom of the grid

//place a piece on the grid based on location clicked (aka classes are dumb)
function makeYourMove(event)
{
    let clickLocationColumn = event.target.classList.value.charAt(2);
    clickLocationColumn = parseInt(clickLocationColumn);
    console.log ("clickLocCol" + clickLocationColumn)
    //what column the person clicked
    console.log(gameState.gameGrid[1][clickLocationColumn]);
    for(let rowLocation=5; rowLocation >=0 ; rowLocation-- )
    {
    //if the bottom array location == 0 make it == 1 
        
        if(0 == gameState.gameGrid[rowLocation][clickLocationColumn])
        {
            gameState.gameGrid[rowLocation][clickLocationColumn] = gameState.currentPlayerToken[0];
            tokenVisualEleUpdate(rowLocation,clickLocationColumn);
            gameState.swapCurrentPlayerToken();
            return console.log(gameState.gameGrid);    
        }
        else
        {
            console.log("this location already has a piece")
            //maybe write an error message for the player since they're trying to add to something they can't change
        }
    }
}

//???? weh can I stop running into problems 


function tokenVisualEleUpdate(row,column){
    if (gameState.gameGrid[row][column]=='r')
    {
        let currentEle= document.getElementsByClassName(`${row},${column} cell`)
        currentEle.style.backgroundColor ="black";
    }
}