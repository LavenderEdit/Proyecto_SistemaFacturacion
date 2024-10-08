import { signInDatos, billAppDatosFactura } from "./scriptsDatosPaginas.js";

export function togglePassword() {
  if (signInDatos.btnMostrarContra && signInDatos.inputContra) {
    signInDatos.btnMostrarContra.addEventListener("click", function () {
      if (signInDatos.inputContra.type === "password") {
        signInDatos.inputContra.type = "text";
        signInDatos.iconoOjoAbierto.style.display = "none";
        signInDatos.iconoOjoCerrado.style.display = "block";
      } else {
        signInDatos.inputContra.type = "password";
        signInDatos.iconoOjoAbierto.style.display = "block";
        signInDatos.iconoOjoCerrado.style.display = "none";
      }
    });
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

export function showClientSearchBar() {
  const contenedorList = document.getElementById("contenedorBusqueda");
  const contenedorSearch = document.getElementById("buscarCliente");

  if (contenedorSearch) {
    contenedorSearch.addEventListener("click", function (event) {
      event.stopPropagation();

      if (contenedorList.classList.contains("escondido")) {
        contenedorList.classList.remove("escondido");
        contenedorList.classList.add("activo");
      } else {
        contenedorList.classList.remove("activo");
        contenedorList.classList.add("escondido");
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !contenedorList.contains(event.target) &&
        event.target !== contenedorSearch
      ) {
        if (contenedorList.classList.contains("activo")) {
          contenedorList.classList.remove("activo");
          contenedorList.classList.add("escondido");
        }
      }
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

export function changeTypeDocument() {
  const tipoComprobante = document.getElementById("tipoComprobante");
  const checkProforma = document.getElementById("proformaCheck");
  const originValue = tipoComprobante.value;

  if (checkProforma) {
    checkProforma.addEventListener("change", () => {
      if (checkProforma.checked) {
        tipoComprobante.value = "PROFORMA";
      } else {
        tipoComprobante.value = originValue;
      }
    });
  }
}

export function changeInputType() {
  const plaquita = document.getElementById("placaInput");
  const ordenCompraPE = document.getElementById("ordenCompraInput");
  const observacionesPE = document.getElementById("ObservacionesInput");
  const btnClaseInput = document.getElementsByClassName("buttonClass");

  [plaquita, ordenCompraPE, observacionesPE].forEach(input => {
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
