import {showOptionList} from './scriptsReutilizables.js';
import {cambioPagina} from './scriptsFetch.js';
import {setupModalCloseButtons} from './scriptMensajes.js';

document.addEventListener('DOMContentLoaded', () => {
    showOptionList();
    cambioPagina();
    setupModalCloseButtons();
});
