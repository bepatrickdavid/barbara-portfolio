import { gsap } from "gsap";
import { textSplit, textWords } from './textAnimations.js';
import { fontCheck } from './fontCheck.js';

export function pageLoading() {
    let heroTitle = new textSplit(document.querySelectorAll('[data-animation="hero"]'));
    let mainWrap = document.querySelector('#main-wrap');
    let mainMenu = document.querySelector('#header');
    let pageHeader = document.querySelector('[class*="page-header"]');
    let pageContent = document.querySelector('[class*="page-content"]');
    let footer = document.querySelector('footer');
    let body = document.querySelector('body');

    fontCheck();

    function animationIntro() {
        gsap.to(mainMenu, {
            autoAlpha: 1,
            duration: 1,
            delay: 0.2
        })
        gsap.to(pageHeader, {
            autoAlpha: 1,
            duration: 1,
            delay: 0.2
        })
        gsap.to(pageContent, {
            autoAlpha: 1,
            duration: 1,
            delay: 0.2
        })
        gsap.to(footer, {
            autoAlpha: 1,
            duration: 0.1,
            delay: 0.2,
            onComplete: () => {
                heroTitle.in();
            }
        })
    }

    //Animation loading
    gsap.timeline({
            onComplete: () => {
                mainWrap.style.opacity = "1";
                animationIntro();
            }
        })
        .set(mainMenu, {
            autoAlpha: 0
        })
        .set(pageHeader, {
            autoAlpha: 0
        })
        .set(pageContent, {
            autoAlpha: 0
        })
        .set(footer, {
            autoAlpha: 0
        })

    //heading animation
    const animationsHeading = (target) => {
        gsap.set(target, {
            autoAlpha: 0
        });
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = new textSplit(entry.target);
                    let delay = 0;
                    if (target.dataset.animationDelay && target.dataset.animationDelay !== undefined) {
                        delay = target.dataset.animationDelay;
                    }
                    gsap.set(target, {
                        autoAlpha: 1
                    });
                    element.in(delay);
                    observer.disconnect();
                }
            })
        }, { threshold: [0.7] });

        io.observe(target);
    }
    const hAnimations = document.querySelectorAll("[data-animation='split']");
    hAnimations.forEach(animationsHeading);

    //paragraph animation
    const animationsParagraph = (target) => {
        gsap.set(target, {
            autoAlpha: 0
        });
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = new textWords(entry.target);
                    let delay = 0;
                    if (target.dataset.animationDelay && target.dataset.animationDelay !== undefined) {
                        delay = target.dataset.animationDelay;
                    }
                    gsap.set(target, {
                        autoAlpha: 1
                    });
                    element.in(delay);
                    observer.disconnect();
                }
            })
        }, { threshold: [0.7] });

        io.observe(target);
    }
    const pAnimations = document.querySelectorAll("[data-animation='text']");
    pAnimations.forEach(animationsParagraph);

    const animationsFade = (target) => {
        gsap.set(target, {
            opacity: 0
        });
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let delay = 0;
                    if (target.dataset.animationDelay && target.dataset.animationDelay !== undefined) {
                        delay = target.dataset.animationDelay;
                    }
                    gsap.to(target, {
                        opacity: 1,
                        ease: 'power2',
                        duration: 1,
                        delay: delay,
                    });
                    observer.disconnect();
                }
            })
        }, { threshold: [0.7] });

        io.observe(target);
    }
    const fadeAnimations = document.querySelectorAll("[data-animation='fade']");
    fadeAnimations.forEach(animationsFade);
}