<?php

namespace public;

use model\Blacklist;

class BlacklistController {

  private function get($url): array {
    $blacklist = new Blacklist;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

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
