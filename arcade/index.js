// a quick note to the person reading my code; I am quite sorry that somehow the ability to
// see which player is playing on round 2 sometimes has issues. I am working on debugging it, but to be honest, I'm glad it functions most the time
// and that it rights itself once the game goes past the first token drop.




let currentPlayer = document.getElementById("currentPlayer")


let gameState= {
    gameGrid:
    [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]],

    stats:{
    gamesPlayed: 0,
    gamesWonB:0,
    gamesWonR:0,
    gamesWonG:0,
    intervalLoopID:undefined
    },

    players :["red", "blue"],
    //set current player token to color token name "r" red starts first (for now)
    currentPlayerToken:"r",

    paused: false,

    //randomize who is first (extremely minorly biased towards .5 exactly)
    flipACoin: function(){
        
        let randomNumber = Math.random();
        console.log(randomNumber);
        //if random = <.5 then charmander
        if(randomNumber<.5){
            tokenVisualEleUpdate(true,false);
            this.currentPlayerToken == "r";
        }
        
    },

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
            newCellElement.id = (`${[numOfRowsMade,numOfCellsMade]}`)
            newCellElement.classList.add("cell");
            let imgr = document.createElement("img");
            imgr.classList.add("click");
            imgr.src = "images/pokeball.png";
            imgr.id = `img${numOfRowsMade},${numOfCellsMade}`;

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
    gameState.flipACoin();
}

//step 3 I want to use the dom content loaded event and
// attach a new event listener to the entire document itself
document.addEventListener("DOMContentLoaded",renderGameBoard);

// to play the game 
// shows a spinning token of the players color when it's their turn
// player clicks on the column that they're going to play in and it puts a piece at the bottom of the grid

//place a piece on the grid based on location clicked id's have saved me thank you
function makeYourMove(event)
{
    if(gameState.paused == true)
    {
        return
    }
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
            // console.log("make your movefunction"+ rowLocation+clickLocationColumn)
            gameState.swapCurrentPlayerToken();
            //updates current player token location
            gameState.gameGrid[rowLocation][clickLocationColumn] = gameState.currentPlayerToken[0];
            tokenVisualEleUpdate(rowLocation,clickLocationColumn);
            
            //function that checks for victories!
            
            //check victory function and exit game run exit game function if true
            if(checkVictoryAll(gameState.gameGrid)== true){
                displayVictoryScreen(gameState.currentPlayerToken[0]);
                playAgain();
            }

            return //console.log(gameState.gameGrid);    

        }//else if saying that the row is full
        else if(gameState.gameGrid[0][clickLocationColumn] == 'r' || gameState.gameGrid[0][clickLocationColumn] == 'b' || gameState.gameGrid[0][clickLocationColumn] == 'g')
        {
            console.log("the row is full");
            //maybe write an error message for the player since they're trying to add to something they can't change
        }else if(clickLocationColumn == "") {
            console.log("this is not a valid click location")
        }
    }
}

// can I stop running into problems 


