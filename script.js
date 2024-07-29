const board=document.getElementById("board");
const cells=document.querySelectorAll(".cell");
const resetButton=document.getElementById('resetButton');
const scoreX=document.getElementById("scoreX");
const scoreO=document.getElementById('scoreO');
const scoreTie=document.getElementById('scoreTie');
const modeSelect=document.getElementById("mode");

let  currentPlayer="X";
let gameState=['', '', '', '', '', '', '', '', ''];
let scores={X:0, O:0, Tie:0};
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e){
    const cell=e.target;
    const cellIndex=Array.from(cells).indexOf(cell);

    if (gameState[cellIndex]!==''|| checkWinner()){
        return;
    }
    gameState[cellIndex]=currentPlayer;
    cell.textContent=currentPlayer;
    cell.setAttribute("data-player",currentPlayer);

    if(checkWinner()){
        scores[currentPlayer]++;
        updateScores();
        setTimeout(()=> alert(`${currentPlayer} has won!`),100);
        return;
    }
    if(gameState.every(cell=>cell !== '')){
        scores.tie++;
        updateScores();
        setTimeout(()=>alert(`It's a tie!`),100);
        return;
    }
    currentPlayer=currentPlayer==='X'? 'O' :'X';
    if(currentPlayer==="O"&&modeSelect.value==="ai"){
        setTimeout(handleAIMove,500);
    }
}

function checkWinner(){
    return winningConditions.some(condition=>{
        const[a,b,c]=condition;
        return gameState[a]!==''&&gameState[a]===gameState[b]&&gameState[a]===gameState[c];

    });
}


function handleAIMove(){
    let availableCells=gameState.map((cell,index)=>cell===''?index:null).filter(index=>index!==null);
    if (availableCells.length===0)
{
    return;
}
let aiMove=availableCells[Math.floor(Math.random()*availableCells.length)];
gameState[aiMove]="O";
const aiCell=document.getElementById(`cell-${aiMove}`);
aiCell.textContent='O';
aiCell.setAttribute("data-player","O");
if (checkWinner()){
scores['O']++;
updateScores();
setTimeout(()=> alert(`O has won!`),100);
return;
}
if(gameState.every(cell=>cell!=="")){
    scores.tie++;
    updateScores();
    setTimeout(()=>alert(`It's a tie!`),100);
    return;
}
currentPlayer="X";
}
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreTie.textContent = scores.tie;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell =>{
         cell.textContent="";
         cell.removeAttribute("data-player");
    } );
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);