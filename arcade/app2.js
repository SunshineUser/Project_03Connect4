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
            newCellElement.id=(`${[numOfRowsMade,numOfCellsMade]}`)
            newCellElement.classList.add("cell");
            let imgr=document.createElement("img");
            imgr.classList.add("click");
            imgr.src = "pokeball.png";
            imgr.id= `img${numOfRowsMade},${numOfCellsMade}`;

            if(currentJSRow[numOfCellsMade] != 0){
                newCellElement.textContent = currentJSRow[numOfCellsMade];
            }else{
            
                newCellElement.textContent = "";
            }
            newCellElement.appendChild(imgr);
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
    //console.dir(event.target);
    let clickLocationColumn = event.target.id.charAt(5);
    //console.log(clickLocationColumn);
    //turns it into an Int
    clickLocationColumn = clickLocationColumn*1;
    //console.log ("clickLocCol" + clickLocationColumn)
    //what column the person clicked
    //console.log(gameState.gameGrid[0][clickLocationColumn]);
    for(let rowLocation=5; rowLocation >=0 ; rowLocation-- )
    {
    //if the bottom array location == 0 make it == 1 
    
        // check if current array value is 0 && contains the class element appended to the cell image (click) to prevent margin clicking errors
        if( gameState.gameGrid[rowLocation][clickLocationColumn] ==0  && event.target.classList.contains("click"))
        {
            console.log("make your movefunction"+ rowLocation+clickLocationColumn)

            //updates current player token location
            gameState.gameGrid[rowLocation][clickLocationColumn] = gameState.currentPlayerToken[0];
            tokenVisualEleUpdate(rowLocation,clickLocationColumn);
            gameState.swapCurrentPlayerToken();
            //check victory function and exit game run exit game function if true
            if(checkVictoryAll(gameState.gameGrid)== true){
                
            };

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
        console.log(gameState.gameGrid[row][column]);

        
        let imgr = document.getElementById(`img${row},${column}`)
        imgr.src="charmander.jpg";

    }else if (gameState.gameGrid[row][column]=='b')

    {
        console.log(gameState.gameGrid[row][column]);

        
        let imgr = document.getElementById(`img${row},${column}`)
        imgr.src="squirtle.jpg";
}
}




// I wish we got into using multiple JS pages because this solution checker is long and going to be tedious to implement and I wrote it in a different .js file because I knew that fact
function winSearchUpDown(grid){
    for(let column= 0; column <=6; column ++)
    {
        let winChecker = 1;
        let currentLocationValue = 'z';
        
        //iterate each cell within the rows
        for(let row = 0; row<=grid.length-1; row++){
            //create a value that iterates every time it shares a value with another cell, and replaces itself every time it doesn't
            //console.log(grid[row][column]);

            //full grid search for left right victory 
            if(currentLocationValue == grid[row][column] && grid[row][column]!= 0){
                winChecker = winChecker +1;
                //console.log("winCheckerValue"+ winChecker +" row"+ row + "column" + column);
                if (victory(winChecker) == true){
                    return true
                }

            }else {
                //console.log(grid[row][column]);
                currentLocationValue = grid[row][column];
                //console.log("currentLocationValue" + row + column  + currentLocationValue)
                winChecker = 1;
            }
        }
    }
}


function winSearchRightLeft(grid){

    //iterate each row
    for(let row= 0; row<=5; row ++)
    {
        let winChecker = 1;
        let currentLocationValue = 'z';
        
        //iterate each cell within the rows
        for(let cell = 0; cell<grid[0].length-1; cell++){
            //create a value that iterates every time it shares a value with another cell, and replaces itself every time it doesn't
            grid[row][cell];

            //full grid search for left right victory 
            if(currentLocationValue == grid[row][cell] && grid[row][cell]!= 0){
                winChecker = winChecker +1;
                //console.log("winCheckerValue"+ winChecker +" row"+ row + "column" + cell);
                if (victory(winChecker) == true){
                    return true
                }

            }else {
                //console.log(grid[row][cell]);
                currentLocationValue = grid[row][cell];
                //console.log("currentLocationValue" + row +cell  + currentLocationValue)
                winChecker = 1;
            }
        }
    }
}

function winSearchDiagonalUpR(grid){
    
    //index and iterate top right of grid from 0,3-0,6 to 3,3- 3,6 (because our win conditions for diagonals can only start from this range we can search in a smaller iterated grid)
    for(let row = 0; row< 3; row ++){
        //column iteration for smaller grid
        for(let cell =3; cell<= 5; cell++){
            //for loop cycling with i for 3 iterations max to determine if there's 4 in a row
            for(let inARow=1; inARow>0; inARow++){
                //if there's a matching non-zero value at +1, -1 inARow = 2, if there's another non matching value at +2-2, inARow = 3 "" until inARow ==4 else, break
                //console.log("row " + row + "cell " + cell);
                console.log(grid[row][cell]+ " " + grid[row+inARow][cell-inARow]);
                if(grid[row][cell] == grid[row+inARow][cell-inARow] && grid[row][cell]!= 0){
                    //iteratelmao
                    //console.log(inARow);
                    // gross solution to an offbyone Error
                    if(victory (inARow+1) ==true){
                        return true
                    };
                }
                else {
                    //not matching return

                    //console.log(inARow);
                    inARow= -1;
                }
            
            }
        
        }
    }
}

function winSearchDiagonalUpL(grid){
    
    //index and iterate top right of grid from 0,3-0,6 to 3,3- 3,6 (because our win conditions for diagonals can only start from this range we can search in a smaller iterated grid)
    for(let row = 0; row<= 3; row ++){
        //column iteration for smaller grid
        for(let cell =0; cell<= 3; cell++){
            //for loop cycling with i for 3 iterations max to determine if there's 4 in a row
            for(let inARow=1; inARow>0; inARow++){
                //if there's a matching non-zero value at +1, -1 inARow = 2, if there's another non matching value at +2-2, inARow = 3 "" until inARow ==4 else, break
                //console.log("row " + row + "cell " + cell);
                if(grid[row][cell] == grid[row+inARow][cell+inARow] && grid[row][cell]!= 0){
                    //iteratelmao
                    //console.log(inARow);
                    // gross solution to an offbyone Error
                    if(victory (inARow+1) ==true){
                        return true 
                    };
                }
                else {
                    //not matching return

                    //console.log(inARow);
                    inARow= -1;
                }
            
            }
        
        }
    }
}

function checkVictoryAll(grid)
{
    return (winSearchDiagonalUpR(grid) == true || winSearchRightLeft(grid) == true || winSearchDiagonalUpL(grid) == true ||winSearchUpDown || true)
}

function victory(index){
    if(index >= 4){
        console.log("You've won!!!");
        return true
    }
}
