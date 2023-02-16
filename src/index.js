import "./sass/style.scss";
import { menu } from './js/menu.js';
import { pageLoading } from './js/page-loading.js';
import { mobile } from "./js/mobile.js";
import lazySizes from 'lazysizes';

pageLoading();
menu();
mobile();


let largeScreen = window.matchMedia("(min-width: 992px)");

if (largeScreen.matches) {}