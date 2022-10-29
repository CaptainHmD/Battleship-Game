

const board = document.querySelector('#board'); //! game board
createBoard();
let cells ;
var shipParts; //!
const dragAbles = document.querySelectorAll('.drag');
var lastCellHover; //!
var shipSize; //!
var numberOfTheShipPart;
const notAllowedHorizontalOnEnd = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
const notAllowedHorizontalOnStart = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let shipsIndexOnBoard = []; //TODO: the values will be pushed when the ships placed
let shipsIndexOnBoardWithGap = []; //TODO: the values will be pushed when the ships placed
let shipsValidationByName = [];
let shipsArray = [];
var cellTarget;


function createBoard() {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-cell', '')
        board.appendChild(cell);

    }
}

//! ships
dragAbles.forEach(ships => {
    //click
    ships.addEventListener('dragstart', ship => { onDragStart(ship, ships) })
    ships.addEventListener('dragend', onDragEnd(ships))
    ships.addEventListener('mousedown', onMouseDown)
}) //! end of forEach for dragAbles

function onDragStart(ship, ships) {
    ships.classList.add('dragging'); //* for some effects
    shipParts = ship.path[0].children.length;//* to get number of  ships part 
}
function onDragEnd(ships) {

    ships.classList.remove('dragging')//* to remove the effects
}

function onMouseDown(handler) {
    cellTarget = handler.target;
    shipSize = (handler.target.id).split('-')[0]
    numberOfTheShipPart = parseInt((handler.target.id).split('-')[1])
}



//! cells
function cellsEvents(){

cells = document.querySelectorAll('[data-cell]');
cells.forEach(cell => {
    cell.addEventListener('dragover', dragOverTheCells) //* 1
    cell.addEventListener('drop', addShipsIntoCells, true) //* 2
})//! end of cells foreach for cells
}
 cellsEvents()

function dragOverTheCells(handler) { //* 1

    handler.preventDefault()// cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    if (handler.target.classList.contains('placed')) { // any cells that have placed class 
    }
    lastCellHover = Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget)
} // end of dragOverTheCells




//! (shipParts) number of all parts in the ship that been clicked on 
//! (lastCellHover)  number of cell that user was hover on
//! (numberOfTheShipPart) what is the part of the ship that user clicked on
//! (shipSize) ship size (: but in text
function addShipsIntoCells(ship) { //* 2
    // console.log('lastCellHover: ', lastCellHover);
    // console.log('shipParts: ', shipParts);
    // console.log('numberOfTheShipPart: ', numberOfTheShipPart);
    // console.log('shipSize ', shipSize);
    //TODO: conditions for the invalid drop cells
    if (invalidCellsAtTheEnd()) return
    if (invalidCellsAtTheStart()) return
    if (invalidCellsBetweenTheFirstAndTheLast()) return
    if (invalidRightMiddleCell()) return
    if (invalidLeftMiddleCell()) return
    //! The above conditions check of the cells is empty

    //TODO: Verify if a ship is present at the drop-off location.
    if (verifyIfShipsOnTheWay()) return

    if (shipUnique()) return
    addShipOnBoard();


}//end of addShipsIntoCells


function addShipOnBoard() {

    lastCellHover = lastCellHover - numberOfTheShipPart; // it will reset to the first part of the ship, if and only if he didn't click on the first part of the ships
    if(shipParts===0)return
    for (let i = 0; i < shipParts; i++) {
        cells.item(lastCellHover + i).classList.add('placed')
        cells.item(lastCellHover + i).classList.add('ship-placed')
        cells.item(lastCellHover + i).setAttribute('id', `${shipSize}-${i}`)

    } // end for loop
    shipsValidationByName.push(shipSize);
    addShipIndexInArray()
    addShipIndexWithGapInArray()
    removeShipAfterPlacing()
    if (shipsValidationByName.length === 4) {
        sessionStorage.setItem('shipsIndexOnBoard',shipsIndexOnBoard)
        retrievePlayerShipIndex()
        timeCounter();
        setTimeout(() => {
            if (endGame) return;
            
            let npcBoard = document.querySelector('.npc-modal'); 
            let npcBoardBody = document.querySelector('.npc-modal-body');
            npcBoard.classList.remove('visually-hidden') 
            npcBoardBody.classList.add('show-npc-board')
        }, 3850)
    }
}
function shipUnique() {
    return shipsValidationByName.includes(shipSize);
}

// const shipsIndexOnBoardWithGap = []; //TODO: the values will be pushed when the ships placed

