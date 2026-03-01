<?php

namespace private;

use controller\Controller;
use model\Tags;

class TagsController extends Controller {

  private static Tags $tags;

  public function __construct() {
    self::$tags = new Tags();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$tags -> get_detail($id);
    } else {
      return self::$tags -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$tags -> create($data);
  }

  private function patch($url, $data): array {
    return self::$tags -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$tags -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$tags -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$tags -> delete_permanent($data);
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
