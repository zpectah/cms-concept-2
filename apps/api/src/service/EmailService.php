<?php

namespace service;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService {

  private static PHPMailer $mailer;

  public function __construct() {
    self::$mailer = new PHPMailer(true);
  }

  public function createEmail($to, $subject, $body, $credentials, $altBody = null): bool {
    $send = false;

    $smtp_port = $credentials['smtp_port'];
    $smtp_host = $credentials['smtp_host'];
    $smtp_username = $credentials['smtp_username'];
    $smtp_password = $credentials['smtp_password'];

    $from_email = $credentials['from'];
    $from_domain = $credentials['domain'];

    if (
      !isset($smtp_port) &&
      !isset($smtp_host) &&
      !isset($smtp_username) &&
      !isset($smtp_password) &&
      $smtp_password
    ) return false;

    try {
      self::$mailer -> isSMTP();
      self::$mailer -> SMTPAuth = true;
      self::$mailer -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

      self::$mailer -> Port = $smtp_port;
      self::$mailer -> Host = $smtp_host;
      self::$mailer -> Username = $smtp_username;
      self::$mailer -> Password = $smtp_password;

      self::$mailer -> setFrom($from_email, $from_domain);
      self::$mailer -> addAddress($to);

      self::$mailer -> isHTML(true);
      self::$mailer -> Subject = $subject;
      self::$mailer -> Body = $body;

      if (isset($altBody)) self::$mailer -> AltBody = $altBody;

      $send = self::$mailer -> send();
    } catch (Exception $e) {
      $send = self::$mailer -> ErrorInfo;
    }

    return $send;
  }

  public function createPasswordRecoveryEmail($data): string {
    $token = $data['token'];
    $path = $data['path'];

    // TODO

    return '<html lang="en">
      <head>
        <title>HTML Email</title>
      </head>
      <body>
        <p>
          Tady je odkaz pro obnovu hesla. <br />
          <a href="' . $path . '?token=' . $token . '">Obnovit heslo</a>
        </p>
      </body>
      </html>';
  }

}
