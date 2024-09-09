import {billAppDatosFactura} from './scriptsDatosPaginas.js';
import {showModal} from './scriptMensajes.js';

export function cambioPagina() {
  billAppDatosFactura.buttons.forEach(boton => {
    boton.addEventListener("click", function () {
      let url = "";

      const buttonText = this.querySelector('span').innerText;

      switch (buttonText) {
        case "Realizar venta":
          url = "RealizarVenta.html";
          showModal('successModal', "Exito");
          break;
        case "Ventas Realizadas":
          url = "VentasRealizadas.html";
          showModal('successModal', "Exito");
          break;
        case "Guías de Remisión":
          url = "GuiaRemision.html";
          showModal('successModal', "Exito");
          break;
        case "Proformas":
          url = "Proformas.html";
          showModal('successModal', "Exito");
          break;
        case "Reportes":
          url = "Reportes.html";
          showModal('successModal', "Exito");
          break;
        case "Clientes y Proveedores":
          url = "ClientesProveedores.html";
          showModal('successModal', "Exito");
          break;
        case "Productos y Servicios":
          url = "ProductosServicios.html";
          showModal('successModal', "Exito");
          break;
        case "Configuración":
          url = "Configuracion.html";
          showModal('successModal', "Exito");
          break;
        default:
          url = "defaultPage.html";
          break;
      }

      fetch(url)
        .then(response => response.text())
        .then(html => {
          billAppDatosFactura.contentContainer.innerHTML = html;
        })
        .catch((error) => {
            showModal('errorModal', error);
        });
    });
  });
}

