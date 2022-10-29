


function confirmName() {

     document.querySelector(".ship-wrapper").classList.add("get-ship-container")


    const playerName = document.getElementById("player-name");
    const inputName = document.getElementById("username");
     let name = inputName.value;

     if (name.replace(/\s/g, '').length === 0) { 
          name = "Player 1";
     }

     playerName.innerText = name;
     closeModal("usrname");
}



function closeModal(name) {
     const modal = document.getElementById(`${name}-modal`);
     const body  = document.getElementById(`${name}-modal-body`)
     body.classList.add("slide-down-username")
     setTimeout(() => {
          modal.classList.add("visually-hidden")
     },650)
}
