<?php

namespace private;

use controller\Controller;
use model\Comments;

class CommentsController extends Controller {

  private static Comments $comments;

  public function __construct() {
    self::$comments = new Comments();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$comments -> get_detail($id);
    }

    $attrs = self::url_comments($url);

    if ($attrs['type'] && $attrs['id']) {
      return self::$comments -> get_list($attrs['type'], $attrs['id']);
    }

    return [];
  }

  private function create($url, $data): array {
    return self::$comments -> create($data);
  }

  private function patch($url, $data): array {
    return self::$comments -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$comments -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$comments -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$comments -> delete_permanent($data);
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
