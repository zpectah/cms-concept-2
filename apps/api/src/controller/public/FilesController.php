<?php

namespace public;

use controller\Controller;
use model\Files;

class FilesController extends Controller {

  private static Files $files;

  public function __construct() {
    self::$files = new Files();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$files -> get_detail($id);
    } else {
      return self::$files -> get_list();
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
