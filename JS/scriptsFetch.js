import { billAppDatosFactura } from "./scriptsDatosPaginas.js";
import {
  showInfoTotal,
  showClientSearchBar,
  showProductSearchBar,
  changeTypeDocument,
} from "./scriptsReutilizables.js";
import { showModal, setupModalCloseButtons } from "./scriptMensajes.js";

function cargarDatos() {
  showInfoTotal();
  showClientSearchBar();
  showProductSearchBar();
  changeTypeDocument();
}

function cargarPagina(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      billAppDatosFactura.contentContainer.innerHTML = html;
      if (url === "RealizarVenta.html") {
        cargarDatos();
      }
    })
    .catch((error) => {
      showModal("errorModal", error);
    });
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
          url = "defaultPage.html";
          break;
      }

      cargarPagina(url);
    });
  });
}
