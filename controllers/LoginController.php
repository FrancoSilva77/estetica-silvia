<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController
{
  public static function login(Router $router)
  {
    $router->render('/auth/login');
  }

  public static function logout()
  {
    echo "Desde Logout";
  }

  public static function olvide(Router $router)
  {
    $router->render('/auth/olvide');
  }

  public static function recuperar()
  {
    echo "Desde recuperar";
  }

  public static function crear(Router $router)
  {
    $usuario = new Usuario;

    // Alertas vacías
    $alertas = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      $usuario->sincronizar($_POST);
      $alertas = $usuario->validarNuevaCuenta();

      if (empty($alertas)) {
        // Verificar que el usuario no esté registrado
        $resultado = $usuario->existeUsuario();

        if ($resultado->num_rows) {
          $alertas = Usuario::getAlertas();
        } else {
          $usuario->hashPassword();

          // Generar un token ünico
          $usuario->crearToken();

          // Enviar el email
          $email = new Email($usuario->nombre, $usuario->email, $usuario->token);
          $email->enviarConfirmacion();

          // Crear el usuario
          $resultado = $usuario->guardar();

          if ($resultado) {
            header('Location: /mensaje');
          }
        }
      }
    }

    $router->render('/auth/crear-cuenta', [
      'titulo' => 'Crear cuenta',
      'usuario' => $usuario,
      'alertas' => $alertas
    ]);
  }

  public static function mensaje(Router $router)
  {
    $router->render('auth/mensaje');
  }

  public static function confirmar(Router $router)
  {
    $alertas = [];
    $token = s($_GET['token']);
    $usuario = Usuario::where('token', $token);

    if (empty($usuario)) {
      // Mostrar mensaje de error
      Usuario::setAlerta('error', 'Token no válido');
    } else {
      $usuario->confirmado = '1';
      $usuario->token = "";
      $usuario->guardar();
      Usuario::setAlerta('exito', 'Cuenta comprobada correctamente');
    }

    // Obtener alertas
    $alertas = Usuario::getAlertas();

    // Renderizar las vistas
    $router->render('auth/confirmar-cuenta', [
      'alertas' => $alertas
    ]);
  }
}
