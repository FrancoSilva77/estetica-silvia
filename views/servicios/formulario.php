<div class="formulario__campo">
  <label for="nombre" class="formulario__label">Nombre:</label>
  <input class="formulario__input" type="text" id="nombre" name="nombre" placeholder="Coloca el nombre del servicio" value="<?php echo $servicio->nombre;?>">
</div>

<div class="formulario__campo">
  <label for="precio" class="formulario__label">Precio:</label>
  <input class="formulario__input" type="number" id="precio" name="precio" placeholder="Coloca el precio del servicio" value="<?php echo $servicio->precio;?>">
</div>