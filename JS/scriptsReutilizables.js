import {
  signInDatos,
  billAppDatosFactura,
  realizarVentaDatos,
} from "./scriptsDatosPaginas.js";

//Función para volver visible la contraseña
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

// Función para mostrar la lista de opciones
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

    // Añadir un listener al documento para cerrar el dropdown si se hace clic fuera
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
  const total = document.getElementById("contenedorTotal");
  const intotal = document.getElementById("informacionComprobante");

  if (total) {
    total.addEventListener("mouseenter", function () {
      intotal.classList.remove("escondido");
      intotal.classList.add("activo");
    });

    total.addEventListener("mouseleave", function () {
      intotal.classList.remove("activo");
      intotal.classList.add("escondido");
    });
  }
}

export function showSearchBar() {
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
