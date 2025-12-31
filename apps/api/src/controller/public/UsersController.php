<?php

namespace public;

use controller\Controller;
use model\Users;

class UsersController extends Controller {

  private function get($url): array {
    $users = new Users;

    $id = self::url_id($url);

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
