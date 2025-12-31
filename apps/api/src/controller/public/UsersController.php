<?php

namespace public;

use model\Users;

class UsersController {

  private function get($url): array {
    $users = new Users;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $users -> get_detail($id, false);
    } else {
      return $users -> get_list();
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
