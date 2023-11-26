'use strict'
//projetos nav

const navegar = (target) => {
    const pai = document.getElementById('titulos')
    const old = pai.querySelector('.active')
    old.classList.remove('active')
    const element = target.target;
    console.log(old)
    
    element.classList.add('active')

    

}

document.getElementById('titulos').addEventListener('click', navegar);