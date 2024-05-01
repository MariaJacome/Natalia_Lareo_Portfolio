'use strict'

const carruselContainer = document.querySelector('.Carrusel-container--woty')
const carruselImg = document.querySelectorAll('.Carrusel-img')

let posicion = 0

const moveContainer = () => {
    carruselContainer.style.transform = `translateX(-${posicion * (100 / 9)}%)`
}

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

carruselContainer.addEventListener(`mousewheel` , carruselContainerHandler)
window.addEventListener(`keydown` , windowHandler)