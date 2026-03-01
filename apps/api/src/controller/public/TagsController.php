<?php

namespace public;

use controller\Controller;
use model\Tags;

class TagsController extends Controller {

  private static Tags $tags;

  public function __construct() {
    self::$tags = new Tags();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$tags -> get_detail($id);
    } else {
      return self::$tags -> get_list();
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
