import "./sass/style.scss";
import { headerGradient } from './js/menu.js';
import { pageLoading } from './js/page-loading.js';
import { mobile } from "./js/mobile.js";
import { darkMode } from "./js/dark-mode.js";
import { loopElement } from "./js/loopElement.js";
import lazySizes from 'lazysizes';
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

pageLoading();
headerGradient();
mobile();
darkMode();
loopElement();


let largeScreen = window.matchMedia("(max-width: 992px)");

if (largeScreen.matches) {}

document.addEventListener("DOMContentLoaded", () => {
    let videoElement = document.querySelector('#video [class*="wrapimage-element--video"]');
    let contentHome = document.querySelector('[class*="page-content"][class*="home"]');
    let videoElementGapTop, videoElementGapLeft, videoElementWidth;

    const videoMoove = () => {
        if (largeScreen.matches) {
            videoElementGapLeft = '0';
            videoElementGapTop = '50px';
            videoElementWidth = '92.5%';
        } else {
            videoElementGapLeft = '0';
            videoElementGapTop = '268px';
            videoElementWidth = '100%';
        }
        gsap.to(videoElement, {
            //width: '100%',
            x: videoElementGapLeft,
            y: videoElementGapTop,
            width: videoElementWidth,
            scrollTrigger: {
                trigger: contentHome,
                start: "top center",
                end: "top 10%",
                scrub: 0.1,
                //markers: true,
            }
        });
    };
    videoMoove();
});