import { modalAppear } from './Modales.js';
 
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
        const index = liProducto.getAttribute("data-index");
        if (index) {
          const datosProducto = obtenerDatosProducto(index);

          llenarModal(datosProducto);

          modalAppear("modalUno");
        }
      }
    });
}

function obtenerDatosProducto(index) {
  const productoElement = document.getElementById(`producto_${index}`);
  const almacenSalidaElement = document.getElementById(`almacen_${index}`);
  const precioUnitarioElement = document.getElementById(`precio_${index}`);
  const cantidadElement = document.getElementById(`cantidad_${index}`);
  const totalProductoModalElement = document.getElementById(
    `totalConDescuentoHidden_${index}`
  );

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

  return {
    producto,
    almacenSalida,
    precioUnitario,
    cantidad,
    totalProductoModal,
  };
}

function llenarModal(datosProducto) {
  document.getElementById("producto").value = datosProducto.producto;
  document.getElementById("almacenSalida").innerHTML = `
        <option selected>${datosProducto.almacenSalida}</option>
    `;
  document.getElementById("precioUnitario").value =
    datosProducto.precioUnitario.toFixed(2);
  document.getElementById("cantidad").value = datosProducto.cantidad;
  document.getElementById("totalProductoModal").innerText =
    datosProducto.totalProductoModal.toFixed(2);
}
