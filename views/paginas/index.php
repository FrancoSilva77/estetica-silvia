<main class="servicios">
  <h2 class="servicios__heading">Servicios</h2>

  <div class="servicios__grid">
    <?php foreach ($servicios as $servicio) : ?>
      <div class="servicio">
        <h3 class="servicio__titulo"><?php echo $servicio->nombre; ?></h3>
        <p class="servicio__precio">Desde $<?php echo $servicio->precio; ?></p>
        <div class="servicio__iconos">
          <i class="fa-solid fa-scissors"></i>
          <i class="fa-solid fa-couch"></i>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</main>

<?php
include_once __DIR__ . '/horarios.php';
?>

<!-- Ubicación -->
<section class="ubicacion">
  <h2 class="ubicacion__heading">Ubicación</h2>

  <div id="mapa" class="mapa"></div>
</section>

<!-- Contacto -->
<section class="contacto">
  <h2 class="contacto__heading">Contacto</h2>

  <p class="contacto__telefono">Número de Teléfono: <span class="contacto__telefono--span">238-128-42-84</span></p>
</section>

<?php $script = "<script src='build/js/mapa.js' defer></script>"?>