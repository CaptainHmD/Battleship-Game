
const board = document.querySelector('#board'); //! game board
function createBoard () {
    for(let i = 0 ; i < 100; i ++){
        const cell =  document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('data-cell','')
        board.appendChild(cell);

    }
}
createBoard();

const cells = document.querySelectorAll('[data-cell]');

addEvent();
const EventDelay = 2000;
function addEvent() {
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
    console.log('clicked');
    console.log("Parent:", Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget))
    tar.innerHTML = 'clicked'
    place(tar)
    EventTimeHandler();

}

function EventTimeHandler() {
    removeEvent();
    setTimeout(() => {
        addEvent();

    }, EventDelay)

}

const place = (cell) => {
    cell.classList.add('placed')

}



cells.item(2).innerHTML = 'here'

//const cells = document.querySelectorAll('[data-cell]');

// const board = document.querySelector('#board'); //! game board


const dragAbles = document.querySelectorAll('.drag')

dragAbles.forEach(ships => {
    ships.addEventListener('dragstart', ship => { // this will start when you dragging the ships 
        console.log('dragging');
        ships.classList.add('dragging'); // for some effects
        console.log(ship.target);
    })
    ships.addEventListener('dragend', ship => {
        ships.classList.remove('dragging')// to remove the effects
        console.log(ship.target);

    })
    ships.addEventListener('mousedown', handler => {
        console.log('click:\t', (handler.target.id).split('-')[1]); //! for knowing where is the parts the has been clicked
        // console.log(Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget));

    })
})

cells.forEach(cell => {
    cell.addEventListener('dragover', handler => {
        handler.preventDefault()// cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        console.log("handler \t\t", handler);
        console.log('tar\n\n', handler.target);
        console.log(Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget));
    })
})
