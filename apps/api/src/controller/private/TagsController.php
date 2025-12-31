<?php

namespace private;

use controller\Controller;
use model\Tags;

class TagsController extends Controller {

  private function get($url): array {
    $tags = new Tags;

    $id = self::url_id($url);

    if ($id) {
      return $tags -> get_detail($id);
    } else {
      return $tags -> get_list();
    }
  }

  private function create($url, $data): array {
    $tags = new Tags;

    return $tags -> create($data);
  }

  private function patch($url, $data): array {
    $tags = new Tags;

    return $tags -> patch($data);
  }

  private function toggle($url, $data): array {
    $tags = new Tags;

    return $tags -> toggle($data);
  }

  private function delete($url, $data): array {
    $tags = new Tags;

    return $tags -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $tags = new Tags;

    return $tags -> delete_permanent($data);
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
