<?php
if (!isset($_SESSION['login'])) { ?>
  <header class="header">
    <div class="header__contenedor">

      <div class="header__barra">
        <a href="/">
          <h2 class="header__titulo">Salón Silvia Rubio Estilista</h2>
        </a>
        <nav class="navegacion">
          <a href="/login" class="navegacion__enlace">Iniciar Sesión</a>
          <a href="/crear-cuenta" class="navegacion__enlace">Registrarse</a>
        </nav>
      </div>

      <div class="header__texto">
        <h1>Agende su cita, asi no tendrá que esperar</h1>
      </div>
    </div>

  </header>
<?php } else { ?>
  <header class="header__login">
    <div class="header__contenedor">

      <div class="header__barra">
        <a href="/">
          <h2 class="header__titulo--login">Salón Silvia Rubio Estilista</h2>
        </a>
        <nav class="navegacion">
          <?php if (!isset($_SESSION['admin'])) { ?>
            <a href="/cita" class="navegacion__enlace">Agendar Cita</a>
          <?php } else { ?>
            <a href="/admin" class="navegacion__enlace">Administrar Citas</a>
          <?php } ?>
          <a href="/logout" class="navegacion__enlace">Cerrar Sesión</a>
        </nav>
      </div>
    </div>
  </header>
<?php } ?>