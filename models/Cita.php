<?php

namespace Model;

class Cita extends ActiveRecord
{
  // Base de datos
  protected static $tabla = 'citas';
  protected static $columnasDB = ['id', 'fecha', 'usuarioId', 'horaId'];

  public $id;
  public $fecha;
  public $usuarioId;
  public $horaId;

  public function __construct($args = [])
  {
    $this->id = $args['id'] ?? null;
    $this->fecha = $args['fecha'] ?? '';
    $this->usuarioId = $args['usuarioId'] ?? '';
    $this->horaId = $args['horaId'] ?? '';
  }
}
