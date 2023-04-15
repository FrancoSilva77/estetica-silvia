const cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

consultarAPI();
nombreCliente(); // Añade el nombre del cliente al objeto de cita
seleccionarFecha(); // Añade fecha de la cita al objeto
seleccionarHora(); //Añade la hora de la cita al objeto

mostrarResumen(); // Muestra el resumen de la cita

let ultimoDivSeleccionado = null;

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

  servicios.forEach((servicio) => {
    const { id, precio, nombre } = servicio;

    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("cita__contenedor");

    const textoServicio = document.createElement("P");
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio: </span> ${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`;

  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${horaContenido}`;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
}


export {mostrarResumen};