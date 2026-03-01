<?php

namespace private;

use controller\Controller;
use model\Users;

class UsersController extends Controller {

  private static Users $users;

  public function __construct() {
    self::$users = new Users();
  }

  private function get($url): array {
    $id = self::url_id($url);
    $email = self::url_email($url);

    if ($id) {
      return self::$users -> get_detail($id, false);
    } else if ($email) {
      return self::$users -> get_detail(false, $email);
    } else {
      return self::$users -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$users -> create($data);
  }

  private function patch($url, $data): array {
    return self::$users -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$users -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$users -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$users -> delete_permanent($data);
  }

  public function resolve($url, $data): array {
    $method = $url['method'];
    $type = $url['a1'];

    switch ($method) {

      case 'GET':
        return self::get($url);

      case 'POST':
        return match ($type) {
          'create' => self::create($url, $data),
        };

      case 'PATCH':
        return match ($type) {
          'patch' => self::patch($url, $data),
          'toggle' => self::toggle($url, $data),
          'delete' => self::delete($url, $data),
          'delete-permanent' => self::deletePermanent($url, $data),
        };

      default:
        return [];

    }
  }

}
