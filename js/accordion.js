'use strict'

/*   Al hacer CLICK sobre un .Accordion-btn le añadimos la clase .isActive a su .Accordion-content
     Al hacer CLICK en otro .Accordion-btn quitamos la clase .isActive a todos los bloques de contenido y se le añade la clase .isActive al .Accordion-content correspondiente
*/

const main = document.querySelector('.Main')

const accordionBtns = main.querySelectorAll('.Accordion-btn')
const accordionBtnContact = main.querySelector('.Accordion-btn--contact')
const accordionContent = main.querySelectorAll('.Accordion-content')
const accordionContact = main.querySelector('.Accordion-contact')

console.log(accordionBtns)
console.log(accordionBtnContact)
console.log(accordionContent)
console.log(accordionContact)

accordionBtns.forEach( ( eachBtn , index) => {
    accordionBtns[index].addEventListener(`click` , ( ) => {
        accordionContent.forEach( ( eachContent , index) => {
            accordionContent[index].classList.toggle('isActive')
            accordionBtns[index].classList.toggle('isActive')
        })
    })
})

accordionBtnContact.addEventListener(`click` , ( ) => {
    accordionBtnContact.classList.toggle('isActive')
    accordionContact.classList.toggle('isActive')
})


