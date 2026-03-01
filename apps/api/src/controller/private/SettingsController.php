<?php

namespace private;

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

  private function patch($url, $data): array {
    return self::$settings -> patch($data);
  }

  private function localeInstall($url, $data): array {
    return self::$settings -> locale_install($data);
  }

  private function localeToggle($url, $data): array {
    return self::$settings -> locale_toggle($data);
  }

  private function localeDefault($url, $data): array {
    return self::$settings -> locale_default($data);
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
          'locale-install' => self::localeInstall($url, $data),
          'locale-toggle' => self::localeToggle($url, $data),
          'locale-default' => self::localeDefault($url, $data),
        };

      default:
        return [];

    }
  }

}
