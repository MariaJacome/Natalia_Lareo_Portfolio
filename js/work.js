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

    //funcion para desplazar el carrusel
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

    //evento para desplazar el carrusel con el scroll
    let incrementoScroll = 200
    carrusel.addEventListener(`mousewheel` , function (e){
        desplazarCarrusel(incrementoScroll, e.deltaY > 0);
    })


    //funciones para desplazar el carrusel con controles tactiles
    let contadorEventosEjecutados = 0; //DEBUG
    let contadorEventosTotales = 0; //DEBUG
    let bloquearEvento = false;
    function throttle(callbackFuncion, msThrottle) {
        return function() {          
            contadorEventosTotales++; //DEBUG
            if (!bloquearEvento) {              
                contadorEventosEjecutados++; //DEBUG
                callbackFuncion.apply(this, arguments);
                bloquearEvento = true;
                setTimeout(() => {bloquearEvento = false;}, msThrottle);
            }
        };
    }

    function ejecutarTouchMove(e) {
        let actualX = e.changedTouches[0].clientX;
        let incremento = Math.abs(actualX - ultimoX)    
        desplazarCarrusel(incremento*4, actualX<ultimoX);
        ultimoX = actualX;
    }

    //asignamos eventos para desplazar el carrusel con controles tactiles
    let ultimoX
    let milisegundosThrottle = 100
    carrusel.addEventListener('touchstart', function(e){        
        ultimoX = e.touches[0].clientX;
    })
    carrusel.addEventListener('touchmove', throttle(ejecutarTouchMove, milisegundosThrottle));
    carrusel.addEventListener('touchend',  function (e) {
        ejecutarTouchMove(e);
        console.log("Eventos ejecutados: " + contadorEventosEjecutados); //DEBUG
        console.log("Eventos totales: " + contadorEventosTotales); //DEBUG
        contadorEventosEjecutados = 0; //DEBUG
        contadorEventosTotales = 0; //DEBUG
    });


    
});










