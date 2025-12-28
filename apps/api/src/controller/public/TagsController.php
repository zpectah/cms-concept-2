<?php

namespace public;

use model\Tags;

class TagsController {

  private function get($url): array {
    $tags = new Tags;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $tags -> get_detail($id);
    } else {
      return $tags -> get_list();
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
