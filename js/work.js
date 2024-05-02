'use strict'

const carruselList = document.querySelectorAll('.Carrusel')
const carruselContainerList = document.querySelectorAll('.Carrusel-container')




carruselList.forEach (( eachCarrusel, index ) => {   
    
    const carrusel = carruselList[index]
    const carruselContainer = carruselContainerList[index]
    
    carrusel.addEventListener(`mouseover` , function (){
        document.body.style.overflowY = "hidden";
    })

    carrusel.addEventListener(`mouseout` , function () {
        document.body.style.overflowY = "auto";
    })

    let posicionActualCarrusel = 0
    let desplazarCarrusel = function(incremento, direccion)
    {
        const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
        const windowWidth = window.innerWidth
        const difference = carruselContainerWidth - windowWidth

        //Comprobamos direccion del desplazamiento, positivo hacia la derecha, negativo hacia la izquierda
        if(direccion && posicionActualCarrusel < difference){
            //Desplazamiento es igual a posicion actual (pixels) mas el incremento definido
            posicionActualCarrusel = posicionActualCarrusel + incremento

            //Si despues de calcular el desplazamiento, nos hemos pasado del ancho del carrusel (diference), establecemos la posicion a la posicion máxima (diference)
            if(posicionActualCarrusel > difference){
                posicionActualCarrusel = difference
            }
        }else if (!direccion && posicionActualCarrusel > 0){       
            //Desplazamiento es igual a posicion actual (pixels) menos el incremento definido
            posicionActualCarrusel = posicionActualCarrusel - incremento
            
            //Si despues de calcular el desplazamiento, nos hemos pasado a una posicion negativa, establecemos la posicion a 0, la posicion mínima
            if(posicionActualCarrusel < 0){
                posicionActualCarrusel = 0
            }
        }
        //Efectuamos el desplazamiento proviamente calculado
        requestAnimationFrame(()=>{
            carruselContainer.style.transform = `translateX(-${posicionActualCarrusel}px)`
        });
    }

    
    let incrementoScroll = 200
    carrusel.addEventListener(`mousewheel` , function (e){
        desplazarCarrusel(incrementoScroll, e.deltaY > 0);
    })

    let ultimoX
    carrusel.addEventListener('touchstart', function(e){        
        ultimoX = e.touches[0].clientX;
    })
    carrusel.addEventListener('touchmove', function(e){        
        let actualX = e.touches[0].clientX;
        let incremento = Math.abs(actualX - ultimoX)
        desplazarCarrusel(incremento*2, actualX<ultimoX);
        ultimoX = actualX;
    })

 
});










