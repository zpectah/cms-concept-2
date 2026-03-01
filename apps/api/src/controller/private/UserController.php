<?php

namespace private;

use controller\Controller;
use model\Settings;
use model\Users;
use model\Requests;
use service\SessionService;
use service\EmailService;

class UserController extends Controller {

  private static Settings $settings;
  private static Users $users;
  private static Requests $requests;
  private static SessionService $sessionService;
  private static EmailService $emailService;

  public function __construct() {
    self::$settings = new Settings();
    self::$users = new Users();
    self::$requests = new Requests();
    self::$sessionService = new SessionService();
    self::$emailService = new EmailService();
  }

  private function get(): array {
    $session = self::$sessionService -> getActiveSession('user');

    if ($session['active']) {
      $email = $session['session']['email'];

      $response = [
        'active' => true,
        'user' => self::$users -> get_detail(null, $email),
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
    $email = $data['email'];
    $user = self::$users -> get_detail(null, $email);
    $id = $user['id'] ?? 0;

    return [
      'match' => !!$user,
      'id' => $id,
    ];
  }

  private function checkPassword($data): array {
    $defaultResponse = [
      'match' => false,
      'id' => 0,
    ];

    $email = $data['email'] ?? null;
    $password = trim($data['password'] ?? '');

    if (!$email || !$password) return $defaultResponse;

    $user = self::$users -> get_detail(null, $email, true);

    if (!isset($user['password'])) return $defaultResponse;

    return [
      'match' => match_password($password, $user['password']),
      'id' => $user['id'] ?? 0,
    ];
  }

  private function login($data): array {
    return self::$sessionService -> openEntitySession('user', $data);
  }

  private function logout($data): array {
    return self::$sessionService -> closeEntitySession('user', $data);
  }

  private function passwordRecoveryRequest($data): array {
    $response = [
      'tokenCreated' => false,
      'requestCreated' => false,
      'emailCreated' => false,
      'emailSend' => false,
    ];

    $email = $data['email'];
    $user = self::$users -> get_detail(null, $email);
    $settingsTable = self::$settings -> get_table();

    if (isset($user['id'])) {
      $token = getRandomString(24);

      $request = [
        'type' => $data['type'],
        'token' => $token,
        'applicant' => $email,
        'status' => 1,
      ];
      $requestCreated = self::$requests -> create($request);

      $password = decrypt_string($settingsTable['email']['smtp']['password'], EMAIL_SMTP_CRYPT_KEY);
      $emailCredentials = [
        'smtp_port' => $settingsTable['email']['smtp']['port'],
        'smtp_host' => $settingsTable['email']['smtp']['host'],
        'smtp_username' => $settingsTable['email']['smtp']['username'],
        'smtp_password' => $password,
        'from' => $settingsTable['email']['smtp']['username'],
        'domain' => $settingsTable['project']['name'],
      ];

      $emailBody = self::$emailService -> createPasswordRecoveryEmail([
        'token' => $token,
        'path' => $data['path'],
      ]);
      $emailSend = self::$emailService -> createEmail($email, 'Password recovery', $emailBody, $emailCredentials);

      $response['tokenCreated'] = !!$token;
      $response['requestCreated'] = !!$requestCreated['id'];
      $response['emailCreated'] = !!$emailBody;
      $response['emailSend'] = !!$emailSend;
    }

    return $response;
  }

  private function passwordRecoveryRequestCheck($data): array {
    $token = $data['token'];
    $request = self::$requests -> get_detail(null, $token);

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
    $response = [
      'requestActive' => false,
      'userActive' => false,
      'userUpdated' => false,
      'requestUpdated' => false,
    ];

    $token = $data['token'];
    $password = $data['password'];

    $request = self::passwordRecoveryRequestCheck([ 'token' => $token ]);

    if ($request['id']) {
      $response['requestActive'] = true;

      $id = $request['id'];
      $email = $request['email'];

      $user = self::$users -> get_detail(null, $email);

      if (isset($user['id'])) {
        $changedPassword = self::$users -> patch_password([
          'email' => $email,
          'password' => $password,
        ]);
        $changedRequest = self::$requests -> toggle([ $id ]);

        $response['userActive'] = true;
        $response['userUpdated'] = $changedPassword['rows'] === 1;
        $response['requestUpdated'] = $changedRequest['rows'] === 1;
      }
    }

    return $response;
  }

  private function patch($data): array {
    $response = [];

    $session = self::$sessionService -> getActiveSession('user');

    if ($session['active']) {
      $email = $session['session']['email'];

      if ($email === $data['email']) {
        $response = self::$users -> patch($data);
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
