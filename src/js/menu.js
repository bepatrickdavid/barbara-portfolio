import $ from 'jquery';
import { gsap } from "gsap";
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

function headerGradient() {

    window.addEventListener('load', function() {
        const svg = document.querySelector('#gradient-svg');

        const moveGradient = () => {
            // Get the SVG element and calculate its initial position
            const initialX = svg.getBoundingClientRect().left;
            const initialY = svg.getBoundingClientRect().top;

            // Define the maximum distance the SVG can move from its initial position
            const maxDistance = Math.min(svg.getBoundingClientRect().left, svg.getBoundingClientRect().top) * -0.3;

            // Add an event listener to the document to track mouse movement
            document.addEventListener('mousemove', (event) => {
                // Calculate the distance between the mouse position and the initial position
                const distanceX = event.clientX - initialX;
                const distanceY = event.clientY - initialY;
                const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

                // Limit the distance to the maximum distance
                const limitedDistance = Math.min(distance, maxDistance);

                // Calculate the new position of the SVG
                const newX = initialX + (distanceX / distance) * limitedDistance;
                const newY = initialY + (distanceY / distance) * limitedDistance;

                // Use GSAP to move the SVG smoothly to the new position
                gsap.to(svg, {
                    duration: 1,
                    x: newX - svg.getBoundingClientRect().left,
                    y: newY - svg.getBoundingClientRect().top,
                    ease: 'power2.out'
                });
            })
        }
        moveGradient();
    });

}

export { menu, headerGradient };