
const TicTacToeApp = (() =>{function Player(name){
        this.name = name;
}
function Gameboard(){
//includes gameboard, name dialog and start game button
tictactoegame = new Game();
let gameb = document.getElementById("gameb");
let playerform = document.getElementById("playerform")
let dialogsub = document.getElementById("dialogsub")
for (index = 0; index <= 8; index ++)
{
    const sqonboard = document.createElement("div");
    sqonboard.classList.add("square");
    sqonboard.id = `${index}`;
    gameb.appendChild(sqonboard);
}
squareel = gameb.querySelectorAll(".square");
startbtn = document.getElementById("startbtn");
startbtn.addEventListener("click", ()=>{
    playerform.showModal();
    dialogsub.addEventListener("click", (event) =>{
        event.preventDefault();
        let player1name = document.getElementById("player1").value;
        let player2name = document.getElementById("player2").value;
        tictactoegame.player1.name = player1name;
        tictactoegame.player2.name = player2name;
        console.log(tictactoegame.player1.name)
        console.log(tictactoegame.player2.name)
        playerform.close();
        tictactoegame.startGame();
        if(tictactoegame.getGameStatus() == "inplay" && tictactoegame.player1.name !== undefined ){
            tictactoegame.displayPlayerTurn();
    }
    })

    squareel.forEach((square) =>{
        square.innerHTML = ""
    })
})

squareel.forEach((square) =>{
    square.addEventListener("click", ()=>{
        tictactoegame.checkIfEmptyandDisplay(square);
        if(tictactoegame.getGameStatus() == "inplay"){
            tictactoegame.displayPlayerTurn();
        }
        
    })
})
}

function Game(){
    let gameposlist = Array(3).fill(null).map(() => Array(3).fill(null));
    const player1 = new Player();
    const player2 = new Player();
    winner = document.querySelector("#winner h1");
    let displayofnames = document.getElementById("displayofnames")
    let playerturn = document.createElement("h1");
    displayofnames.appendChild(playerturn);
    let gamestatus = "end" //end, inplay
    let gameturn = 0;
    const game =  {
        getGameStatus: () => gamestatus, 
        startGame: () => {
                gamestatus = "inplay";
                gameturn = 0;
                gameposlist = Array(3).fill(null).map(() => Array(3).fill(null));
                winner.innerHTML = ""
        },
        isBoardFull: () => {
            for (rowindex =0; rowindex <=2; rowindex ++){
                for (colindex = 0; colindex <=2; colindex ++){
                    if(gameposlist[rowindex][colindex] ==null){
                        return false;
                    }
            }
        }
        return true;
    },
    displayPlayerTurn:()=>{
        if (game.getGameTurn() % 2 === 0) {
            playerturn.innerHTML = `It's the turn of the player called ${tictactoegame.player1.name}`;
        } else {
            playerturn.innerHTML = `It's the turn of the player called ${tictactoegame.player2.name}`;
        }
        
    },
        updateToWonStatus:()=> {
            if(game.isBoardFull() || game.findWinner()){
                gamestatus = "end"; 
                playerturn.innerHTML = ""
                if(game.findWinner()){
                    game.displayWinner();
                }
                else{
                    winner.innerHTML = "Unfortunately, there is a draw!"
                    console.log("Unfortunately, there is a draw!")
                }
            }
            else{
                gameturn +=1;
            }
        },
        displayWinner:() =>{
            if(gameturn % 2 == 0)
                {
                    console.log(player1.name, " won!");
                    winner.innerHTML = `${player1.name} won!`
                    

                }
                else{
                    console.log(player2.name, " won!");
                    winner.innerHTML = `${player2.name} won!`
                }
        },
        findWinner:() =>{
            for(let index = 0 ; index <=2; index ++)
            {
                if(gameposlist[index][0] == gameposlist[index][1] && gameposlist[index][0] == gameposlist[index][2] && gameposlist[index][0]!= null)
                    {
                      
                        return true;
                    }
                if(gameposlist[0][index] == gameposlist[1][index] && gameposlist[0][index] == gameposlist[2][index] && gameposlist[0][index]!= null)
                    {
                       
                        return true;
                    }
            }
            if(gameposlist[0][0] == gameposlist[1][1] && gameposlist[0][0] == gameposlist[2][2] && gameposlist[0][0]!= null)
                {
                 
                    return true;
                }
            if(gameposlist[0][2] == gameposlist[1][1] && gameposlist[1][1] == gameposlist[2][0] && gameposlist[0][2]!= null)
                {
            
                    return true;
                }
            return false;
        },
        checkIfEmptyandDisplay: (square) => {
            if (gamestatus == "inplay"){
                let row = parseInt(square.id / 3);
                let column = square.id % 3;
                if (gameposlist[row][column] == null) {
                    if (gameturn % 2 === 0) {
                        square.innerHTML = "O";
                        gameposlist[row][column] = "O";
                    } else {
                        square.innerHTML = "X";
                        gameposlist[row][column] = "X";
                    }
                    game.updateToWonStatus(); 
                }
            }
        },
        getGameTurn: () => gameturn, 
        nextTurn: () => {
            gameturn += 1;
        },
        getGamePosList:() => gameposlist, 
        player1,
        player2
    };
    return game;
}
return {
    init:()=>{
        let gameboard = new Gameboard();
    },
};
})();
TicTacToeApp.init();

