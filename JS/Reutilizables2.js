export function inicializarFactura() {
  const limpiarBtn = document.querySelector(".erase-btn");

  function verificarContenedor() {
    const productosBody = document.querySelector(".contenedorProductosBody");

    if (productosBody) {
      limpiarBtn.addEventListener("click", limpiarProductos);
      productosBody.addEventListener("change", calcularTotales);
      calcularTotales();

      clearInterval(intervaloVerificacion);
    }
  }

  const intervaloVerificacion = setInterval(verificarContenedor, 500);
}

export function calcularTotales() {
  const totalElement = document.querySelector("#GananciaTotal");
  const gravadoElement = document.querySelector("#gravado-info");
  const igvElement = document.querySelector("#igv-info");
  const descInfoElement = document.querySelector("#desc-info");

  let totalGeneral = 0;
  let descuentoTotal = 0;

  const productosBody = document.querySelector(".contenedorProductosBody");
  if (!productosBody) return;

  const productos = productosBody.querySelectorAll(".productoBody");

  productos.forEach((producto) => {
    const index = producto.dataset.index;

    const totalConDescuento = obtenerValorInputPorId(
      `totalConDescuentoHidden_${index}`
    );
    const descuento = obtenerValorInputPorId(`descuento_${index}`);

    if (!isNaN(totalConDescuento)) totalGeneral += totalConDescuento;

    if (!isNaN(descuento)) descuentoTotal += descuento;
  });

  const gravadoDelDescuento = calcularGravadoDelDescuento(descuentoTotal);
  const gravado = calcularGravado(totalGeneral);
  const igv = calcularIGV(gravado);

  actualizarCampo(totalElement, totalGeneral);
  actualizarCampo(gravadoElement, gravado);
  actualizarCampo(igvElement, igv);
  actualizarCampo(descInfoElement, gravadoDelDescuento);
}

// FUNCIONES REUTILIZABLES
function calcularGravadoDelDescuento(descuentoTotal) {
  return descuentoTotal / 1.18;
}

function obtenerValorInputPorId(id) {
  const input = document.getElementById(id);
  return input ? parseFloat(input.value) || 0 : 0;
}

function calcularGravado(totalGeneral) {
  return totalGeneral / 1.18;
}

function calcularIGV(gravado) {
  return gravado * 0.18;
}

function actualizarCampo(campo, valor) {
  campo.textContent = valor.toFixed(2);
}

function limpiarProductos() {
  const productosBody = document.querySelector(".contenedorProductosBody");
  productosBody.innerHTML = "";

  actualizarCampo(document.querySelector("#GananciaTotal"), 0);
  actualizarCampo(document.querySelector("#gravado-info"), 0);
  actualizarCampo(document.querySelector("#igv-info"), 0);
  actualizarCampo(document.querySelector("#desc-info"), 0);
}
