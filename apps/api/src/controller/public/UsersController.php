<?php

namespace public;

use controller\Controller;
use model\Users;

class UsersController extends Controller {

  private static Users $users;

  public function __construct() {
    self::$users = new Users();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$users -> get_detail($id, false);
    } else {
      return self::$users -> get_list();
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
