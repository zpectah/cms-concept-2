<?php

namespace public;

use controller\Controller;
use model\Settings;

class SettingsController extends Controller {

  private static Settings $settings;

  public function __construct() {
    self::$settings = new Settings();
  }

  private function get($url): array {
    return self::$settings -> get_table();
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
