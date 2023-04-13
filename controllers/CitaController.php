<?php

namespace Controllers;

use Model\Hora;
use MVC\Router;

class CitaController
{
  public static function index(Router $router)
  {
    $horas = Hora::all();
    session_start();
    $router->render('cita/index', [
      'nombre' => $_SESSION['nombre'],
      'horas' => $horas
    ]);
  }
}
