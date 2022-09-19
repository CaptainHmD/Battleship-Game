const modal = document.getElementById("htp-modal")
const btn = document.getElementById("htp-btn")
const exitBtn = document.getElementById("exit-btn");

btn.addEventListener("click", () => {
     modal.classList.remove("visually-hidden")
})

exitBtn.addEventListener("click", () => {
    modal.classList.add("visually-hidden")
})