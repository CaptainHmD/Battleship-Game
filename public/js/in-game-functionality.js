const NPCShipsIndex = sessionStorage.getItem('alive').split(',')
let playerShipsIndex;
function retrievePlayerShipIndex() {
    playerShipsIndex = sessionStorage.getItem('shipsIndexOnBoard').split(',')
    console.log(playerShipsIndex);
}


const previousIndexAttack = [];
function randomAttack() {
    do {
        console.log('ss');
        const randomNum = Math.floor(Math.random() * 100);
        if (previousIndexAttack.includes(randomNum)) continue
        previousIndexAttack.push(randomNum);
        return randomNum

    } while (true)

}
function NPCAttack(){
    const NPCIndexAttack = randomAttack();
    console.log('NPMIndexAttack: ',NPCIndexAttack);
    setTimeout(() => {
        attackEffect(NPCIndexAttack);
    }, 2000);
}
 var BotHits = 0;
 var BotMisses = 0;
 var BotPlayer = 0;
 var BotPlayer = 0;
 
function attackEffect(NPCIndexAttack){
    const notification = document.getElementById("target-alert");
    notification.classList.add("slide-down-alert");
    let message 
    console.log('NPMIndexAttack: ',NPCIndexAttack);

    attackBoardEffect(NPCIndexAttack)
    const attackState = playerShipsIndex.includes(NPCIndexAttack+'')// hit  . why +'' because session storage return values on String type so +'' matched the types
    if(attackState){
        console.log('hit');
        message = "NPN Attack Hits"
        notification.style.color="red"
    }else{ // miss
        console.log('miss');
        message = "NPN Attack Missed"
        notification.style.color="blue" 
    }
    attackBoardEffect(NPCIndexAttack,attackState)



    notification.innerHTML = `<h2 class="text-center text-success fs-2">${message}</h2>`;
    setTimeout(() => {
        notification.classList.remove("slide-down-alert");
        notification.classList.add("slide-up-alert");
      },  950);
    
      setTimeout(() => {
        notification.classList.remove("slide-down-alert");
        notification.classList.remove("slide-up-alert");
      }, 1600);
}
test();


function attackBoardEffect(NPCIndexAttack,attackState){
    const cells = document.querySelectorAll('[data-cell]');
    
    if(attackState){
        cells.item(NPCIndexAttack).classList.add("hit-usr-ship")
    }else{
        cells.item(NPCIndexAttack).classList.add("hit-usr-ship")
    }
}


