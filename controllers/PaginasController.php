<?php 
namespace Controllers;

use Model\Servicio;
use MVC\Router;

class PaginasController {
  public static function index(Router $router)
  {
    $servicios = Servicio::all();
    $router->render('/paginas/index',[
      "servicios" =>$servicios
    ]);
  }
}
