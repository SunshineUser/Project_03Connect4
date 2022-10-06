
let buttonRowLength=7;


let gameState={
    gameGrid:
    [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]];

    gameStats={
    gamesPlayed: 0,
    gamesWonB:0,
    gamesWonR:0,
    intervalLoopID:undefined
    },

    players :["NameOfPlayerR", "NameOfPlayerL"]

}




//creating an element called a token button that links to the class "token drop"
const tokenButton = document.getElementsByClassName("tokenDropBttns")
//create an add event listener to a function called drop me token that will recieve click input and drop a token.
buttonArray.addEventListener('click', makeButtonRow);

//function that makes a row of clickable buttons for dropping into Connect4
function makeButtonRow(){
    //create a row element to hold all the buttons
    const row= document.createElement('rowEle')

    for(i=0;i<= buttonRowLength.length-1; i++)
    {
        const tokenButton= document.createElement('tokenButton');
        row.appendChild(tokenButton);
    }
    tokenDropBttns.appendChild(row);
}
makeButtonRow();

function dropMeToken(){
    

}


const gridBox = document.getElementById("gridBox");
//using js to generate html in my gameboard;
function generateGameboard(gameArray)
{
    //gameboard height established
    for (i=0;i=gameArray.length-1; i--){
        for(j=0; j<=gameArray.length-1; j++)
        { 
            
        }

    const html = `
        <div id="${connect4}-bttn">
            <div class="philosopher",tag= "${name}">
                    <div class="philoName">${p.fullname}</div>
                    <div><section class="price" id="${name}-price">${p.cost}</section></div>
                    ${p.description}
            <div class="quote">“${p.quote}”
        </div>
        `;
           
    containerPhilosopher.innerHTML = html;
    
    
    
    return containerPhilosopher

}
}