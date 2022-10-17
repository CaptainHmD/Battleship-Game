
const board = document.querySelector('#board'); //! game board
createBoard();
const cells = document.querySelectorAll('[data-cell]');
var shipParts; //!
const dragAbles = document.querySelectorAll('.drag');
var lastCellHover; //!
var shipSize; //!
var numberOfTheShipPart;
const EventDelay = 1000;
const notAllowedHorizontalOnEnd = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
const notAllowedHorizontalOnStart = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const shipsIndexOnBoard = []; //TODO: the values will be pushed when the ships placed
const shipsIndexOnBoardWithGap = []; //TODO: the values will be pushed when the ships placed
var cellTarget;
// const notAllowedVertical = [90,]
addEvents();


function createBoard() {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-cell', '')
        cell.innerHTML = i  //TODO:  delete later ******* 
        board.appendChild(cell);

    }
}

function addEvents() {
    cells.forEach(cell => {
        cell.addEventListener('click', myClickHandler)
    }
    )
}
function removeEvent() {
    cells.forEach(cell => {
        cell.removeEventListener('click', myClickHandler)
    })
}


function myClickHandler(handler) {
    const tar = handler.target;

    if (tar.classList.contains('placed')) return // if the cell was clicked  don`t do anything

    console.log("Parent:", Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget)) //TODO:  delete later ******* 
    tar.innerHTML = 'clicked' //TODO:  delete later ******* 
    place(tar)
    EventTimeHandler();

}

function EventTimeHandler() {
    removeEvent();
    setTimeout(() => {
        addEvents();
    }, EventDelay)
}
const place = (cell) => { cell.classList.add('placed') }

//! ships
dragAbles.forEach(ships => {
    ships.addEventListener('dragstart', ship => { onDragStart(ship, ships) })
    ships.addEventListener('dragend', onDragEnd(ships))
    ships.addEventListener('mousedown', onMouseDown)
}) //! end of forEach for dragAbles


function onDragStart(ship, ships) {
    ships.classList.add('dragging'); //* for some effects
    console.log(ship.target);
    shipParts = ship.path[0].children.length;//* to get number of  ships part 
}
function onDragEnd(ships) {
    ships.classList.remove('dragging')//* to remove the effects
}

function onMouseDown(handler) {
    console.log(handler.target);
    cellTarget = handler.target;
    shipSize = (handler.target.id).split('-')[0]
    numberOfTheShipPart = parseInt((handler.target.id).split('-')[1])
    console.log('size:\t', shipSize); //* for knowing what is the size of the ship that has been clicked
    console.log('click:\t', numberOfTheShipPart); //* for knowing where is the parts the has been clicked
}



//! cells
cells.forEach(cell => {
    cell.addEventListener('dragover', dragOverTheCells) //* 1
    cell.addEventListener('drop', addShipsIntoCells, true) //* 2
})//! end of cells foreach for cells


function dragOverTheCells(handler) { //* 1

    handler.preventDefault()// cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    // console.log(handler);
    if (handler.target.classList.contains('placed')) { // any cells that have placed class 
        // console.log('tar\n\n', handler.target.classList.contains('placed'));
    }
    lastCellHover = Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget)
    // console.log(lastCellHover);
} // end of dragOverTheCells


/*
const notAllowedHorizontalOnEnd = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
const notAllowedHorizontalOnEStart = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
*/

// var cellTarget;
//! (shipParts) number of all parts in the ship that been clicked on 
//! (lastCellHover)  number of cell that user was hover on
//! (numberOfTheShipPart) what is the part of the ship that user clicked on
//! (shipSize) ship size (: but in text
function addShipsIntoCells(ship) { //* 2
    console.log('drop');
    console.log('lastCellHover: ', lastCellHover);
    console.log('shipParts: ', shipParts);
    console.log('numberOfTheShipPart: ', numberOfTheShipPart);
    console.log('shipSize ', shipSize);

    //TODO: conditions for the invalid drop cells
    if (invalidCellsAtTheEnd()) return
    console.log('1');
    if (invalidCellsAtTheStart()) return
    console.log('2');
    if (invalidCellsBetweenTheFirstAndTheLast()) return
    console.log('3');
    if (invalidRightMiddleCell()) return
    console.log('4');
    if (invalidLeftMiddleCell()) return
    console.log('5');
    //! The above conditions check of the cells is empty

    //TODO: Verify if a ship is present at the drop-off location.
    if (verifyIfShipsOnTheWay()) return
    console.log('6');

    addShipOnBoard();


    // console.table('shipsIndexOnBoard',shipsIndexOnBoard);
    shipsIndexOnBoardWithGap.sort();
    console.log('shipsIndexOnBoardWithGap', shipsIndexOnBoardWithGap);

}//end of addShipsIntoCells


function addShipOnBoard() {
    for (let i = 0; i < shipParts; i++) {
        if (i === 0) {
            lastCellHover = lastCellHover - numberOfTheShipPart; // it will reset to the first part of the ship, if and only if he didn't click on the first part of the ships
            cells.item(lastCellHover).classList.add('start')
        } else if (i === (shipParts - 1)) {
            cells.item(lastCellHover + i).classList.add('end')
        }
        cells.item(lastCellHover + i).classList.add('placed')
        cells.item(lastCellHover + i).classList.add('ship-placed')
    } // end for loop
    addShipIndexInArray()
    addShipIndexWithGapInArray()
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

