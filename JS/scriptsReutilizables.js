import { billAppDatosFactura } from "./scriptsDatosPaginas.js";
import { showModal } from "./scriptMensajes.js";

export function togglePassword() {
  const btnMostrarContraList = document.querySelectorAll(".btn-show-container");

  btnMostrarContraList.forEach((btn) => {
    btn.addEventListener("click", function () {
      const parent = btn.closest(".pwd-container");
      if (parent) {
        const inputContra = parent.querySelector(".contraClass");
        const iconoOjoAbierto = parent.querySelector(".iconoOjoAbierto");
        const iconoOjoCerrado = parent.querySelector(".iconoOjoCerrado");

        if (inputContra && iconoOjoAbierto && iconoOjoCerrado) {
          if (inputContra.type === "password") {
            inputContra.type = "text";
            iconoOjoAbierto.style.display = "none";
            iconoOjoCerrado.style.display = "block";
          } else {
            inputContra.type = "password";
            iconoOjoAbierto.style.display = "block";
            iconoOjoCerrado.style.display = "none";
          }
        }
      }
    });
  });
}

export function checkInputToAsignCustomer(clienteInput) {
  if (/^[a-zA-Z\s]+$/.test(clienteInput)) {
    return "PUBLICO EN GENERAL CON NOMBRE";
  } else if (/^\d{8}$/.test(clienteInput)) {
    return "DNI";
  } else if (/^\d{11}$/.test(clienteInput)) {
    return "RUC";
  } else {
    return null;
  }
}

export function showOptionList() {
  if (billAppDatosFactura.iconoDatos) {
    billAppDatosFactura.iconoDatos.addEventListener("click", function (event) {
      event.stopPropagation();

      if (billAppDatosFactura.dropdownLista.classList.contains("escondido")) {
        billAppDatosFactura.dropdownLista.classList.remove("escondido");
        billAppDatosFactura.dropdownLista.classList.add("activo");
      } else {
        billAppDatosFactura.dropdownLista.classList.remove("activo");
        billAppDatosFactura.dropdownLista.classList.add("escondido");
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !billAppDatosFactura.dropdownLista.contains(event.target) &&
        event.target !== billAppDatosFactura.iconoDatos
      ) {
        if (billAppDatosFactura.dropdownLista.classList.contains("activo")) {
          billAppDatosFactura.dropdownLista.classList.remove("activo");
          billAppDatosFactura.dropdownLista.classList.add("escondido");
        }
      }
    });
  }
}

export function showInfoTotal() {
  const containerTotal = document.getElementById("contenedorTotal");
  const infoTotal = document.getElementById("informacionComprobante");

  if (containerTotal) {
    containerTotal.addEventListener("mouseenter", function () {
      infoTotal.classList.remove("escondido");
      infoTotal.classList.add("activo");
    });

    containerTotal.addEventListener("mouseleave", function () {
      infoTotal.classList.remove("activo");
      infoTotal.classList.add("escondido");
    });
  }
}

export function showProductSearchBar() {
  const contenedorListaProductos =
    document.getElementById("contenedorProducto");
  const contenedorSearchProducto = document.getElementById("buscarProducto");

  if (contenedorSearchProducto) {
    contenedorSearchProducto.addEventListener("click", function (event) {
      event.stopPropagation();

      if (contenedorListaProductos.classList.contains("escondido")) {
        contenedorListaProductos.classList.remove("escondido");
        contenedorListaProductos.classList.add("activo");
      } else {
        contenedorListaProductos.classList.remove("activo");
        contenedorListaProductos.classList.add("escondido");
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !contenedorListaProductos.contains(event.target) &&
        event.target !== contenedorSearchProducto
      ) {
        if (contenedorListaProductos.classList.contains("activo")) {
          contenedorListaProductos.classList.remove("activo");
          contenedorListaProductos.classList.add("escondido");
        }
      }
    });
  }
}

// Función para manejar cambios de tipo de comprobante
export function changeTypeDocument(tipoCliente) {
  const tipoComprobante = document.getElementById("tipoComprobante");
  const checkProforma = document.getElementById("proformaCheck");
  const clienteInput = document.getElementById("clienteInput");

  tipoComprobante.value = "BOLETA DE VENTA ELECTRÓNICA";

  if (tipoCliente) {
    actualizarTipoComprobante(
      tipoCliente,
      checkProforma.checked,
      tipoComprobante
    );
  }

  if (checkProforma) {
    checkProforma.addEventListener("change", () => {
      if (checkProforma.checked) {
        tipoComprobante.value = "PROFORMA ELECTRÓNICA";
      } else {
        tipoComprobante.value = "BOLETA DE VENTA ELECTRÓNICA";
      }
      console.log(
        `Tipo de comprobante actualizado por Proforma: ${tipoComprobante.value}`
      );
    });
  }

  if (clienteInput) {
    clienteInput.addEventListener("input", () => {
      const inputValue = clienteInput.value.trim();
      const inputType = checkInputToAsignCustomer(inputValue);

      console.log(`Tipo de cliente detectado: ${inputType}`);

      if (inputValue === "") {
        tipoComprobante.value = "BOLETA DE VENTA ELECTRÓNICA";
        console.log(
          "Campo de cliente vacío. Restablecido a BOLETA DE VENTA ELECTRÓNICA."
        );
      } else {
        actualizarTipoComprobante(
          inputType,
          checkProforma.checked,
          tipoComprobante
        );
      }
    });
  }
}

