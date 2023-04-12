let paso = 1;
const paginaInicial = 1;
const paginaFinal = 3;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); // Cambia la sección cuando se cambian los tabs
  paginador();
  paginaSiguiente();
  paginaAnterior();
}

function mostrarSeccion() {
  //Ocultar la seccion que tenga la clase de mostrar
  const seccionAnterior = document.querySelector(".cita__mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("cita__mostrar");
  }

  // Seleccionar la seccion con el paso
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("cita__mostrar");

  // Quita la clase de actual al tab anterior
  const tabAnterior = document.querySelector(".cita__boton--actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("cita__boton--actual");
  }

  // Resalta el tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("cita__boton--actual");
}

function tabs() {
  const botones = document.querySelectorAll(".cita__tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      paso = +e.target.dataset.paso;
      mostrarSeccion();
      paginador();
    });
  });
}

function paginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const anterior = document.querySelector("#anterior");
  anterior.addEventListener("click", () => {
    if (paso <= paginaInicial) return;
    paso--;

    paginador();
  });
}

function paginaSiguiente() {
  const siguiente = document.querySelector("#siguiente");
  siguiente.addEventListener("click", () => {
    if (paso >= paginaFinal) return;
    paso++;
    paginador();
  });
}
