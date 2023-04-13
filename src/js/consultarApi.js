const cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

consultarAPI();
nombreCliente(); // Añade el nombre del cliente al objeto de cita


let ultimoDivSeleccionado = null;

async function consultarAPI() {
  try {
    const url = `http://localhost:3000/api/servicios`;
    const resultado = await fetch(url);
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

  console.log(cita);
}

function nombreCliente() {
  const nombre = document.querySelector("#nombre").value;

  cita.nombre = nombre;
}
