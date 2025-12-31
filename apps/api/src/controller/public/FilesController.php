<?php

namespace public;

use controller\Controller;
use model\Files;

class FilesController extends Controller {

  private function get($url): array {
    $files = new Files;

    $id = self::url_id($url);

    if ($id) {
      return $files -> get_detail($id);
    } else {
      return $files -> get_list();
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
