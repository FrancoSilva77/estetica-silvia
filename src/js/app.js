const cita = {
  id: "",
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

let paso = 1;
const paginaInicial = 1;
const paginaFinal = 3;

let ultimoDivSeleccionado = null;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); // Cambia la sección cuando se cambian los tabs
  paginador();
  paginaSiguiente();
  paginaAnterior();

  consultarAPI();

  idCliente();
  nombreCliente(); // Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); // Añade fecha de la cita al objeto
  seleccionarHora(); //Añade la hora de la cita al objeto

  mostrarResumen(); // Muestra el resumen de la cita
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

    mostrarResumen();
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

async function consultarAPI() {
  try {
    const urlAPI = "http://localhost:3000/api";
    const urlServicios = `${urlAPI}/servicios`;

    const resultado = await fetch(urlServicios);
    const servicios = await resultado.json();

    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;

    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("servicio__nombre");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("servicio__precio");
    precioServicio.textContent = `$ ${precio}`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add(`servicio`);
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;

  // Identificar elemento al cual se le daclick
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  if (servicios.some((servicioAgregado) => servicioAgregado.id === id)) {
    // Eliminarlos
    cita.servicios = servicios.filter(
      (servicioAgregado) => servicioAgregado !== id
    );
    divServicio.classList.remove("servicio__seleccionado");
    ultimoDivSeleccionado = null;
    cita.servicios = [];
  } else {
    // Desmarcar el último div seleccionado
    if (ultimoDivSeleccionado) {
      ultimoDivSeleccionado.classList.remove("servicio__seleccionado");
    }
    // Agregar el nuevo servicio
    cita.servicios = [servicio];
    divServicio.classList.add("servicio__seleccionado");
    ultimoDivSeleccionado = divServicio;
  }
}

function idCliente() {
  const idCita = document.querySelector("#id").value;

  cita.id = idCita;
}

function nombreCliente() {
  const nombre = document.querySelector("#nombre").value;

  cita.nombre = nombre;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", function (e) {
    cita.fecha = e.target.value;
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector("#hora");
  inputHora.addEventListener("input", function (e) {
    cita.hora = e.target.value;
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  // * Previene que se genere mas de una alerta
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) {
    alertaPrevia.remove();
  }

  // * Scripting para generar una alerta
  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(`alerta__${tipo}--resumen`);

  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  if (desaparece) {
    // * Eliminar la alerta
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarResumen() {
  const resumen = document.querySelector(".cita__resumen");

  // Limpiar contenido del resumen
  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "Falta el servicio, la fecha o la hora",
      "error",
      ".cita__resumen",
      false
    );
    return;
  }

  // Formatear el div de resumen
  const { nombre, fecha, hora, servicios } = cita;

  // * Seleccionar el contenido de la hora
  const horaContenido = document.querySelector(`[value="${hora}"`).textContent;

  // Heading para servicios en Resumen
  const headingServicios = document.createElement("H3");
  headingServicios.textContent = "Resumen de la cita";
  resumen.appendChild(headingServicios);

  //Iterando y mostrando los servicios
  servicios.forEach((servicio) => {
    const { id, precio, nombre } = servicio;

    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("cita__contenedor");

    const textoServicio = document.createElement("P");
    textoServicio.innerHTML = `<span>Servicio: </span> ${nombre}`;

    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio: </span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  // Formatear la fecha
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(year, mes, dia));

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaUTC.toLocaleDateString("es-MX", opciones);
  console.log(fechaFormateada);

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
  console.log(cita);

  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${horaContenido} Horas`;

  // Boton para crear una cita
  const botonReservar = document.createElement("BUTTON");
  botonReservar.classList.add("cita__reservar");
  botonReservar.textContent = "Reservar Cita";
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
  resumen.appendChild(botonReservar);
}

async function reservarCita() {
  const { nombre, fecha, hora, servicios, id } = cita;

  const idServicio = servicios.map((servicio) => servicio.id);

  const datos = new FormData();
  datos.append("fecha", fecha);
  datos.append("horaId", hora);
  datos.append("usuarioId", id);
  datos.append("servicios", idServicio);

  console.log([...datos]);

  try {
    // Peticion hacia la API
    const url = "http://localhost:3000/api/citas";
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });
    
    const resultado = await respuesta.json();
    
    if (resultado.resultado) {
      Swal.fire({
        icon: "success",
        title: "Cita creada",
        text: "Tu cita ha sido agendada correctamente",
        button: "OK",
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al guardar la cita'
    })
  }
}
