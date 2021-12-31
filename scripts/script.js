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

// const searchBarInput = document.querySelectorAll(".searchBar > input")
// searchBarInput.forEach(input => {
//     input.addEventListener('keyup', function(e){
//         if(e.keyCode === 13) input.nextElementSibling.click()
//     })
// })
// const searchBarEnter = document.querySelectorAll(".searchBar > span")
// searchBarEnter.forEach(enter => {
//     enter.addEventListener('click', () => {
//         alert("Sorry, the search bar is not available yet :)")
//     })
// })