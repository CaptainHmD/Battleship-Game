const htp_modal = document.getElementById("htp-modal")
const htp_btn = document.getElementById("htp-btn")
const htp_exit_btn = document.getElementById("htp-exit-btn");

const crdts_modal = document.getElementById("crdts-modal")
const body = document.getElementById("modal-body")
const crdts_btn = document.getElementById("crdts-btn")
const crdts_exit_btn = document.getElementById("crdts-exit-btn")
const crdts_exit_btn_sm = document.getElementById("crdts-exit-btn-sm")



modalActions(htp_btn, htp_exit_btn, htp_modal);

modalActions(crdts_btn, crdts_exit_btn, crdts_modal);
modalActions(crdts_btn, crdts_exit_btn_sm, crdts_modal);




//DRY DRY DRY

function modalActions(button,exit_button, modal) {
    openModal(button, modal);
    closeModal(exit_button, modal);
}


function openModal(button, modal) {
    button.addEventListener("click", () => {
        body.classList.remove("slideDown")
        modal.classList.remove("visually-hidden");
        body.classList.add("slideUp")
    })
}

function closeModal(button,modal) {
    button.addEventListener("click", () => {
        body.classList.remove("slideUp")
        body.classList.add("slideDown")
    })
    body.addEventListener("animationend", () => {
        if(body.classList.contains("slideDown"))
        modal.classList.add("visually-hidden")  
    })  
    
    
}







