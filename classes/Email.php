<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;


class Email
{
  public $email;
  public $nombre;
  public $token;


  public function __construct($nombre, $email, $token)
  {
    $this->nombre = $nombre;
    $this->email = $email;
    $this->token = $token;
  }

  public function enviarConfirmacion()
  {
    // Crear el objeto de email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host       = 'smtp-relay.sendinblue.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Port = 587;                             //Enable SMTP authentication
    $mail->Username   = 'aspermasterone@gmail.com';                     //SMTP username
    $mail->Password   = 'c3P18zZ4NVIbrhJv';                               //SMTP password

    $mail->setFrom('esteticasilvia@esteticasilvia.com');
    $mail->addAddress($this->email);
    $mail->Subject = 'Confirma tu cuenta';

    // Set HTML
    $mail->isHTML(TRUE);
    $mail->CharSet = 'UTF-8';


    $contenido = "<html>";
    $contenido .= "<p><strong>Hola " . $this->nombre . " </strong> Has creado tu cuenta en Estetica Silvia, solo debes confirmarla presionando el siguiente enlace</p>";
    $contenido .= "<p>Presiona aquí: <a href='https://esteticasiliviaa.alwaysdata.net/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a>";
    $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
    $contenido .= "</html>";

    $mail->Body = $contenido;

    // Enviar el mail
    $mail->send();
  }

  public function enviarInstrucciones()
  {
    // Crear el objeto de email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host       = 'smtp-relay.sendinblue.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Port = 2525;                             //Enable SMTP authentication
    $mail->Username   = 'aspermasterone@gmail.com';                     //SMTP username
    $mail->Password   = 'c3P18zZ4NVIbrhJv';                               //SMTP password

    $mail->setFrom('esteticasilvia@esteticasilvia.com');
    $mail->addAddress($this->email);
    $mail->Subject = 'Reestablece tu password';

    // Set HTML
    $mail->isHTML(TRUE);
    $mail->CharSet = 'UTF-8';


    $contenido = "<html>";
    $contenido .= "<p><strong>Hola " . $this->nombre . " </strong> Has solicitado reestablecer tu contraseña, sigue el siguiente enlace para hacerlo.</p>";
    $contenido .= "<p>Presiona aquí: <a href='https://esteticasiliviaa.alwaysdata.net/recuperar?token=" . $this->token . "'>Reestablecer Contaseña</a>";
    $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
    $contenido .= "</html>";

    $mail->Body = $contenido;

    // Enviar el mail
    $mail->send();
  }
}
