<?php

namespace public;

use controller\Controller;
use model\Comments;

class CommentsController extends Controller {

  private static Comments $comments;

  public function __construct() {
    self::$comments = new Comments();
  }

  private function get($url): array {
    $a1 = $url['a1'] ?? null;
    $a2 = $url['a2'] ?? null;

    if ($a1 === 'id' && is_numeric($a2)) {
      return self::$comments -> get_detail($a2);
    }

    if ($a1 && is_numeric($a2)) {
      return self::$comments -> get_list($a1, $a2);
    }

    return self::$comments -> get_list(false, false);
  }

  private function create($url, $data): array {
    return self::$comments -> create($data);
  }

  private function patch($url, $data): array {
    return self::$comments -> patch($data);
  }

  private function delete($url, $data): array {
    return self::$comments -> delete($data);
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
          'delete' => self::delete($url, $data),
        };

      default:
        return [];

    }
  }

}
