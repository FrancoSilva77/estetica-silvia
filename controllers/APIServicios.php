<?php 
namespace Controllers;

use Model\Servicio;

class APIServicios {
  public static function index()
  {
   $servicios = Servicio::all();

   echo json_encode($servicios);
  }
}
