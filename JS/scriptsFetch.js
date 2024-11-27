import { billAppDatosFactura } from './scriptsDatosPaginas.js';
import {
        showInfoTotal,
        changeTypeDocument,
        changeInputType,
        checkContentInput,
        setFechaEmision
} from './scriptsReutilizables.js';
import { generatePDF } from './scriptpdf.js';
import { showModal, setupModalCloseButtons } from './scriptMensajes.js';

const componentRegistry = {
    RealizarVenta: () => {
        showInfoTotal();
        setFechaEmision();
        changeTypeDocument();
        changeInputType();
        checkContentInput();
    },
    VentasRealizadas: () => {
        console.log('Inicializando Ventas Realizadas');
    },
    GuiaRemision: () => {
        console.log('Inicializando Guía de Remisión');
    },
    Proformas: () => {
      generatePDF();
    }
};

function cargarDatos(url) {
    const pageKey = url.replace('.html', '');
    const initializeComponent = componentRegistry[pageKey];

    if (initializeComponent) {
        initializeComponent();
    } else {
        console.warn(`No se encontraron funciones para inicializar la página: ${url}`);
    }
}

function cargarPagina(url) {
    fetch(url)
            .then((response) => response.text())
            .then((html) => {
                billAppDatosFactura.contentContainer.innerHTML = html;
                cargarDatos(url);
            })
            .catch((error) => {
                showModal("errorModal", error.message);
            });
}

function actualizarTotales(index) {
    const cantidadInput = document.getElementById(`cantidad_${index}`);
    const precioUnitarioInput = document.querySelector(`input[name="producto[${index}].precioUnitario"]`);
    const subtotalSpan = document.getElementById(`subtotal_${index}`);
    const subtotalHiddenInput = document.getElementById(`subtotalHidden_${index}`);
    const igvSpan = document.getElementById(`igv_${index}`);
    const igvHiddenInput = document.getElementById(`igvHidden_${index}`);
    const totalConIgvSpan = document.getElementById(`totalConIgv_${index}`);
    const totalConIgvHiddenInput = document.getElementById(`totalConIgvHidden_${index}`);

    if (cantidadInput && precioUnitarioInput && subtotalSpan && subtotalHiddenInput && igvSpan && igvHiddenInput && totalConIgvSpan && totalConIgvHiddenInput) {
        const cantidad = parseInt(cantidadInput.value);
        const precioUnitario = parseFloat(precioUnitarioInput.value);
        const subtotal = precioUnitario * cantidad;
        const igv = subtotal * IGV;
        const totalConIgv = subtotal + igv;
        const moneda = subtotalSpan.getAttribute('data-moneda') || '';

        subtotalSpan.textContent = `${moneda} ${parseFloat(subtotal).toFixed(2)}`;
        subtotalHiddenInput.value = parseFloat(subtotal).toFixed(2);

        igvSpan.textContent = `${moneda} ${parseFloat(igv).toFixed(2)}`;
        igvHiddenInput.value = parseFloat(igv).toFixed(2);

        totalConIgvSpan.textContent = `${moneda} ${parseFloat(totalConIgv).toFixed(2)}`;
        totalConIgvHiddenInput.value = parseFloat(totalConIgv).toFixed(2);
    }
}

export function cambioPagina() {
    window.onload = function () {
        setupModalCloseButtons();
        cargarPagina("defaultPage.html");
    };

    billAppDatosFactura.buttons.forEach((boton) => {
        boton.addEventListener("click", function () {
            let url = "";

            const buttonText = this.querySelector("span").innerText;

            switch (buttonText) {
                case "Realizar venta":
                    url = "RealizarVenta.html";
                    showModal("successModal", "Exito");
                    break;
                case "Ventas Realizadas":
                    url = "VentasRealizadas.html";
                    break;
                case "Guías de Remisión":
                    url = "GuiaRemision.html";
                    break;
                case "Proformas":
                    url = "Proformas.html";
                    break;
                case "Reportes":
                    url = "Reportes.html";
                    break;
                case "Clientes y Proveedores":
                    url = "ClientesProveedores.html";
                    break;
                case "Productos y Servicios":
                    url = "ProductosServicios.html";
                    break;
                case "Configuración":
                    url = "Configuracion.html";
                    break;
                default:
                    url = "DefaultPage.html";
                    break;
            }

            cargarPagina(url);
        });
    });

    billAppDatosFactura.contentContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('button[data-action="incrementar"]')) {
            const index = target.getAttribute('data-index');
            const cantidadInput = document.getElementById(`cantidad_${index}`);
            if (cantidadInput) {
                cantidadInput.value = parseInt(cantidadInput.value) + 1;
                actualizarTotales(index);
            }
        } else if (target.matches('button[data-action="decrementar"]')) {
            const index = target.getAttribute('data-index');
            const cantidadInput = document.getElementById(`cantidad_${index}`);
            if (cantidadInput && cantidadInput.value > 1) {
                cantidadInput.value = parseInt(cantidadInput.value) - 1;
                actualizarTotales(index);
            }
        } else if (target.matches('button[data-action="eliminar"]')) {
            const producto = target.closest('ol.contenedorProductosBody');
            if (producto) {
                producto.remove();
            }
        }
        // Add more events as needed
    });
}