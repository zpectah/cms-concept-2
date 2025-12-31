<?php

namespace public;

use controller\Controller;
use model\Translations;
use model\Settings;

class TranslationsController extends Controller {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $translations = new Translations;

    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return $translations -> get_detail($id, $locales);
    } else {
      return $translations -> get_list();
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
