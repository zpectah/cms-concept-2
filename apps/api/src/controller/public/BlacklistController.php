<?php

namespace public;

use controller\Controller;
use model\Blacklist;

class BlacklistController extends Controller {

  private function get($url): array {
    $blacklist = new Blacklist;

    $id = self::url_id($url);

    if ($id) {
      return $blacklist -> get_detail($id);
    } else {
      return $blacklist -> get_list();
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
