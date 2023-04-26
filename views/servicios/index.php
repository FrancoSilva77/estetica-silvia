<main class="admin">
  <h2 class="servicios__heading">Servicios</h2>
  <p class="servicios__descripcion">Panel de servicios</p>

  <?php include_once __DIR__ . '/../templates/barra-admin.php'; ?>

  <ul class="admin__servicios">
    <?php foreach ($servicios as $servicio) : ?>
      <li class="admin__servicios-servicio">
        <p class="admin__servicios-descripcion">Nombre: <span><?php echo $servicio->nombre; ?></span></p>
        <p class="admin__servicios-descripcion">Precio: <span>$<?php echo $servicio->precio; ?></span></p>

        <div class="admin__acciones">
          <a class="admin__servicios-actualizar" href="/servicios/actualizar?id=<?php echo $servicio->id; ?>">Actualizar</a>

          <form action="/servicios/eliminar" method="POST">
            <input type="hidden" name="id" value="<?php echo $servicio->id ?>">

            <input type="submit" value="Borrar" class="admin__servicios-eliminar">
          </form>

        </div>
      </li>

    <?php endforeach; ?>
  </ul>
</main>