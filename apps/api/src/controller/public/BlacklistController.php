<?php

namespace public;

use controller\Controller;
use model\Blacklist;

class BlacklistController extends Controller {

  private static Blacklist $blacklist;

  public function __construct() {
    self::$blacklist = new Blacklist();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$blacklist -> get_detail($id);
    } else {
      return self::$blacklist -> get_list();
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
