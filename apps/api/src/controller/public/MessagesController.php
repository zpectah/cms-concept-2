<?php

namespace public;

use controller\Controller;
use model\Messages;

class MessagesController extends Controller {

  private function get($url): array {
    $message = new Messages;

    $id = self::url_id($url);

    if ($id) {
      return $message -> get_detail($id);
    } else {
      return $message -> get_list();
    }
  }

  private function create($url, $data): array {
    $message = new Messages;

    return $message -> create($data);
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
