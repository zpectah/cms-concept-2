<?php

namespace private;

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

  private function patch($url, $data): array {
    return self::$messages -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$messages -> toggle($data);
  }

  private function read($url, $data): array {
    return self::$messages -> read($data);
  }

  private function delete($url, $data): array {
    return self::$messages -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$messages -> delete_permanent($data);
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
