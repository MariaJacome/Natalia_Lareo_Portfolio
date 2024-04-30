'use strict'

const carruselContainer = document.querySelector('.Carrusel-container--woty')
const carruselBtn = document.querySelectorAll('.Carrusel-btn')
const carruselImg = document.querySelectorAll('.Carrusel-img')

let posicion = 0

const moveContainer = () => {
    carruselContainer.style.transform = `translateX(-${posicion * (100 / 9)}%)`
}

/*const limitarPosicion = () => {
    posicion = Math.max(0, Math.min(posicion, numElementos - 1));
};*/

const carruselContainerHandler = e => {
    if(e.deltaY > 0){
        posicion++
    }else{
        posicion--
    }
    moveContainer()
    limitarPosicion
}

const windowHandler = e => {
    if( e.code === 'ArrowRight'){
        posicion++
    }else{
        posicion--
    }
    moveContainer()
    limitarPosicion()
}


let avanzarBtn = function(){
    carruselBtn.forEach( function( eachBtn , index ){
        carruselBtn[index].classList.remove('isActive')    
    })
    carruselBtn[posicion].classList.add('isActive')
}

carruselBtn.forEach(function( eachBtn , index ){
    carruselBtn[index].addEventListener(`click` , function(){
        posicion = index
        moveContainer()
        avanzarBtn()
    })
})

carruselContainer.addEventListener(`mousewheel` , carruselContainerHandler)
window.addEventListener(`keydown` , windowHandler)