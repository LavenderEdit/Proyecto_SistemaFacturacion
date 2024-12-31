import { modalAppear } from "./Modales.js";
import {
  convertirSolesAPorcentaje,
  convertirPorcentajeASoles,
  calcularTotales,
} from "./Reutilizables2.js";

export function inicializarClickProducto() {
  document
    .getElementById("bodyForm")
    .addEventListener("click", function (event) {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === "BUTTON" ||
        clickedElement.tagName === "INPUT"
      ) {
        return;
      }

      const liProducto = clickedElement.closest(".productoBody");
      if (liProducto) {
        const index = clickedElement
          .closest(".productoBody")
          .getAttribute("data-index");
        if (index) {
          const datosProducto = obtenerDatosProducto(index);

          llenarModal(datosProducto);

          modalAppear("modalUno");

          agregarListenerGuardar(index);

          console.log("Producto seleccionado:", index);
        }
      }
    });
}

function agregarListenerGuardar(index) {
  const modal = document.getElementById("modalUno");
  const overlay = document.getElementById("modal-container");

  if (!modal || !overlay) return;

  const saveButton = modal.querySelector(".save-btn");

  const handleSave = () => {
    llenarNuevosDatos(index);
    overlay.click();
    calcularTotales();
  };

  // Quita cualquier listener existente
  saveButton.replaceWith(saveButton.cloneNode(true));
  modal.querySelector(".save-btn").addEventListener("click", handleSave);
}

function guardarDatosProductoNuevo() {
  const productoElement = document.getElementById("producto");
  const almacenSalidaElement = document.getElementById("almacenSalida");
  const precioUnitElement = document.getElementById("precioUnitario");
  const cantidadElement = document.getElementById("cantidad");
  const totalProductoModalElement =
    document.getElementById("totalProductoModal");
  const descuentoElement = document.getElementById("descuento");

  const nombreProducto = productoElement.value.trim().toUpperCase();
  const almacenSalida = almacenSalidaElement.value.trim().toUpperCase();
  const precioUnitario = parseFloat(precioUnitElement.value) || 0;
  const cantidad = parseInt(cantidadElement.value, 10) || 0;
  const totalProducto =
    parseFloat(totalProductoModalElement.textContent.replace("S/ ", "")) || 0;
  const descuento = parseFloat(descuentoElement.value) || 0;

  const productoNuevo = {
    nombreProducto,
    almacenSalida,
    precioUnitario: precioUnitario.toFixed(2),
    cantidad,
    totalProducto: totalProducto.toFixed(2),
    descuento: descuento.toFixed(2),
  };

  console.log("Datos del producto nuevo:", productoNuevo);

  return productoNuevo;
}

function llenarNuevosDatos(index) {
  const datosProductoNuevo = guardarDatosProductoNuevo();

  const productoElement = document.getElementById(`producto_${index}`);
  const almacenSalidaElement = document.getElementById(`almacen_${index}`);
  const precioUnitarioSpanElement = document.getElementById(
    `precioSpan_${index}`
  );
  const precioUnitarioHiddenElement = document.getElementById(
    `precio_${index}`
  );
  const cantidadElement = document.getElementById(`cantidad_${index}`);
  const totalProductoHiddenElement = document.getElementById(
    `totalConDescuentoHidden_${index}`
  );
  const totalProductoSpanElement = document.getElementById(
    `totalConDescuento_${index}`
  );
  const descuentoSpanElement = document.getElementById(
    `descuentoSpan_${index}`
  );
  const descuentoHiddenElement = document.getElementById(`descuento_${index}`);
  const descuentoEnSoles = convertirPorcentajeASoles(
    datosProductoNuevo.descuento,
    datosProductoNuevo.precioUnitario
  );

  productoElement.innerText = datosProductoNuevo.nombreProducto;
  almacenSalidaElement.innerText = datosProductoNuevo.almacenSalida;
  precioUnitarioSpanElement.innerText = `${"S/."} ${
    datosProductoNuevo.precioUnitario
  }`;
  precioUnitarioHiddenElement.value = datosProductoNuevo.precioUnitario;
  cantidadElement.value = datosProductoNuevo.cantidad;
  descuentoSpanElement.innerText = `${"S/."} ${descuentoEnSoles}`;
  descuentoHiddenElement.value = descuentoEnSoles;
  totalProductoSpanElement.innerText = `${"S/."} ${
    datosProductoNuevo.totalProducto
  }`;
  totalProductoHiddenElement.value = datosProductoNuevo.totalProducto;
  
  console.log("Datos del producto:", datosProductoNuevo);
}

function obtenerDatosProducto(index) {
  const productoElement = document.getElementById(`producto_${index}`);
  const almacenSalidaElement = document.getElementById(`almacen_${index}`);
  const precioUnitarioElement = document.getElementById(`precio_${index}`);
  const cantidadElement = document.getElementById(`cantidad_${index}`);
  const totalProductoModalElement = document.getElementById(
    `totalConDescuentoHidden_${index}`
  );
  const descuentoElement = document.getElementById(`descuento_${index}`);

  const producto = productoElement ? productoElement.innerText : null;
  const almacenSalida = almacenSalidaElement
    ? almacenSalidaElement.innerText
    : null;
  const precioUnitario = precioUnitarioElement
    ? parseFloat(precioUnitarioElement.value)
    : 0;
  const cantidad = cantidadElement ? parseInt(cantidadElement.value, 10) : 0;
  const totalProductoModal = totalProductoModalElement
    ? parseFloat(totalProductoModalElement.value)
    : 0;
  const descuentoEnSoles = descuentoElement
    ? parseFloat(descuentoElement.value)
    : 0;

  const descuentoPorcentaje = convertirSolesAPorcentaje(
    descuentoEnSoles,
    precioUnitario
  );

  return {
    producto,
    almacenSalida,
    precioUnitario,
    cantidad,
    totalProductoModal,
    descuentoPorcentaje,
  };
}

function llenarModal(datosProducto) {
  document.getElementById("producto").value = datosProducto.producto;
  document.getElementById("almacenSalida").innerHTML = `
        <option value="${datosProducto.almacenSalida}" selected>${datosProducto.almacenSalida}</option>
    `;
  document.getElementById("precioUnitario").value =
    datosProducto.precioUnitario.toFixed(2);
  document.getElementById("cantidad").value = datosProducto.cantidad;
  document.getElementById("totalProductoModal").innerText =
    datosProducto.totalProductoModal.toFixed(2);
  document.getElementById("descuento").value =
    datosProducto.descuentoPorcentaje;
  document.getElementById("descuento").title = convertirPorcentajeASoles(
    datosProducto.descuentoPorcentaje,
    datosProducto.precioUnitario.toFixed(2)
  );
}
