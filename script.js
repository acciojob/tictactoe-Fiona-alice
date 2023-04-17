//your JS code here. If required.
const submit = document.getElementById('submit'); 
let p1 = document.getElementById('player1');
let p2 = document.getElementById('player2');
const info = document.querySelector('.inputs');
const bord = document.querySelector('.bord-container');
const boxes = document.querySelectorAll('.box');
let msg = document.querySelector('.message');
let x = 'x';
let o = 'o';
let running = false;
let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let option = ["", "", "", "", "", "", "", "", ""];
let curPlayer = x;
let player;

submit.addEventListener('click',start);

function start(){
    info.style.display = "none";
    bord.style.display = "flex";
    player = p1.value
	msg.textContent=`${player}, you're up`;
    // console.log(player);
    game();
}

function game(){
    boxes.forEach((box)=>{
        box.addEventListener('click', boxClick);
    });
    // msg.textContent=`${player}, you're up`;
    running = true;
}

function boxClick(){
    // alert("clicked");
    let ind = this.dataset.index;
    // console.log(ind);
    if(option[ind]!=="" || !running){
        return;
    }
    updateBox(this, ind);
    checkWinner();
    // changePlayer();
}


function updateBox(box, index){
    option[index] = player;
    box.textContent = curPlayer;
}

function changePlayer(){
    player = (player===p1.value)?p2.value:p1.value;
    curPlayer = (curPlayer==x)?o:x;
    msg.textContent=`${player}, you're up`;
    // console.log(option);
}

function checkWinner(){
    let won = false;
    for(let i = 0; i<win.length; i++){
        let condition = win[i];
        let box1 = option[condition[0]];
        let box2 = option[condition[1]];
        let box3 = option[condition[2]];
        
        if(box1==="" || box2==="" || box3===""){
            continue;
        }
        if(box1===box2 && box2===box3){
            won = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }

    if(won){
        msg.textContent = `${player} congratulations you won!`
        running = false;
    }
    else if(!option.includes("")){
        msg.textContent = `Game Draw.....!!`;
        running = false;
    }
    else{
        changePlayer();
    }
}