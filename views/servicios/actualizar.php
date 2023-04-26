<main class="admin">
  <h2 class="servicios__heading">Actualizar Servicio</h2>
  <p class="Servicios__descripcion">Actualiza o corrige el servicio</p>

  <?php
  include_once __DIR__ . '/../templates/barra-admin.php';
  include_once __DIR__ . '/../templates/alertas.php';
  ?>

  <form method="post" class="formulario">
    <?php include_once __DIR__ . '/formulario.php'; ?>
    <input type="submit" class="formulario__submit" value="Actualizar">
  </form>

</main>