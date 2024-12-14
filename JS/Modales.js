// Mostrar el Modal
export function modalAppear(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById("modal-container");
  if (!modal) {
    console.error(`Modal con ID "${modalId}" no encontrado.`);
    return;
  }

  if (modalId === "modalUno") {
    modal.classList.add("activo-overlay");
    modal.classList.remove("escondido");
    overlay.classList.remove("escondido");
  } else {
    modal.classList.add("activo-overlay-2");
    modal.classList.remove("escondido");
    overlay.classList.remove("escondido");
  }
}

// Ocultar el Modal
function modalDisappear(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById("modal-container");
  if (!modal) {
    console.error(`Modal con ID "${modalId}" no encontrado.`);
    return;
  }
  if (modal.classList.contains("activo-overlay")) {
    overlay.classList.add("escondido");
    modal.classList.remove("activo-overlay");
    modal.classList.add("escondido");
  } else {
    overlay.classList.add("escondido");
    modal.classList.remove("activo-overlay-2");
    modal.classList.add("escondido");
  }
}

// Configurar botones con la clase 'close-btn' y la funcionalidad para el overlay
export function setModalCloseButtons() {
  const closeButtons = document.querySelectorAll(".close-btn");
  const overlay = document.getElementById("modal-container");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal && modal.id) {
        modalDisappear(modal.id);
      } else {
        console.error("No se encontró el modal padre para cerrar.");
      }
    });
  });

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        const activeModal = document.querySelector(
          ".modal.activo-overlay, .modal.activo-overlay-2"
        );
        if (activeModal && activeModal.id) {
          modalDisappear(activeModal.id);
        }
      }
    });
  } else {
    console.error('No se encontró el overlay con el ID "modal-container".');
  }

  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
}
