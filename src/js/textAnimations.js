import SplitType from 'split-type';
import { gsap } from "gsap";

class textSplit {
    constructor(animationElems) {
        // this.lines = [];
        // this.text = [];
        this.text = new SplitType(animationElems, { types: "lines, words, chars" });
        this.tlTitleReveal = gsap.timeline();
        this.lines = this.text.lines;
        this.words = this.text.words;
        this.lines.forEach(l => {
            let chars = l.querySelectorAll('.char');
            let notValid = [];
            chars.forEach((element, i) => {
                if (element.textContent.includes('i') || element.textContent.includes('l') || element.textContent.includes('.') || element.textContent.includes(',') || element.textContent.includes(';')) {
                    notValid.push(i);
                }
            });
            let charsArray = Array.from({ length: chars.length }, (_, i) => i);
            let filteredChars = charsArray.filter(function(obj) { return notValid.indexOf(obj) == -1; });
            let randomChar = chars[filteredChars[Math.floor(Math.random() * filteredChars.length)]];
            randomChar.classList.add('alt');
        });
        this.initEvents();
        this.tlTitleReveal.set(this.words, { opacity: 0, y: '200%', scaleX: 1, scaleY: 1.7, });
    } in (delay = 0) {
        return gsap.timeline({
                defaults: { duration: 1, ease: 'power2', delay: delay }
            })
            .to(this.words, {
                opacity: 1,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                ease: 'power2',
                stagger: 0.1,
            });
    }
    initEvents() {
        window.addEventListener('resize', () => {
            // empty the lines array
            this.lines = [];
            this.words = [];
            // re initialize the Split Text 
            this.text.split();
            this.lines = this.text.lines;
            this.words = this.text.words;

            this.lines.forEach(l => {
                let chars = l.querySelectorAll('.char');
                let notValid = [];
                chars.forEach((element, i) => {
                    if (element.textContent.includes('i') || element.textContent.includes('l') || element.textContent.includes('.') || element.textContent.includes(',') || element.textContent.includes(';')) {
                        notValid.push(i);
                    }
                });
                let charsArray = Array.from({ length: chars.length }, (_, i) => i);
                let filteredChars = charsArray.filter(function(obj) { return notValid.indexOf(obj) == -1; });
                let randomChar = chars[filteredChars[Math.floor(Math.random() * filteredChars.length)]];
                randomChar.classList.add('alt');
            });

            gsap.set(this.words, {
                autoAlpha: 1
            });
        });
    }
}

class textWords {
    constructor(animationElems) {
        this.text = new SplitType(animationElems, { types: "words" });
        this.words = this.text.words;
        this.tlTitleReveal = gsap.timeline();
        this.initEvents();
        this.tlTitleReveal.set(this.words, { opacity: 0, rotateX: -40, rotateY: 13, });
    } in (delay = 0) {
        return gsap.timeline({
                defaults: { duration: 1, ease: 'power2', delay: delay }
            })
            .to(this.words, {
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                ease: 'power2',
                stagger: 0.08,
            });
    }
    initEvents() {
        window.addEventListener('resize', () => {
            // empty the lines array
            this.words = [];
            // re initialize the Split Text 
            this.text.split();
            this.words = this.text.words;

            gsap.set(this.words, {
                autoAlpha: 1
            });
        });
    }
}

export { textSplit, textWords };