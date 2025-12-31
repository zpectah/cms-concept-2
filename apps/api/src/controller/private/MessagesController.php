<?php

namespace private;

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

  private function patch($url, $data): array {
    $message = new Messages;

    return $message -> patch($data);
  }

  private function toggle($url, $data): array {
    $message = new Messages;

    return $message -> toggle($data);
  }

  private function read($url, $data): array {
    $message = new Messages;

    return $message -> read($data);
  }

  private function delete($url, $data): array {
    $message = new Messages;

    return $message -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $message = new Messages;

    return $message -> delete_permanent($data);
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
          'read' => self::read($url, $data),
          'delete' => self::delete($url, $data),
          'delete-permanent' => self::deletePermanent($url, $data),
        };

      default:
        return [];

    }
  }

}
