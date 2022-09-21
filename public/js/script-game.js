
const cells = document.querySelectorAll('[data-cell]');
addEvent();
function removeEvent() {
    cells.forEach(cell => {
        cell.removeEventListener('click', myClickHandler)
    })
}

function addEvent() {
    cells.forEach(cell => {
        cell.addEventListener('click', myClickHandler)
    }
    )
}

function EventTimeHandler() {
    removeEvent();
    setTimeout(() => {
        addEvent();

    }, 3000)

}

function myClickHandler(handler) {
    console.log('clicked');
    console.log("Parent:", Array.from(handler.currentTarget.parentNode.children).indexOf(handler.currentTarget))

    const tar = handler.target;
    tar.innerHTML = 'clicked'
    place(tar)
    EventTimeHandler();

}







const place = (cell) => {
    cell.classList.add('placed')

}

//test
var remove = false;


cells.item(2).innerHTML = 'here'