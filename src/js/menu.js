import $ from 'jquery';
/*-------------------------------------------------*/
/* =  Menu
/*-------------------------------------------------*/
function menu() {

    const menuButtonOpen = document.querySelector('#main-menu [class*="menu-button"]');

    // opens the menu
    const openMenu = () => {}

    //openMenu
    menuButtonOpen.addEventListener('click', openMenu);

    //anchor smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            console.log('click');
            e.preventDefault();

            let element = document.querySelector(anchor.getAttribute('href'));
            window.scrollTo({ top: element.offsetTop, left: element.offsetLeft, behavior: "smooth" });
        });
    });

    //automatic year
    const yearEl = document.querySelectorAll('[data-year]');
    yearEl.forEach(element => {

        element.innerHTML = new Date().getFullYear();
    });
}

export { menu };