// Función auxiliar para actualizar el tipo de comprobante
export function actualizarTipoComprobante(
  tipoCliente,
  isProformaChecked,
  tipoComprobante
) {
  if (tipoCliente === "DNI") {
    tipoComprobante.value = isProformaChecked
      ? "PROFORMA ELECTRÓNICA"
      : "BOLETA DE VENTA ELECTRÓNICA";
  } else if (tipoCliente === "RUC") {
    tipoComprobante.value = "FACTURA ELECTRÓNICA";
  } else if (!isProformaChecked) {
    tipoComprobante.value = "BOLETA DE VENTA ELECTRÓNICA";
  }

  console.log(`Tipo de comprobante actualizado: ${tipoComprobante.value}`);
}

/* Se encarga de los botones de la factura para ser llenados */
export function changeInputType() {
  const plaquita = document.getElementById("placaInput");
  const ordenCompraPE = document.getElementById("ordenCompraInput");
  const observacionesPE = document.getElementById("ObservacionesInput");
  const btnClaseInput = document.getElementsByClassName("buttonClass");

  [plaquita, ordenCompraPE, observacionesPE].forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value.trim() === "") {
        input.dataset.empty = "true";
      } else {
        delete input.dataset.empty;
      }
    });
  });

  for (let i = 0; i < btnClaseInput.length; i++) {
    btnClaseInput[i].addEventListener("click", function (event) {
      event.stopPropagation();

      if (btnClaseInput[i].innerText === "PLACA") {
        plaquita.type = "text";
      } else if (btnClaseInput[i].innerText === "ORD. COMPRA") {
        ordenCompraPE.type = "text";
      } else if (btnClaseInput[i].innerText === "OBSERVACIONES") {
        observacionesPE.type = "text";
      }
    });
  }

  document.addEventListener("click", function (event) {
    if (
      !plaquita.contains(event.target) &&
      !ordenCompraPE.contains(event.target) &&
      !observacionesPE.contains(event.target)
    ) {
      plaquita.type = "hidden";
      ordenCompraPE.type = "hidden";
      observacionesPE.type = "hidden";

      if (plaquita.dataset.empty === "true") {
        plaquita.value = "";
      }
      if (ordenCompraPE.dataset.empty === "true") {
        ordenCompraPE.value = "";
      }
      if (observacionesPE.dataset.empty === "true") {
        observacionesPE.value = "";
      }
    }
  });
}

export function seleccionarCliente(item) {
  const clienteSearchBar = document.getElementById("buscarCliente");
  const contenedorBusqueda = document.getElementById("contenedorBusqueda");
  const tipoComprobante = document.getElementById("tipoComprobante");

  const id = item.getAttribute("data-id");
  const nombre = item.getAttribute("data-nombre");

  clienteSearchBar.value = `${id} >> ${nombre}`;
  clienteSearchBar.classList.add("seleccionado");

  const tipoCliente = checkInputToAsignCustomer(id);

  actualizarTipoComprobante(tipoCliente, false, tipoComprobante);

  contenedorBusqueda.classList.add("escondido");
  contenedorBusqueda.classList.remove("activo-resultados");

  console.log(`Cliente seleccionado: ${nombre} con ID: ${id}`);
  console.log(`Tipo de cliente detectado: ${tipoCliente}`);
  console.log(`Tipo de comprobante ajustado a: ${tipoComprobante.value}`);
}

export function checkContentInput() {
  const simbolosCheck = document.getElementsByClassName("symbol");
  const plaquita = document.getElementById("placaInput");
  const ordenCompraPE = document.getElementById("ordenCompraInput");
  const observacionesPE = document.getElementById("ObservacionesInput");

  toggleSymbol(plaquita, simbolosCheck[0]);
  toggleSymbol(ordenCompraPE, simbolosCheck[1]);
  toggleSymbol(observacionesPE, simbolosCheck[2]);
}

function toggleSymbol(inputElement, symbolElement) {
  inputElement.addEventListener("input", function () {
    if (inputElement.value.trim() !== "") {
      symbolElement.classList.remove("escondido");
      symbolElement.classList.add("activo");
    } else {
      symbolElement.classList.remove("activo");
      symbolElement.classList.add("escondido");
    }
  });
}

