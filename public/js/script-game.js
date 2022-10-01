
const board = document.querySelector('#board'); //! game board
createBoard();
const cells = document.querySelectorAll('[data-cell]');
var shipParts; //!
const dragAbles = document.querySelectorAll('.drag');
var lastCellHover; //!
var shipSize; //!
var numberOfTheShipPart;
const EventDelay = 1000;
const notAllowedHorizontalOnEnd = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
const notAllowedHorizontalOnEStart = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

const notAllowedVertical = [90,]

addEvents();


// document.addEventListener("dragover", function(event) {
//     event.preventDefault();
//   });
// document.addEventListener("drop", function(event) {
//     event.preventDefault();
//   });

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

    if (tar.classList.contains('placed')) { // if the cell was clicked  don`t do anything
        return;
    }
    console.log('clicked'); //TODO:  delete later ******* 
    console.log("Parent:", Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget)) //TODO:  delete later ******* 
    tar.innerHTML = 'clicked' //TODO:  delete later ******* 
    place(tar)
    EventTimeHandler();

}

function EventTimeHandler() {
    removeEvent();
    setTimeout(() => {
        addEvent();
    }, EventDelay)
}
const place = (cell) => {cell.classList.add('placed')}

dragAbles.forEach(ships => {
    ships.addEventListener('dragstart', ship => {onDragStart(ship, ships)})
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
    shipSize = (handler.target.id).split('-')[0];
    numberOfTheShipPart = (handler.target.id).split('-')[1]
    console.log('size:\t', shipSize); //* for knowing what is the size of the ship that has been clicked
    console.log('click:\t', numberOfTheShipPart); //* for knowing where is the parts the has been clicked
}




cells.forEach(cell => {
    cell.addEventListener('dragover', dragOverTheCells)
    cell.addEventListener('drop', addShipsIntoCells, true)
})//! end of cells foreach for cells



function addShipsIntoCells(ship) {
    console.log('drop');
    console.log(ship.target);
    for (let i = 0; i < shipParts; i++) {
        if (i === 0) {
            cells.item(lastCellHover).classList.add('start')
            cells.item(lastCellHover).classList.add('placed')

        } else if (i === (shipParts - 1)) {
            cells.item(lastCellHover + i).classList.add('end')
        }
        cells.item(lastCellHover + i).classList.add('placed')
        cells.item(lastCellHover + i).classList.add('ship-placed')

    } // end for loop


}//end of addShipsIntoCells


function dragOverTheCells(handler) {

    handler.preventDefault()// cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    // console.log(handler);
    if (handler.target.classList.contains('placed')) { // any cells that have placed class 
        // console.log('tar\n\n', handler.target.classList.contains('placed'));
    }
    lastCellHover = Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget)
    // console.log(lastCellHover);
} // end of dragOverTheCells