function addShipIndexInArray() {
    for (let i = 0; i < shipParts; i++) {
        shipsIndexOnBoard.push(lastCellHover + i)
    }
}
function addShipIndexWithGapInArray() {
    const valuesReturn = overAndUnderFlowCells();
    let beforeLastCellHover = valuesReturn[0];
    let extraIteration = valuesReturn[1];

    for (let i = 0; i < shipParts + extraIteration; i++) {
        addUnderAndTopOfTheCells(beforeLastCellHover);
        shipsIndexOnBoardWithGap.push(beforeLastCellHover) // push the middle cells
        beforeLastCellHover++ //* for next middle ship part 
    }

} //! end addShipIndexWithGapInArray function

function overAndUnderFlowCells() {

    let beforeLastCellHover = lastCellHover; //! initial value
    let extraIteration = 2; //! initial value
    if (notAllowedHorizontalOnStart.includes(lastCellHover))
        extraIteration = 1;
    else
        beforeLastCellHover = lastCellHover - 1;

    if (notAllowedHorizontalOnEnd.includes((lastCellHover + shipParts) - 1)) {
        extraIteration = 1;
        beforeLastCellHover = lastCellHover - 1;
    }
    return [beforeLastCellHover, extraIteration];

}//! end overAndUnderFlowCells function


function addUnderAndTopOfTheCells(beforeLastCellHover) {

    for (let j = 0; j < 2; j++) {
        if (j == 0) {
            if (beforeLastCellHover + 10 > 99) //! check for numbers over 99 
                continue
            shipsIndexOnBoardWithGap.push(beforeLastCellHover + 10)// push the bottom cells
        }
        else {
            if (beforeLastCellHover - 10 < 0) //! check for negative numbers
                continue
            shipsIndexOnBoardWithGap.push(beforeLastCellHover - 10)// push the top cells
        }
    }

}//! end addUnderAndTopOfTheCells function




//! conditions functions

function invalidCellsAtTheEnd() {
    if (numberOfTheShipPart === 0) {
        const conflict = notAllowedHorizontalOnEnd.filter((handler) => { return handler === lastCellHover; }) // if the user clicked on the fist part of the ships , and he want to placed it in some of the invalid cells , that is in the notAllowedHorizontalOnEnd array , ignore it
        if (conflict.length === 1) { return true }; //! if the length is 1 , that`s mean there is an invalid drop  , return true to go out
    }
    return false;
}
function invalidCellsAtTheStart() {
    if (numberOfTheShipPart !== 0) {
        const conflict = notAllowedHorizontalOnStart.filter((handler) => { return handler === lastCellHover; }) // if the user clicked on the any parts of the ships but not the first part, and he want to placed it in some of the invalid cells , that is in the notAllowedHorizontalOnStart array , ignore it
        if (conflict.length === 1) { return true }; //! if the length is 1 , that`s mean there is an invalid drop  , return true to go out
    }
    return false;
}
function invalidCellsBetweenTheFirstAndTheLast() {
    if (!cellTarget.classList.contains('end') && !cellTarget.classList.contains('start')) {
        const firstConflict = notAllowedHorizontalOnEnd.filter((handler) => { return lastCellHover === handler }) // this will check for the invalid cells at the end of the board, if found it will return it , so the length will be 1 , now i can check for length
        const secondConflict = notAllowedHorizontalOnEnd.filter((handler) => { return lastCellHover === handler })// this will check for the invalid cells  at the start of the board, if found it will return it , so the length will be 1 , now i can check for length
        if (firstConflict.length === 1 || secondConflict.length === 1) { //! if the length is 1 , that`s mean there is an invalid drop  , return true to go out
            return true
        }

    }
    return false;
}

//! requirement ship size |||  numberOfTheShipPart
function invalidRightMiddleCell() {
    if (numberOfTheShipPart === 0 && notAllowedHorizontalOnStart.includes(lastCellHover)) return false; //!  numberOfTheShipPart===0 and user clicked on 0-10-20-30,,, then it`s valid
    let tempLastCellHover = lastCellHover
    let findConflict;
    for (let i = 0; i < shipParts - numberOfTheShipPart; i++) {
        findConflict = notAllowedHorizontalOnStart.some((handler) => { return handler === tempLastCellHover }) // if an invalid cell spot was detected, return true.
        if (findConflict === true) return findConflict; // return if we have conflict or invalid cell
        tempLastCellHover++
    }
    return false;
}


