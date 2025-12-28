<?php

namespace public;

use model\Categories;

class CategoriesController {

  private function get($url): array {
    $categories = new Categories;

    $locales = ['en']; // TODO

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

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
