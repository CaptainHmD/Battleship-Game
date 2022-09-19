
const cells = document.querySelectorAll('[data-cell]');

const gameLoop=cells.forEach(cell =>{
    cell.addEventListener('click',(handler)=>{
        console.log('clicked');
        console.log(handler.currentTarget);

        const tar=handler.target;
        tar.innerHTML='clicked'
        place(tar)
    },{once:true})
})
const place= (cell)=>{
    cell.classList.add('placed')

}

cells.item(2).innerHTML='here'