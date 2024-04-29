'use strict'

/* Al hacer CLICK en .Header-hamburgerWrapper se añade la clase .isActive a .Header-menu */

const header = document.querySelector('.Header-wrapper')

const hamburguesa = header.querySelector('.Header-hamburger')
const headerNav = header.querySelector('.Header-nav')
const headerMenu = header.querySelector('.Header-menu')

hamburguesa.addEventListener(`click` , () => headerMenu.classList.toggle('isActive'))