<?php

namespace public;

use model\Files;

class FilesController {

  private function get($url): array {
    $files = new Files;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

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