function invalidLeftMiddleCell() {
    if (shipParts === numberOfTheShipPart + 1 && notAllowedHorizontalOnEnd.includes(lastCellHover)) return false //!fix .. shipParts===numberOfTheShipPart+1 and user clicked on 9-19-29-39,,,, then it`s valid
    let tempLastCellHover = lastCellHover
    let findConflict;
    for (let i = 0; i < numberOfTheShipPart + 1; i++) {
        findConflict = notAllowedHorizontalOnEnd.some((handler) => { return handler === tempLastCellHover }) // if an invalid cell spot was detected, return true.
        if (findConflict === true) return findConflict; // return if we have conflict or invalid cell
        tempLastCellHover--
    }
    return false;
}

//* [shipsSpotNumberOnBoard] 
function verifyIfShipsOnTheWay() {
    let numberOfCellToStartWith = lastCellHover - numberOfTheShipPart
    let findShipSOnTheWay;
    for (let i = 0; i < shipParts; i++) {
        findShipSOnTheWay = shipsIndexOnBoardWithGap.some(handler => { return numberOfCellToStartWith === handler })
        numberOfCellToStartWith++
        if (findShipSOnTheWay === true)
            return findShipSOnTheWay
    }
    return false
}


function removeShipAfterPlacing() {
    const ship = document.querySelector(`.${shipSize}-ship`);
    ship.setAttribute('draggable', false);
    ship.classList.add("placed-ship")
    shipsArray.push(ship);
    if (shipsArray.length === 4) { 
        let ships = document.querySelector(".ship-wrapper");
        ships.classList.add("remove-ship-container");
        document.querySelector(".scoreboard").classList.remove("hide-scoreboard");
        board.classList.add("board-slide-down")
        setTimeout(() => {
            document.querySelector(".scoreboard").classList.add("show-scoreboard")
            
        }, 1850)
        //HAMAD make the program stop for 2 sec for all animations to complete
    }
    // ship.remove();
}
const elementTimer = document.getElementById('time-counter');
var timer// must be 300 =5 min
resetTime()
let setTerval;
function timeCounter() {
    setTerval = setInterval(() => { timeFormat(--timer) }, 1000)
}

function timeFormat(timeInSecond) {
    let tempTimerInMin = timeInSecond / 60
    const tempTimerSecondRemained = ((tempTimerInMin % Math.floor(tempTimerInMin)) * 60).toFixed(0);
    tempTimerInMin = Math.floor(tempTimerInMin);

    if (tempTimerSecondRemained < 10 && tempTimerInMin > 0) {
        elementTimer.innerHTML = `${tempTimerInMin}:0${tempTimerSecondRemained}`
    } else if (tempTimerInMin > 0) {
        elementTimer.innerHTML = `${tempTimerInMin}:${tempTimerSecondRemained}`

    } else {
        if (timer < 10) {
            elementTimer.innerHTML = `0:0${timer}`
        } else {
            elementTimer.innerHTML = `0:${timer}`
        }
    }
    if (timer <= 0) {
        timeEnd()
        clearInterval(setTerval);
    }
}

document.getElementById('restart-button').addEventListener('click',()=>{
    restartBtnClicked();
})

function restartBtnClicked() {
    endGame=false;
    const boardModal = document.querySelector('.npc-modal');
    boardModal.classList.add("visually-hidden")
    timer = 302;
    resetEveryThing(); // my function line 376
    removeEndGameModal()
}

document.getElementById('main-menu-button').addEventListener('click',()=>{
    window.location.href='menu.html'
})

function resetEveryThing() {
    shipsIndexOnBoard=[]
    shipsIndexOnBoardWithGap=[]
    shipsValidationByName = []
    shipsArray = []
    board.innerHTML='' // remove cells in board
    createBoard();
    cellsEvents()
    returnShips()
}
function removeEndGameModal(){
    const endGameModal = document.querySelector(".endGame-modal")
    endGameModal.classList.add("visually-hidden")
}

function returnShips(){
    const ship = document.querySelectorAll(`.ship`);
    ship.forEach(handler =>{
        handler.setAttribute('draggable', true);
        handler.classList.remove("placed-ship")
    })
    let ships = document.querySelector(".ship-wrapper");
    document.querySelector(".scoreboard").classList.add("hide-scoreboard");
    document.querySelector(".ship-wrapper").classList.add("get-ship-container");
    document.querySelector(".board").classList.add("board-slide-up");
    setTimeout(() => {
        document.querySelector(".scoreboard").classList.remove("show-scoreboard");
        ships.classList.remove("remove-ship-container");
        document.querySelector(".board").classList.remove("board-slide-down");
        document.querySelector(".npc-modal").removeAttribute('style');
        document.querySelector(".npc-modal-body").classList.remove("show-npc-board")
    }, 2500);
    

}


function resetTime() {
    if (window.innerHeight <= 880) {
        timer = 302;
    }
    else timer = 300;
}



