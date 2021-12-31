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

// Quick Shortcut to the search bar
window.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key === "k")
    {
        e.preventDefault();
        // alert("ctrl + k !!!")
        let searchInput = document.querySelectorAll(".searchBar input")
        searchInput.forEach(inp => {
            // find the one who didn't have the hidden class, then make it like clicked
            if(!inp.classList.contains("hidden")) inp.focus();
        })
    }
})