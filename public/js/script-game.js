
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