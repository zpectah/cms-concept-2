<?php

namespace public;

use model\Pages;
use model\Settings;

class PagesController {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $pages = new Pages;

    $locales = self::getActiveLocales();

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $pages -> get_detail($id, $locales);
    } else {
      return $pages -> get_list();
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
