<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\APICitas;
use Controllers\APIHoras;
use Controllers\APIServicios;
use Controllers\CitaController;
use Controllers\LoginController;
use Controllers\PaginasController;
use Controllers\ServicioController;
use MVC\Router;

$router = new Router();

// Página principal
$router->get('/', [PaginasController::class, 'index']);

//Crear cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crear']);
$router->post('/crear-cuenta', [LoginController::class, 'crear']);

// Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

// Iniciar sesión
$router->get('/login', [LoginController::class, 'login']);
$router->post('/login', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

// Recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

// Area privada
$router->get('/cita', [CitaController::class, 'index']);

//Admin
$router->get('/admin', [AdminController::class, 'index']);

// Api de citas
$router->get('/api/servicios', [APIServicios::class, 'index']);
$router->post('/api/citas', [APIServicios::class, 'guardar']);
$router->post('/api/eliminar', [APIServicios::class, 'eliminar']);

$router->get('/api/citas-horas', [APICitas::class, 'index']);


// CRUD de servicios
$router->get('/servicios', [ServicioController::class, 'index']);
$router->get('/servicios/crear', [ServicioController::class, 'crear']);
$router->post('/servicios/crear', [ServicioController::class, 'crear']);
$router->get('/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/servicios/eliminar', [ServicioController::class, 'eliminar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
