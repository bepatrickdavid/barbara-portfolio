import "../sass/style.scss";
import { menu } from './menu.js';
import { pageLoading } from './page-loading.js';
import { mobile } from "./mobile.js";
import lazySizes from 'lazysizes';

pageLoading();
menu();
mobile();