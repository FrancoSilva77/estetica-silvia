<main class="admin">

  <h2 class="main__heading">Panel de Andministración</h2>

  <div class="cita__barra">
    <p>Hola <?php echo $nombre  ?? ''; ?></p>
    <a href="/logout" class="cita__sesion">Cerrar Sesión</a>
  </div>

  <div class="admin__barra">
    <a class="admin__barra-enlace" href="/admin">Ver Citas</a>
    <a class="admin__barra-enlace" href="/servicios">Ver Servicios</a>
    <a class="admin__barra-enlace" href="/servicios/crear">Crear Nuevo Servicio</a>
  </div>

  <div class="admin__busqueda">
    <form class="formulario">
      <div class="formulario__campo">
        <label class="formulario__label" for="fecha">Fecha:</label>
        <input class="formulario__input" type="date" id="fecha" name="fecha" value="<?php echo $fecha; ?>">
      </div>
    </form>
  </div>

  <?php if (count($citas) === 0) {
    echo "<h2>No Hay Citas en este día</h2>";
  } ?>

  <div id="admin__citas">
    <ul class="admin__lista-citas">

      <?php
      $idCita = 0;
      foreach ($citas as $cita) :
        if ($idCita !== $cita->id) :
          $idCita = $cita->id;
      ?>
          <li class="admin__lista-cita">
            <p class="admin__lista-descripcion">ID: <span><?php echo $cita->id; ?></span></p>
            <p class="admin__lista-descripcion">Hora: <span><?php echo $cita->hora; ?></span></p>
            <p class="admin__lista-descripcion">Cliente: <span><?php echo $cita->cliente; ?></span></p>
            <p class="admin__lista-descripcion">Email: <span><?php echo $cita->email; ?></span></p>
            <p class="admin__lista-descripcion">Telefono: <span><?php echo $cita->telefono; ?></span></p>
            <p class="admin__lista-descripcion">Servicio: <span><?php echo $cita->servicio; ?></span></p>
            <p class="admin__lista-descripcion">Precio: <span><?php echo '$' . $cita->precio; ?></span></p>

            <form action="/api/eliminar" method="POST">
              <input type="hidden" name="id" value="<?php echo $cita->id; ?>">
              <input type="submit" class="admin__boton-eliminar" value="Eliminar">
            </form>

          <?php endif; ?>
          </li>
        <?php endforeach; ?>
    </ul>
  </div>
</main>

<?php
$script = "<script src='build/js/buscador.js'></script>"
?>