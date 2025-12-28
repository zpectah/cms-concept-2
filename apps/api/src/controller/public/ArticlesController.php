<?php

namespace public;

use model\Articles;

class ArticlesController {

  private function get($url): array {
    $articles = new Articles;

    $locales = ['en']; // TODO

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $articles -> get_detail($id, $locales);
    } else {
      return $articles -> get_list();
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