export function setFechaEmision() {
  const fechaEmisionInput = document.getElementById("fecEmision");

  fechaEmisionInput.value = obtenerFechaActual();

  fechaEmisionInput.addEventListener("change", function () {
    if (validarCambioFecha(fechaEmisionInput)) {
      showModal("successModal", "La fecha elegida es aceptable.");
    } else {
      fechaEmisionInput.value = obtenerFechaActual();
    }
  });
}

function obtenerFechaActual() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

function validarCambioFecha(fechaEmisionInput) {
  const fechaSeleccionada = new Date(fechaEmisionInput.value);
  const fechaActual = new Date();
  const tresDiasAntes = new Date(fechaActual);
  tresDiasAntes.setDate(fechaActual.getDate() - 3);
  const tresDiasDespues = new Date(fechaActual);
  tresDiasDespues.setDate(fechaActual.getDate() + 3);

  if (
    fechaSeleccionada < tresDiasAntes ||
    fechaSeleccionada > tresDiasDespues
  ) {
    showModal(
      "warningModal",
      "No puedes elegir una fecha de tres dias anteriores o posteriores a la actual."
    );
    return false;
  }
  return true;
}

export function inicializarInputEditar() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const modal = document.querySelector("#modalUno");
  const descuentoInput = document.getElementById("descuento");
  const cantidadInput = document.getElementById("cantidad");

  if (editButtons) {
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const closestInput = this.closest(".wrapper").querySelector(
          ".inptStyleGlobalModal"
        );

        if (
          closestInput &&
          closestInput !== descuentoInput &&
          closestInput !== cantidadInput
        ) {
          closestInput.disabled = false;
          closestInput.focus();
          this.style.display = "none";
        }
      });
    });
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const isModalHidden = modal.classList.contains("escondido");

        if (isModalHidden) {
          const allInputs = modal.querySelectorAll(".inptStyleGlobalModal");
          const allEditButtons = modal.querySelectorAll(".edit-btn");

          allInputs.forEach((input) => {
            if (input !== descuentoInput && input !== cantidadInput) {
              input.disabled = true;
            }
          });

          cantidadInput.disabled = false;

          allEditButtons.forEach((button) => {
            button.style.display = "inline-block";
          });
        }
      }
    });
  });

  observer.observe(modal, { attributes: true });
}

export function inicializarModalUno() {
  const cantidadInput = document.querySelector("#cantidad");
  const precioUnitarioInput = document.querySelector("#precioUnitario");
  const descuentoInput = document.querySelector("#descuento");
  const totalDisplay = document.querySelector("#totalProductoModal");

  const incrementButton = document.querySelector(
    "[data-action='incremento-modal']"
  );
  const decrementButton = document.querySelector(
    "[data-action='decremento-modal']"
  );

  function inicializarEventos() {
    incrementButton.addEventListener("click", incrementarCantidad);
    decrementButton.addEventListener("click", decrementarCantidad);

    cantidadInput.addEventListener("input", manejarEntradaManualCantidad);
    precioUnitarioInput.addEventListener("input", calcularTotal);
    descuentoInput.addEventListener("input", manejarEntradaManualDescuento);

    calcularTotal();
  }

  function calcularTotal() {
    const cantidad = obtenerCantidadValida();
    const precioUnitario = obtenerPrecioUnitarioValido();
    const descuento = obtenerDescuentoValido();
    const subtotal = precioUnitario * cantidad;
    const valorDescuento = precioUnitario * (descuento / 100);
    const total = subtotal - valorDescuento;

    totalDisplay.textContent = `S/ ${total.toFixed(2)}`;
  }

  function obtenerCantidadValida() {
    let cantidad = parseInt(cantidadInput.value, 10);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    cantidadInput.value = cantidad;
    return cantidad;
  }

  function obtenerPrecioUnitarioValido() {
    const precio = parseFloat(precioUnitarioInput.value);
    return isNaN(precio) ? 0 : precio;
  }

  function obtenerDescuentoValido() {
    let descuento = parseFloat(descuentoInput.value);
    if (isNaN(descuento) || descuento < 0) descuento = 0;
    if (descuento > 100) descuento = 100;
    descuentoInput.value = descuento.toFixed(2);
    return parseFloat(descuento.toFixed(2));
  }

  function incrementarCantidad() {
    const cantidad = obtenerCantidadValida() + 1;
    cantidadInput.value = cantidad;
    calcularTotal();
  }

  function decrementarCantidad() {
    const cantidad = obtenerCantidadValida();
    if (cantidad > 1) {
      cantidadInput.value = cantidad - 1;
    }
    calcularTotal();
  }

  function manejarEntradaManualCantidad() {
    cantidadInput.value = obtenerCantidadValida();
    calcularTotal();
  }

  function manejarEntradaManualDescuento() {
    descuentoInput.value = obtenerDescuentoValido().toFixed(2);
    calcularTotal();
  }

  inicializarEventos();
}
