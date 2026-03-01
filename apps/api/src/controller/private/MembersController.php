<?php

namespace private;

use controller\Controller;
use model\Members;

class MembersController extends Controller {

  private static Members $members;

  public function __construct() {
    self::$members = new Members();
  }

  private function get($url): array {
    $id = self::url_id($url);
    $email = self::url_email($url);

    if ($id) {
      return self::$members -> get_detail($id, false);
    } else if ($email) {
      return self::$members -> get_detail(false, $email);
    } else {
      return self::$members -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$members -> create($data);
  }

  private function patch($url, $data): array {
    return self::$members -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$members -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$members -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$members -> delete_permanent($data);
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
