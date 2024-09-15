import {showOptionList, showInfoTotal} from './scriptsReutilizables.js';
import {cambioPagina} from './scriptsFetch.js';

document.addEventListener('DOMContentLoaded', () => {
    showOptionList();
    showInfoTotal();
    cambioPagina();
});