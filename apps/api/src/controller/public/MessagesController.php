<?php

namespace public;

use controller\Controller;
use model\Messages;

class MessagesController extends Controller {

  private static Messages $messages;

  public function __construct() {
    self::$messages = new Messages();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$messages -> get_detail($id);
    } else {
      return self::$messages -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$messages -> create($data);
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

      default:
        return [];

    }
  }

}
