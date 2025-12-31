<?php

namespace public;

use model\Members;

class MemberController {

  // TODO

  public function resolve($url, $data): array {
    $method = $url['method'];
    $type = $url['a1'];

    // TODO

    switch ($method) {

      case 'GET':
        return ['get'];

      case 'POST':
        return match ($type) {
          'check-email' => ['check-email'],
          'check-password' => ['check-password'],
          'login' => ['login'],
          'logout' => ['logout'],
          'password-recovery-request' => ['password-recovery-request'],
          'password-recovery-request-check' => ['password-recovery-request-check'],
          'password-recovery-token' => ['password-recovery-token'],
        };

      case 'PATCH':
        return match ($type) {
          'patch' => ['patch']
        };

      default:
        return [];

    }
  }

}
