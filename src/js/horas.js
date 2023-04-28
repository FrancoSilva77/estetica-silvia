(function () {
  const horas = document.querySelector("#horas");

  if (horas) {
    let busqueda = {
      fecha: "",
    };

    const fechas = document.querySelectorAll('[name="fecha"]');
    const inputHiddenHora = document.querySelector('[name="horaId"]');

    fechas.forEach((fecha) =>
      fecha.addEventListener("change", terminoBusqueda)
    );

    function terminoBusqueda(e) {
      busqueda[e.target.name] = e.target.value;

      // Reiniciar los campos ocultos y el selector de horas
      inputHiddenHora.value = "";
      const horaPrevia = document.querySelector(".horas__hora--seleccionada");
      if (horaPrevia) {
        horaPrevia.classList.remove("horas__hora--seleccionada");
      }

      if (Object.values(busqueda).includes("")) {
        return;
      }
      buscarCitas();
    }

    async function buscarCitas() {
      const { fecha } = busqueda;
      const url = `/api/citas-horas?fecha=${fecha}`;

      const resultado = await fetch(url);
      const citas = await resultado.json();

      obtenerHorasDisponibles(citas);
    }

    function obtenerHorasDisponibles(citas) {
      // Reiniciar las horas
      const listadoHoras = document.querySelectorAll("#horas li");
      listadoHoras.forEach((li) =>
        li.classList.add("horas__hora--desabilitada")
      );

      // Comprobar horas tomadas y quitar la variable de desabilitado
      const horasTomadas = citas.map((cita) => cita.horaId);

      const listadoHorasArray = Array.from(listadoHoras);

      const resultado = listadoHorasArray.filter(
        (li) => !horasTomadas.includes(li.dataset.horaId)
      );

      resultado.forEach((li) =>
        li.classList.remove("horas__hora--desabilitada")
      );

      const horasDisponibles = document.querySelectorAll(
        "#horas li:not(.horas__hora--desabilitada)"
      );

      horasDisponibles.forEach((hora) =>
        hora.addEventListener("click", seleccionarHora)
      );
    }

    function seleccionarHora(e) {
      // Desabilitar la hora previa si hay un nuevuevo click
      const horaPrevia = document.querySelector(".horas__hora--seleccionada");
      if (horaPrevia) {
        horaPrevia.classList.remove("horas__hora--seleccionada");
      }

      // Agregar clase de seleccionado
      e.target.classList.add("horas__hora--seleccionada");

      inputHiddenHora.value = e.target.dataset.horaId;
    }
  }
})();
