<?php

namespace private;

use controller\Controller;
use model\Comments;

class CommentsController extends Controller {

  private function get($url): array {
    $comments = new Comments;

    $id = self::url_id($url);

    if ($id) {
      return $comments -> get_detail($id);
    }

    $attrs = self::url_comments($url);

    if ($attrs['type'] && $attrs['id']) {
      return $comments -> get_list($attrs['type'], $attrs['id']);
    }

    return [];
  }

  private function create($url, $data): array {
    $comments = new Comments;

    return $comments -> create($data);
  }

  private function patch($url, $data): array {
    $comments = new Comments;

    return $comments -> patch($data);
  }

  private function toggle($url, $data): array {
    $comments = new Comments;

    return $comments -> toggle($data);
  }

  private function delete($url, $data): array {
    $comments = new Comments;

    return $comments -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $comments = new Comments;

    return $comments -> delete_permanent($data);
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
