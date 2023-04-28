<?php 
namespace Model;

class CitaFecha extends ActiveRecord {
  // Base de datos 
  protected static $tabla = 'citas';
  protected static $columnasDB = ['id', 'fecha', 'horaId'];

  public $id;
  public $fecha;
  public $horaId;
}
