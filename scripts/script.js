// this file, is for build the basic JS for HTML
/*
    - open and close mobile navigation
*/

const hamburgerNav = document.querySelector(".hamburger-nav")
const hamburgerBar = document.querySelectorAll(".hamburger-bar")
const mobileNav = document.querySelector('.mobile-navigation')

hamburgerNav.addEventListener('click', () => {
    hamburgerBar.forEach(bar => {
        bar.classList.toggle("bg-primary-black")
        bar.classList.toggle("bg-white")
    })

    hamburgerBar[1].classList.toggle("w-full")
    hamburgerBar[1].classList.toggle("w-1/2")

    hamburgerBar[2].classList.toggle("w-full")
    hamburgerBar[2].classList.toggle("w-3/4")

    mobileNav.classList.toggle('translate-y-[75px]')
})