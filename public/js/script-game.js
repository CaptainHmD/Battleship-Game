
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
    console.log('clicked');
    console.log("Parent:", Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget))

    const tar = handler.target;
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