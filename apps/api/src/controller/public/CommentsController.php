<?php

namespace public;

use model\Comments;

class CommentsController {

  private function get($url): array {
    $comments = new Comments;

    $a1 = $url['a1'] ?? null;
    $a2 = $url['a2'] ?? null;

    if ($a1 === 'id' && is_numeric($a2)) {
      return $comments -> get_detail($a2);
    }

    if ($a1 && is_numeric($a2)) {
      return $comments -> get_list($a1, $a2);
    }

    return $comments -> get_list(false, false);
  }

  private function create($url, $data): array {
    $comments = new Comments;

    return $comments -> create($data);
  }

  private function patch($url, $data): array {
    $comments = new Comments;

    return $comments -> patch($data);
  }

  private function delete($url, $data): array {
    $comments = new Comments;

    return $comments -> delete($data);
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
