'use strict'

const carrusel = document.querySelector('.Carrusel')
const carruselContainer = document.querySelector('.Carrusel-container')

carrusel.addEventListener(`mouseover` , function (){
    document.body.style.overflowY = "hidden";
})

carrusel.addEventListener(`mouseout` , function (){
    document.body.style.overflowY = "auto";
})

let pixels = 0
let increase = 100


carrusel.addEventListener(`mousewheel` , function (e){
    const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
    const windowWidth = window.innerWidth
    const difference = carruselContainerWidth - windowWidth

    //Comprobamos direccion del desplazamiento
    if(e.deltaY > 0 && pixels < difference){
        //Desplazamiento es igual a posicion actual (pixels) mas el incremento definido
        pixels = pixels + increase

        //Si despues de calcular el desplazamiento, nos hemos pasado del ancho del carrusel (diference), establecemos la posicion a la posicion máxima (diference)
        if(pixels > difference){
            pixels = difference
        }
    }else if (e.deltaY < 0 && pixels > 0){       
        //Desplazamiento es igual a posicion actual (pixels) menos el incremento definido
        pixels = pixels - increase
        
        //Si despues de calcular el desplazamiento, nos hemos pasado a una posicion negativa, establecemos la posicion a 0, la posicion mínima
        if(pixels < 0){
            pixels = 0
        }
    }
    //Efectuamos el desplazamiento proviamente calculado
    carruselContainer.style.transform = `translateX(-${pixels}px)`
})

