<?php

namespace public;

use controller\Controller;
use model\Settings;
use model\Translations;

class TranslationsController extends Controller {

  private static Settings $settings;
  private static Translations $translations;

  public function __construct() {
    self::$settings = new Settings();
    self::$translations = new Translations();
  }

  private function getActiveLocales(): array {
    return self::$settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return self::$translations -> get_detail($id, $locales);
    } else {
      return self::$translations -> get_list();
    }
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
