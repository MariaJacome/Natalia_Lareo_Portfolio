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

    //Función para desplazar el carrusel
    let posicionActualCarrusel = 0
    let desplazarCarrusel = function(incremento, direccion, sintransicion)
    {
        const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
        const windowWidth = window.innerWidth
        const difference = carruselContainerWidth - windowWidth

        //Comprobamos dirección del desplazamiento, positivo hacia la derecha, negativo hacia la izquierda
        if(direccion && posicionActualCarrusel < difference){
            //Desplazamiento es igual a posicion actual (pixels) mas el incremento definido
            posicionActualCarrusel = posicionActualCarrusel + incremento

            //Si despues de calcular el desplazamiento, nos hemos pasado del ancho del carrusel (difference), establecemos la posicion a la posicion máxima (diference)
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
            //if(sintransicion)carruselContainer.style.transition = 'transform 0.1s linear';
            if(sintransicion) carruselContainer.style.transition = 'none';
            carruselContainer.style.webkitTransform  = `translateX(-${posicionActualCarrusel}px)`;
        });
    }

    //Evento para desplazar el carrusel con el scroll
    let incrementoScroll = 200
    carrusel.addEventListener(`mousewheel` , function (e){
        desplazarCarrusel(incrementoScroll, e.deltaY > 0, false);
    })

    //Asignamos eventos para desplazar el carrusel con controles táctiles
    let ultimoX
    carrusel.addEventListener('touchstart', function(e){        
        ultimoX = e.touches[0].clientX; //inicializamos el punto actual de desplazamiento
    })

    //carrusel.addEventListener('touchmove', throttle(ejecutarTouchMove, milisegundosThrottle));
    carrusel.addEventListener('touchmove',  function (e) {
        let actualX = e.changedTouches[0].clientX;
            let incremento = Math.abs(actualX - ultimoX)    
            desplazarCarrusel(incremento, actualX<ultimoX, true);
            ultimoX = actualX;
    });

});










