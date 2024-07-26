'use strict'
/*   
    Archivo de Javascript que controla los carruseles de imágenes de la página Work y de las fichas de proyectos
        Seleccionamos los elementos que necesitamos
        Bloqueamos el scroll vertical al hacer hover sobre un carrusel
        Función que controla el dezplazamiento del carrusel
            Evento de desplazamiento con mousewheel
            Evento de desplazamiento con touchestart/move
*/

const carruselList = document.querySelectorAll('.Carrusel')
const carruselContainerList = document.querySelectorAll('.Carrusel-container')

carruselList.forEach (( eachCarrusel, index ) => {    
    const carrusel = carruselList[index]
    const carruselContainer = carruselContainerList[index]
    //Añadimos eventos para bloquear el scroll vertical cuando tenemos el ratón sobre un carrusel
    carrusel.addEventListener(`mouseover` , () => {
        document.body.style.overflowY = "hidden";
    })
    carrusel.addEventListener(`mouseout` , () => {
        document.body.style.overflowY = "auto";
    })

    //Función para desplazar el carrusel
    let posicionActualCarrusel = 0
    let desplazarCarrusel = function(incremento, direccion, sintransicion)
    {
        const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
        const windowWidth = window.innerWidth
        const difference = carruselContainerWidth - windowWidth

        //Comprobamos dirección del desplazamiento (boolean), positivo hacia la derecha, negativo hacia la izquierda
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
            if(sintransicion){
                carruselContainer.style.transition = 'none';
            }else{
                carruselContainer.style.transition = 'transform 0.5s ease-in-out';
            } 
            carruselContainer.style.webkitTransform  = `translateX(-${posicionActualCarrusel}px)`;
        });
    }

    //Evento para desplazar el carrusel con la rueda del ratón
    let incrementoScroll = 200
    carrusel.addEventListener(`mousewheel` , (e) => {
        desplazarCarrusel(incrementoScroll, e.deltaY > 0, false);
    })

    //Asignamos eventos para desplazar el carrusel con controles táctiles
    let ultimoX
    carrusel.addEventListener('touchstart', (e) => {        
        ultimoX = e.touches[0].clientX; //Inicializamos el punto actual de desplazamiento
    })
    carrusel.addEventListener('touchmove', (e) => {
        let actualX = e.changedTouches[0].clientX; //Obtenemos la posición actual
            let diferenciaPosicion = Math.abs(actualX - ultimoX) //Calculamos la diferencia absoluta(positiva) para saber cuánto nos desplazamos respecto a la posición anterior
            desplazarCarrusel(diferenciaPosicion, actualX<ultimoX, true);
            ultimoX = actualX; //Después de realizar el movimiento se actualiza la última posición
    });
});