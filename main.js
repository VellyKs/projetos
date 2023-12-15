<<<<<<< HEAD
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

=======
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

>>>>>>> 4fd211a4143bf293297aa8114ac37cfd6b46139f
document.getElementById('titulos').addEventListener('click', navegar);