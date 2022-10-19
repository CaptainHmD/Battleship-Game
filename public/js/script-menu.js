
let currModal = {};


function init(name) {
    currModal = {
        "modal": document.getElementById(`${name}-modal`),
        "btn": document.getElementById(`${name}-btn`),
        "exitBtn": document.getElementById(`${name}-exit-btn`),
        "body": document.getElementById(`${name}-modal-body`),
    }
    openModal(currModal['exitBtn'], currModal['modal'], currModal['body']);
}



function openModal(exit_button, modal, body) {
    modal.focus()
    body.classList.remove("slideDown")
    modal.classList.remove("visually-hidden");
    body.classList.add("slideUp")
    closeModal(exit_button, modal, body);
}



function closeModal(button, modal, body) {
    
    const close = () => {
        body.classList.remove("slideUp")
        body.classList.add("slideDown")
        setTimeout(() => {
            modal.classList.add("visually-hidden")
        },150)
    }


    button.addEventListener('click', () => {
        close();
    })
    document.body.addEventListener('keydown', (event) => {
        if (event.key === "Escape")
            close();
    })
    

}


