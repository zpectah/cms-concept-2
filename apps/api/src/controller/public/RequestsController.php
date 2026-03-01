<?php

namespace public;

use controller\Controller;
use model\Requests;

class RequestsController extends Controller {

  private static Requests $requests;

  public function __construct() {
    self::$requests = new Requests();
  }

  private function get($url): array {
    $id = self::url_id($url);
    $token = self::url_token($url);

    if ($id) {
      return self::$requests -> get_detail($id, false);
    } else if ($token) {
      return self::$requests -> get_detail(false, $token);
    } else {
      return self::$requests -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$requests -> create($data);
  }

  private function patch($url, $data): array {
    return self::$requests -> patch($data);
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
        };

      default:
        return [];

    }
  }

}
