<main class="admin">
  <h2 class="servicios__heading">Actualizar Servicio</h2>
  <p class="Servicios__descripcion">Actualiza o corrige el servicio</p>

  <div class="cita__barra">
    <p>Hola <?php echo $nombre  ?? ''; ?></p>
    <a href="/logout" class="cita__sesion">Cerrar Sesión</a>
  </div>

  <div class="admin__barra">
    <a class="admin__barra-enlace" href="/admin">Ver Citas</a>
    <a class="admin__barra-enlace" href="/servicios">Ver Servicios</a>
    <a class="admin__barra-enlace" href="/servicios/crear">Crear Nuevo Servicio</a>
  </div>

  <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

  <form method="post" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="formulario__submit" value="Actualizar">
  </form>

</main>