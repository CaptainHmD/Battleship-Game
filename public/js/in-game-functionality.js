const NPCShipsIndex = sessionStorage.getItem('alive').split(',')
let playerShipsIndex;
function retrievePlayerShipIndex() {
    playerShipsIndex = sessionStorage.getItem('shipsIndexOnBoard').split(',')
}


let previousIndexAttack = [];
function randomAttack() {
    do {
        const randomNum = Math.floor(Math.random() * 100);
        if (previousIndexAttack.includes(randomNum)) continue
        previousIndexAttack.push(randomNum);
        return randomNum

    } while (true)

}
function NPCAttack(playerHitCount){
    
    if(playerHitCount===null)return
    playerHits=playerHitCount
    const NPCIndexAttack = randomAttack();
    setTimeout(() => {
        attackEffect(NPCIndexAttack);
    }, 2000);
}
 var BotHits = 0;
 var playerHits = 0;
 
function attackEffect(NPCIndexAttack){
    const notification = document.getElementById("target-alert");
    notification.classList.add("slide-down-alert");
    let message 

    attackBoardEffect(NPCIndexAttack)
    const attackState = playerShipsIndex.includes(NPCIndexAttack+'')// hit  . why +'' because session storage return values on String type so +'' matched the types
    let textHighLight
    if(attackState){
        BotHits++
        message = "NPC Attack Hits"
        textHighLight = 'text-success'

    }else{ // miss
        message = "NPC Attack Missed"
        textHighLight = 'text-danger'

    }
    attackBoardEffect(NPCIndexAttack,attackState)



    notification.innerHTML = `<h2 class="text-center ${textHighLight} fs-2">${message}</h2>`;
    setTimeout(() => {
        notification.classList.remove("slide-down-alert");
        notification.classList.add("slide-up-alert");
      },  950);
    
      setTimeout(() => {
        notification.classList.remove("slide-down-alert");
        notification.classList.remove("slide-up-alert");
      }, 1600);
}


function attackBoardEffect(NPCIndexAttack,attackState){
    const cells = document.querySelectorAll('[data-cell]');
    
    if(attackState){
        cells.item(NPCIndexAttack).classList.add("hit-usr-ship")
    }else{
        cells.item(NPCIndexAttack).classList.add("hit-usr-ship")
    }
}

function whoWin(){

    if(playerHits>BotHits)
    return "player"
    else if (BotHits>playerHits)
    return "npc"
    else return "draw"
}

function resetFunctionality(){ // i did`t test it yet
    previousIndexAttack = []
    NPCShipsIndex = sessionStorage.getItem('alive').split(',')
}


