<?php

namespace private;

use model\Requests;
use model\Settings;
use model\Users;
use service\EmailService;
use service\SessionService;

class UserController {

  private function get(): array {
    $users = new Users;
    $sessionService = new SessionService;

    $session = $sessionService -> getActiveSession('user');

    if ($session['active']) {
      $email = $session['session']['email'];

      $response = [
        'active' => true,
        'user' => $users -> get_detail(null, $email),
      ];
    } else {
      $response = [
        'active' => false,
        'user' => null,
      ];
    }

    return $response;
  }

  private function checkEmail($data): array {
    $users = new Users;

    $email = $data['email'];
    $user = $users -> get_detail(null, $email);
    $id = $user['id'] ?? 0;

    return [
      'match' => !!$user,
      'id' => $id,
    ];
  }

  private function checkPassword($data): array {
    $users = new Users;

    $email = $data['email'];
    $rawPassword = $data['password'];
    $password = trim($rawPassword);

    $user = $users -> get_detail(null, $email, true);
    $hash = $user['password'];
    $id = $user['id'] ?? 0;

    return [
      'match' => password_verify($password, $hash),
      'id' => $id,
    ];
  }

  private function login($data): array {
    $sessionService = new SessionService;

    return $sessionService -> openEntitySession('user', $data);
  }

  private function logout($data): array {
    $sessionService = new SessionService;

    return $sessionService -> closeEntitySession('user', $data);
  }

  private function passwordRecoveryRequest($data): array {
    $users = new Users;
    $requests = new Requests;
    $emailService = new EmailService;
    $settings = new Settings;

    $response = [
      'tokenCreated' => false,
      'requestCreated' => false,
      'emailCreated' => false,
      'emailSend' => false,
    ];

    $email = $data['email'];
    $user = $users -> get_detail(null, $email);
    $settingsTable = $settings -> get_table();

    if (isset($user['id'])) {
      $token = getRandomString(24);

      $request = [
        'type' => $data['type'],
        'token' => $token,
        'applicant' => $email,
        'status' => 1,
      ];
      $requestCreated = $requests -> create($request);

      $password = decrypt_string($settingsTable['email']['smtp']['password'], EMAIL_SMTP_CRYPT_KEY);
      $emailCredentials = [
        'smtp_port' => $settingsTable['email']['smtp']['port'],
        'smtp_host' => $settingsTable['email']['smtp']['host'],
        'smtp_username' => $settingsTable['email']['smtp']['username'],
        'smtp_password' => $password,
        'from' => $settingsTable['email']['smtp']['username'],
        'domain' => $settingsTable['project']['name'],
      ];

      $emailBody = $emailService -> createPasswordRecoveryEmail([
        'token' => $token,
        'path' => $data['path'],
      ]);
      $emailSend = $emailService -> createEmail($email, 'Password recovery', $emailBody, $emailCredentials);

      $response['tokenCreated'] = !!$token;
      $response['requestCreated'] = !!$requestCreated['id'];
      $response['emailCreated'] = !!$emailBody;
      $response['emailSend'] = !!$emailSend;
    }

    return $response;
  }

  private function passwordRecoveryRequestCheck($data): array {
    $requests = new Requests;

    $token = $data['token'];
    $request = $requests -> get_detail(null, $token);

    $response = [
      'email' => null,
    ];

    if (isset($request['id'])) {
      $response['id'] = $request['id'];
      $response['email'] = $request['applicant'];
    }

    return $response;
  }

  private function passwordRecoveryToken($data): array {
    $users = new Users;
    $requests = new Requests;

    $response = [
      'requestActive' => false,
      'userActive' => false,
      'userUpdated' => false,
      'requestUpdated' => false,
    ];

    $token = $data['token'];
    // $email = $data['email']; // TODO: check
    $password = $data['password'];

    $request = self::passwordRecoveryRequestCheck([ 'token' => $token ]);

    if ($request['id']) {
      $response['requestActive'] = true;

      $id = $request['id'];
      $email = $request['email'];

      $user = $users -> get_detail(null, $email);

      if (isset($user['id'])) {
        $changedPassword = $users -> patch_password([
          'email' => $email,
          'password' => $password,
        ]);
        $changedRequest = $requests -> toggle([ $id ]);

        $response['userActive'] = true;
        $response['userUpdated'] = $changedPassword['rows'] === 1;
        $response['requestUpdated'] = $changedRequest['rows'] === 1;
      }
    }

    return $response;
  }

  private function patch($data): array {
    $users = new Users;
    $sessionService = new SessionService;

    $response = [];

    $session = $sessionService -> getActiveSession('user');

    if ($session['active']) {
      $email = $session['session']['email'];

      if ($email === $data['email']) {
        $response = $users -> patch($data);
      }
    }

    return $response;
  }

  public function resolve($url, $data): array {
    $method = $url['method'];
    $type = $url['a1'];

    switch ($method) {

      case 'GET':
        return self::get();

      case 'POST':
        return match ($type) {
          'check-email' => self::checkEmail($data),
          'check-password' => self::checkPassword($data),
          'login' => self::login($data),
          'logout' => self::logout($data),
          'password-recovery-request' => self::passwordRecoveryRequest($data),
          'password-recovery-request-check' => self::passwordRecoveryRequestCheck($data),
          'password-recovery-token' => self::passwordRecoveryToken($data),
        };

      case 'PATCH':
        return match ($type) {
          'patch' => self::patch($data),
        };

      default:
        return [];

    }
  }

}
