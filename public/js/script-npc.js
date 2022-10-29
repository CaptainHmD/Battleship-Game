const board = document.getElementById("npc-board");
let destroyed = [];
const eye = document.getElementById("eye");
let alive = [];
let endGame = false;
function placeCells() {
  for (let i = 1; i <= 100; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("onClick", `clicked(${i})`);
  
    cell.setAttribute("id", i);
    board.appendChild(cell);
  }
}
placeCells();
npcPlaceShips();

function npcPlaceShips() {
  const randomNum = (i, size) => {
    const included = (num) => {
      for (i = 0; i <= size; i++) {
        if (alive.includes(num + i)) {
          return true;
        }
      }
      return false;
    };

    const validate = (j, i) => {
      while (i <= 9) {
        if ((j < 10 && j.toString().includes(i)) || j % 10 == 0) {
          return true;
        }

        if (j.toString().lastIndexOf(i) === 1) {
          return true;
        }
        i++;
      }

      return false; //number in correct position
    }; //end validate

    //size is the maximum position of first cell
    let num = Math.abs(Math.floor(Math.random() * 100 - size));
    while (included(num) | validate(num, i) | (num < 0)) {
      num = Math.abs(Math.floor(Math.random() * 100 - size));
    }

    return num;
  };

  const placeShip = (leftMostMaxIndex, size) => {
    let leftmost = randomNum(leftMostMaxIndex, size);
    alive.push(leftmost);
    for (i = 1; i < size; i++) {
      alive.push(leftmost + i);
    }
  };

  let sizeCounter = 2;
  let leftMostIndex = 10;
  while (leftMostIndex > 6) {
    placeShip(leftMostIndex, sizeCounter);
    leftMostIndex--;
    sizeCounter++;
  }
  sessionStorage.setItem('alive', alive)
}

function clicked(i) {
  const notification = document.getElementById("target-alert");
  let message = "Missed The Target";

  if (destroyed.includes(i)) {
    return;
  }
  notification.classList.add("slide-down-alert");
  let dead = document.getElementById(i);
  dead.classList.add("hit-npc-ship")
  if (alive.includes(i)) {
    destroyed.push(i);
    alive.splice(alive.indexOf(i), 1);

   
    message = "Target Has Been Hit";
    notification.innerHTML = `<h2 class="text-center text-success fs-2">${message}</h2>`;

    if (alive.length === 0) {
      showEndGameModal()
      // playerWin()
    }
    playerHit++;
  } else {
    notification.innerHTML = `<h2 class="text-center text-danger fs-2">${message}</h2>`;
  }

  setTimeout(() => {
    notification.classList.remove("slide-down-alert");
    notification.classList.add("slide-up-alert");
  }, 950);

  setTimeout(() => {
    notification.classList.remove("slide-down-alert");
    notification.classList.remove("slide-up-alert");

    const modal = document.getElementById("npc-modal");
    //     modal.classList.add("visually-hidden");
  }, 1600);
  HideModal(); // hide the board modal for few second
  winner(); // in-game-functionality file
}

function hide() {
  alive.map((obj) => {
    let ship = document.getElementById(obj);

    ship.removeAttribute("style");
  });
}

function fill(color) {
  alive.map((obj) => {
    let ship = document.getElementById(obj);
    ship.style.backgroundColor = color;
  });
}
function highlight() {
  //it means solution is hidden
  if (eye.classList.contains("bi-eye")) {
    eye.classList.add("bi-eye-slash-fill");
    eye.classList.remove("bi-eye");

    hide();
  } else {
    eye.classList.add("bi-eye");
    eye.classList.remove("bi-eye-slash-fill");
    fill("green");
  }
}
async function HideModal() {
  const boardModal = document.querySelector('.npc-modal');
  const boardModalBody = document.querySelector(".npc-modal-body");
  const alter = document.querySelector('.alter-wrapper');

  alter.classList.add('gigachad-index')
  boardModalBody.classList.add("hide-npc-board");
  setTimeout(() => {
    boardModal.classList.add('visually-hidden')
  }, 1850)
  boardModal.classList.remove("show-npc-board");
  
  await timeout(6000, boardModal,boardModalBody, alter);
  console.log('destroyed', destroyed);
}
function timeout(ms, boardModal, boardModalBody, alter) {
  if (endGame) return;
  callNPCAttack();
  return new Promise(() => setTimeout(() => {
    boardModal.classList.remove('visually-hidden');
    boardModalBody.classList.remove("hide-npc-board");
    boardModalBody.classList.add("show-npc-board")
    alter.classList.remove('gigachad-index');
     
  }, ms));
}
var playerHit=0;
/*

*/
function test(){
  console.log('playerHit: ',playerHit);
  
}
function callNPCAttack(){
  NPCAttack(playerHit);
}

// sessionStorage.setItem('playerShipsHits',)


function reset() {
  destroyed = [];
  alive = [];
  board.innerHTML = "";
  placeCells();
  npcPlaceShips();
}


function showEndGameModal() {
  let npcModal = document.querySelector(".npc-modal");
  npcModal.style.visibility = "hidden";
const endGameModal = document.querySelector(".endGame-modal")
endGameModal.classList.remove("visually-hidden")
 reset()

}


/*
HAMAD
const endGameMessage = document.querySelector(".endGame-message")
if user wins -> {
 endGameMessage.innerText = "You Win" 
 endGameMessage.classList.add("text-success")
}
else -> {
  endGameMessage.innerText = "You Lost"  
  endGameMessage.classList.add("text-danger")
}
*/
function timeEnd() { //! im gonna call it from script-game file
  console.log('end');

  const winner = whoWin(); // return the Winner , player  for player && npc for bot || draw for fucking draw 
  const endGameMessage = document.querySelector(".endGame-message")
  if (winner === "player") {

    console.log(winner,' p');
    endGameMessage.innerText = "You Win"
    endGameMessage.classList.add("text-success")

  } else if (winner === "npc") {
    console.log(winner,' b');

    endGameMessage.innerText = "You Lost"
    endGameMessage.classList.add("text-danger")

  }else{
    console.log(winner ,'draw');
    endGameMessage.innerText = "Draw Pussies"
    endGameMessage.classList.add("text-danger")
  }
  showEndGameModal();
  
}



