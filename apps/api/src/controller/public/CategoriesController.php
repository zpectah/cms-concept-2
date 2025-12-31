<?php

namespace public;

use controller\Controller;
use model\Categories;
use model\Settings;

class CategoriesController extends Controller {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $categories = new Categories;

    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return $categories -> get_detail($id, $locales);
    } else {
      return $categories -> get_list();
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
