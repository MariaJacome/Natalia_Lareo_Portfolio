'use strict'

const carruselContainer = document.querySelector('.Carrusel-container')
const carruselBtn = document.querySelectorAll('.Carrusel-btn')
const carruselImg = document.querySelectorAll('.Carrusel-img')


let posicion = 0

let avanzarBtn = function(){
    carruselBtn.forEach( function( eachBtn , index ){
        carruselBtn[index].classList.remove('isActive')    
    })
    carruselBtn[posicion].classList.add('isActive')
}

carruselBtn.forEach(function( eachBtn , index ){
    carruselBtn[index].addEventListener(`click` , function(){
        posicion = index
        carruselContainer.style.transform = `translateX(-${posicion * (100 / 3)}%)`
        avanzarBtn()
    })
})