function tokenVisualEleUpdate(row,column){

    // didn't really wanna do it this way but, the other fix would involve deconstructing my code 
    if(row == true && column == false){
        currentPlayer.children[0].src = "images/charmander.jpg"
        return
    }else{
        if (gameState.gameGrid[row][column]=='r')
        {   
            console.log(gameState.gameGrid[row][column]);

            let imgr = document.getElementById(`img${row},${column}`)
            imgr.src="images/charmander.jpg";
            currentPlayer.children[0].src ="images/squirtle.jpg"

        }else if (gameState.gameGrid[row][column]=='b')
        {
            console.log(gameState.gameGrid[row][column]);

        
            let imgr = document.getElementById(`img${row},${column}`)
            imgr.src="images/squirtle.jpg";
            currentPlayer.children[0].src ="images/charmander.jpg"
        }
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
            //console.log("current location " + grid[row][column] +"index location value " + currentLocationValue);
            

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
        for(let cell = 0; cell<grid[0].length; cell++){
            //create a value that iterates every time it shares a value with another cell, and replaces itself every time it doesn't
            //console.log(grid[row][cell]);

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
        for(let cell =3; cell<= 6; cell++){
            //for loop cycling with i for 3 iterations max to determine if there's 4 in a row
            for(let inARow=1; inARow>0; inARow++){
                //if there's a matching non-zero value at +1, -1 inARow = 2, if there's another non matching value at +2-2, inARow = 3 "" until inARow ==4 else, break
                //console.log("row " + row + "cell " + cell);
                // console.log(grid[row][cell]+ " " + grid[row+inARow][cell-inARow]);
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
    for(let row = 0; row< 3; row ++){
        //column iteration for smaller grid
        for(let cell =0; cell<= 3; cell++){
            //for loop cycling with i for 3 iterations max to determine if there's 4 in a row
            for(let inARow=1; inARow>0; inARow++){
                //if there's a matching non-zero value at +1, -1 inARow = 2, if there's another non matching value at +2-2, inARow = 3 "" until inARow ==4 else, break
                // console.log("row " + row + "cell " + cell);
                // console.log("in a row " + inARow);
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
    return (winSearchDiagonalUpR(grid) == true || winSearchRightLeft(grid) == true || winSearchDiagonalUpL(grid) == true ||winSearchUpDown(grid) == true)
}

function victory(index){
    if(index >= 4){
        console.log("You've won!!!");
        return true
    }
}

//pulling a bunch of elements above the code that refrences them for various Ui improvements, game won banner, score tracker, play again, board reset, 
let bttnPlayAgain = document.getElementById("playAgain");
let resetEle = document.getElementById("reset");
let gameWonBannerEle = document.getElementById("gameWonBanner");
let playerScore1 = document.getElementById("player1Score");
let playerScore2 = document.getElementById("player2Score");



function playAgain(){
    gameState.paused = true;
    currentPlayer.classList.add("hidden");
    gameWonBannerEle.classList.remove("hidden");
    resetEle.classList.remove("hidden");
    bttnPlayAgain.addEventListener("click", clearBoard);
}

//clear board of visual represetation of win
function clearBoard(){
    gameState.flipACoin();
    resetEle.classList.add("hidden");
    gameWonBannerEle.classList.add("hidden");
    currentPlayer.classList.remove("hidden");
    gameState.gameGrid =
    [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]]

    let imgr = document.getElementsByClassName("cell");
    console.log(imgr);
    for(i=0; i<imgr.length; i++){
        imgr[i].children[0].src="images/pokeball.png";
    }
    //reset game state
    gameState.paused= false;

    
}

//display victory screen yay
function displayVictoryScreen(winningPlayer){
    //set a banner on top of the playing screen that states in cool language and with a cool picture of the victory pokemon 
    //banner is translucent and has to stay out of the way of the reset button for all other elements will be turned off




    if (winningPlayer == 'r'){

        //display banner for player who won, image of character (work in progress I want it to clip on purpose, I may have to just edit the photo to be a section of charmander
        gameWonBannerEle.textContent = "Charmander won!";
        let imgr = document.createElement("img");
        imgr.src="images/charmanderOutlineClipped.png";
        gameWonBannerEle.appendChild(imgr);
        gameWonBannerEle.style.backgroundColor= "rgb(130, 12, 29)";

        //change games won state to increase for the player who won
        gameState.stats.gamesWonR= gameState.stats.gamesWonR +1;
        playerScore1.textContent = gameState.stats.gamesWonR;

    }else if(winningPlayer == 'b')
    {

        console.log("Squirtle won!");
        gameWonBannerEle.textContent = "Squirtle won!";
        let imgr = document.createElement("img");
        imgr.src="images/squirtleOutlineClipped.png";
        gameWonBannerEle.style.backgroundColor= "rgb(137, 172, 241)";

        gameWonBannerEle.appendChild(imgr);

        gameState.stats.gamesWonB= gameState.stats.gamesWonB +1;
        playerScore2.textContent = gameState.stats.gamesWonB;

    }else if(winningPlayer == 'g'){
        gameWonBannerEle.textContent = "Bulbasaur won!";
        console.log("Bulbasaur won!");
        gameState.stats.gamesWonG= gameState.stats.gamesWonG +1;
    }
}

