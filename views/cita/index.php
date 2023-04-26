<main class="cita">
  <h2 class="cita__heading">Crear Nueva Cita</h2>
  <p class="cita__descripcion">Elige tu servicio y coloca tus datos</p>

  <div class="cita__barra">
    <p>Hola <?php echo $nombre  ?? ''; ?></p>
  </div>

  <div id="app">

    <nav class="cita__tabs">
      <button class="cita__boton" type="button" data-paso="1">Servicios</button>
      <button class="cita__boton" type="button" data-paso="2">Datos Cita</button>
      <button class="cita__boton" type="button" data-paso="3">Resumen</button>
    </nav>

    <div class="cita__seccion" id="paso-1">
      <h2>Servicios</h2>
      <p>Elige tu servicio</p>
      <div id="servicios" class="listado-servicios"></div>
    </div>

    <div class="cita__seccion" id="paso-2">
      <h2>Tus datos</h2>
      <p>Elige la fecha de tu cita</p>

      <form class="formulario">
        <form class="formulario">
          <div class="formulario__campo">
            <label for="nombre" class="formulario__label">Nombre:</label>
            <input type="text" class="formulario__input" placeholder="Tu nombre" id="nombre" name="nombre" value="<?php echo $nombre; ?>" disabled>
          </div>

          <div class="formulario__campo">
            <label for="fecha" class="formulario__label">Fecha:</label>
            <input type="date" class="formulario__input" id="fecha" name="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
          </div>

          <div class="formulario__campo">
            <label for="hora" class="formulario__label">Hora:</label>
            <select class="formulario__select" name="hora" id="hora">
              <option value="">-- Seleccione Hora --</option>
              <?php foreach ($horas as $hora) { ?>
                <option value="<?php echo $hora->id; ?>"><?php echo $hora->hora; ?></option>
              <?php } ?>
            </select>
          </div>

          <input type="hidden" id="id" value="<?php echo $id; ?>">

        </form>
    </div>

    <div class="cita__seccion cita__resumen" id="paso-3">
      <h2>Resúmen</h2>
      <p>Verifica que la información sea correcta</p>
    </div>

    <div class="cita__paginacion">
      <button type="button" id="anterior" class="cita__boton">&laquo; Anterior</button>
      <button type="button" id="siguiente" class="cita__boton">Siguiente &raquo;</button>
    </div>
  </div>
</main>

<?php
$script = "
<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
<script src='build/js/app.js'></script>
";
?>

<!-- 
<script src='build/js/tabs.js' type='module'></script>
<script src='build/js/consultarAPI.js' type='module'></script> -->