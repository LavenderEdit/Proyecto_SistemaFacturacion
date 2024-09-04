import {signInDatos} from './scriptsDatosPaginas.js';

//Función para volver visible la contraseña
export function togglePassword() {
    if (signInDatos.btnMostrarContra && signInDatos.inputContra) {
        signInDatos.btnMostrarContra.addEventListener('click', function () {
            if (signInDatos.inputContra.type === 'password') {
                signInDatos.inputContra.type = 'text';
                signInDatos.iconoOjoAbierto.style.display = 'none';
                signInDatos.iconoOjoCerrado.style.display = 'block';
            } else {
                signInDatos.inputContra.type = 'password';
                signInDatos.iconoOjoAbierto.style.display = 'block';
                signInDatos.iconoOjoCerrado.style.display = 'none';
            }
        });
    }
}