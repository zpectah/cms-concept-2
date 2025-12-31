<?php

namespace public;

use controller\Controller;
use model\Tags;

class TagsController extends Controller {

  private function get($url): array {
    $tags = new Tags;

    $id = self::url_id($url);

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
