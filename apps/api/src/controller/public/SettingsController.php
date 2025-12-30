<?php

namespace public;

use model\Settings;

class SettingsController {

  private function get($url): array {
    $settings = new Settings;

    return $settings -> get_table();
  }

  public function resolve($url, $data): array {
    $method = $url['method'];

    switch ($method) {

      case 'GET':
        return self::get($url);

      default:
        return [];

    }
  }

}
