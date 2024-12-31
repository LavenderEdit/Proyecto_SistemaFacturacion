import { billAppDatosFactura } from "./scriptsDatosPaginas.js";
import {
  showInfoTotal,
  changeTypeDocument,
  changeInputType,
  checkContentInput,
  setFechaEmision,
  inicializarInputEditar,
  inicializarModalUno,
} from "./scriptsReutilizables.js";
import { inicializarFactura, calcularTotales } from "./Reutilizables2.js";
import { inicializarClickProducto } from "./scriptsGet.js";
import { generatePDF } from "./scriptpdf.js";
import { showModal, setupModalCloseButtons } from "./scriptMensajes.js";
import { setModalCloseButtons } from "./Modales.js";

const componentRegistry = {
  DefaultPage: () => {
    console.log("Bienvenido...");
  },
  RealizarVenta: () => {
    showInfoTotal();
    setFechaEmision();
    changeTypeDocument();
    changeInputType();
    checkContentInput();
    inicializarInputEditar();
    inicializarModalUno();
    inicializarClickProducto();
    inicializarFactura();
  },
  VentasRealizadas: () => {
    console.log("Inicializando Ventas Realizadas");
  },
  GuiaRemision: () => {
    console.log("Inicializando Guía de Remisión");
  },
  Proformas: () => {
    generatePDF();
  },
};

function cargarDatos(url) {
  const pageKey = url.replace(".html", "");
  const initializeComponent = componentRegistry[pageKey];

  if (initializeComponent) {
    initializeComponent();
  } else {
    console.warn(
      `No se encontraron funciones para inicializar la página: ${url}`
    );
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
      console.error(`Error: ${error.message}`);
    });
}

export function cambioPagina() {
  window.onload = function () {
    setupModalCloseButtons();
    setModalCloseButtons();
    cargarPagina("DefaultPage.html");
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

  billAppDatosFactura.contentContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches('button[data-action="incrementar"]')) {
      manejarIncrementarCantidad(target);
    } else if (target.matches('button[data-action="decrementar"]')) {
      manejarDecrementarCantidad(target);
    } else if (target.matches('button[data-action="eliminar"]')) {
      manejarEliminarProducto(target);
    }
  });
}

function manejarIncrementarCantidad(button) {
  const index = button.getAttribute("data-index");
  const cantidadInput = document.getElementById(`cantidad_${index}`);
  if (cantidadInput) {
    const cantidadActual = parseInt(cantidadInput.value) || 0;
    cantidadInput.value = cantidadActual + 1;
    actualizarTotales(index);
    calcularTotales();
  }
}

function manejarDecrementarCantidad(button) {
  const index = button.getAttribute("data-index");
  const cantidadInput = document.getElementById(`cantidad_${index}`);
  if (cantidadInput) {
    const cantidadActual = parseInt(cantidadInput.value) || 0;
    if (cantidadActual > 1) {
      cantidadInput.value = cantidadActual - 1;
      actualizarTotales(index);
      calcularTotales();
    }
  }
}

function manejarEliminarProducto(button) {
  const liElement = button.closest(".productoBody");
  const productoIndex = liElement.getAttribute("data-index");

  if (liElement) {
    liElement.remove();
    calcularTotales();
    actualizarIndices();
  } else {
    console.error(
      `No se encontró el producto con data-index: ${productoIndex}`
    );
  }
}

function actualizarTotales(index) {
  const cantidadInput = document.getElementById(`cantidad_${index}`);
  const precioUnitarioInput = document.querySelector(
    `input[name="producto[${index}].precioUnitario"]`
  );
  const descuentoInput = document.querySelector(
    `input[name="producto[${index}].descuento"]`
  );
  const totalConDescuentoSpan = document.getElementById(
    `totalConDescuento_${index}`
  );
  const totalConDescuentoHiddenInput = document.getElementById(
    `totalConDescuentoHidden_${index}`
  );
  const incluyeIGV = cantidadInput.getAttribute("data-incluye-igv") === "S";

  if (
    cantidadInput &&
    precioUnitarioInput &&
    descuentoInput &&
    totalConDescuentoSpan &&
    totalConDescuentoHiddenInput
  ) {
    const cantidad = parseFloat(cantidadInput.value);
    const precioUnitario = parseFloat(precioUnitarioInput.value).toFixed(2);
    const descuento = parseFloat(descuentoInput.value).toFixed(2);
    let subtotal = precioUnitario * cantidad;

    if (!incluyeIGV) {
      const IGVMonto = subtotal * IGVGlobal;
      subtotal += IGVMonto;
    }

    const totalConDescuento = subtotal - descuento;
    const moneda = totalConDescuentoSpan.getAttribute("data-moneda") || "";

    totalConDescuentoSpan.textContent = `${moneda} ${totalConDescuento.toFixed(
      2
    )}`;
    totalConDescuentoHiddenInput.value = totalConDescuento.toFixed(2);
  }
}

function actualizarIndices() {
  const productos = document.querySelectorAll("li.productoBody");
  productos.forEach((producto, nuevoIndex) => {
    producto.setAttribute("data-index", nuevoIndex);

    producto.querySelectorAll("[data-index]").forEach((elemento) => {
      elemento.setAttribute("data-index", nuevoIndex);
    });

    producto.querySelectorAll("[id]").forEach((elemento) => {
      const nuevoId = elemento.id.replace(/_\d+$/, `_${nuevoIndex}`);
      elemento.id = nuevoId;
    });

    producto.querySelectorAll("[name]").forEach((elemento) => {
      const nuevoName = elemento.name.replace(/\[\d+\]/, `[${nuevoIndex}]`);
      elemento.name = nuevoName;
    });
  });
}
