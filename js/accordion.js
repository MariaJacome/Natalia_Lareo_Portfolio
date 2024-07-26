'use strict'
/*   
    Archivo de Javascript que controla los acordeones de la página about
        Seleccionamos los elementos que necesitamos
        Para cada botón del primer acordeón añadimos un Event Listener y gestionamos la clase isActive
        Para el botón del acordeón de contacto añadimos un Event Listener y gestionamos la clase isActive

    Al hacer CLICK sobre un .Accordion-btn le añadimos la clase .isActive a su .Accordion-content
    Al hacer CLICK en otro .Accordion-btn quitamos la clase .isActive a todos los bloques de contenido y se le añade la clase .isActive al .Accordion-content correspondiente
*/

const aside = document.querySelector('.Aside')

const accordionBtn = aside.querySelector('.Accordion-btn')
const accordionContent = aside.querySelector('.Accordion-content')

accordionBtn.addEventListener(`click` , ( ) => {
    accordionBtn.classList.toggle('isActive')
    accordionContent.classList.toggle('isActive')
})