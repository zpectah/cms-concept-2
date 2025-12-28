<?php

namespace private;

use model\Settings;

class SettingsController {

  private function get($url): array {

    return [];
  }

  private function patch($url, $data): array {

    return [];
  }

  public function resolve($url, $data): array {
    $method = $url['method'];
    $type = $url['a1'];

    switch ($method) {

      case 'GET':
        return self::get($url);

      case 'PATCH':
        return match ($type) {
          'patch' => self::patch($url, $data),
        };

      default:
        return [];

    }
  }

}
