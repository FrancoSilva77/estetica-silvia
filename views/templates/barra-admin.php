<div class="cita__barra">
    <p>Hola <?php echo $nombre  ?? ''; ?></p>
    <a href="/logout" class="cita__sesion">Cerrar Sesión</a>
  </div>

  <div class="admin__barra">
    <a class="admin__barra-enlace" href="/admin">Ver Citas</a>
    <a class="admin__barra-enlace" href="/servicios">Ver Servicios</a>
    <a class="admin__barra-enlace" href="/servicios/crear">Crear Nuevo Servicio</a>
  </div>