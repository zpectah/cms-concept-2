<?php

namespace public;

use model\Articles;

class ArticlesController {

  private function get($url): array {
    $articles = new Articles;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $articles -> getDetail($id);
    } else {
      return $articles -> getList();
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
