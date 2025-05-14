'use strict'
/*   
    Control de carruseles de imágenes
    - Scroll horizontal con rueda del ratón o gestos
    - Scroll vertical de la página no bloqueado
*/

const carruselList = document.querySelectorAll('.Carrusel')
const carruselContainerList = document.querySelectorAll('.Carrusel-container')

carruselList.forEach((eachCarrusel, index) => {
    const carrusel = carruselList[index]
    const carruselContainer = carruselContainerList[index]

    // Posición actual del scroll horizontal
    let posicionActualCarrusel = 0

    // Función para desplazar el carrusel
    let desplazarCarrusel = function(incremento, direccion, sintransicion) {
        const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
        const windowWidth = window.innerWidth
        const difference = carruselContainerWidth - windowWidth

        if (direccion && posicionActualCarrusel < difference) {
            posicionActualCarrusel += incremento
            if (posicionActualCarrusel > difference) {
                posicionActualCarrusel = difference
            }
        } else if (!direccion && posicionActualCarrusel > 0) {
            posicionActualCarrusel -= incremento
            if (posicionActualCarrusel < 0) {
                posicionActualCarrusel = 0
            }
        }

        requestAnimationFrame(() => {
            carruselContainer.style.transition = sintransicion ? 'none' : 'transform 0.5s ease-in-out'
            carruselContainer.style.webkitTransform = `translateX(-${posicionActualCarrusel}px)`
        })
    }

    // Scroll con la rueda del ratón (vertical -> horizontal)
    carrusel.addEventListener('wheel', (e) => {
        const carruselContainerWidth = carruselContainer.getBoundingClientRect().width
        const windowWidth = window.innerWidth
        const difference = carruselContainerWidth - windowWidth

        if (difference > 0) {
            e.preventDefault()
            desplazarCarrusel(Math.abs(e.deltaY), e.deltaY > 0, false)
        }
    }, { passive: false })

    // Control táctil (solo si el gesto es horizontal)
    let startX, startY
    carrusel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
    })

    carrusel.addEventListener('touchmove', (e) => {
        const moveX = e.touches[0].clientX
        const moveY = e.touches[0].clientY

        const diffX = moveX - startX
        const diffY = moveY - startY

        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault()
            desplazarCarrusel(Math.abs(diffX), diffX < 0, true)
            startX = moveX
        }
    }, { passive: false })
})
