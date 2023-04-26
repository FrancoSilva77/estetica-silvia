<main class="admin">
  <h2 class="servicios__heading">Crear Nuevo Servicio</h2>
  <p class="servicios__descripcion">Llena todos los camos para crear un nuevo servicio</p>

  <?php
  include_once __DIR__ . '/../templates/barra-admin.php';
  include_once __DIR__ . '/../templates/alertas.php';
  ?>

  <form action="/servicios/crear" method="post" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="formulario__submit" value="Guardar Servicio">
  </form>

</main>