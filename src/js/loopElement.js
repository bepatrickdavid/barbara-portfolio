import { gsap } from 'gsap';

export function loopElement() {
    let loopElement = document.querySelector('[class*="loop-element"] [class*="marquee--inner"]');

    var counter = 0;
    gsap.to(loopElement, {
        x: '-=50',
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
        onUpdate: () => {
            counter++;
            if (counter % 1000 == 0) {
                let node = loopElement.querySelectorAll('.wrapper')[1];
                const clone = node.cloneNode(true);
                loopElement.appendChild(clone);
            }
            if (counter % 4000 == 0) {
                loopElement.querySelectorAll('.wrapper')[0].remove();
            }
        }
    });
}