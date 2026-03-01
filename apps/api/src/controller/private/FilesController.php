<?php

namespace private;

use controller\Controller;
use model\Files;

class FilesController extends Controller {

  private static Files $files;

  public function __construct() {
    self::$files = new Files();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$files -> get_detail($id);
    } else {
      return self::$files -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$files -> create_many($data);
  }

  private function upload($url, $data): array {
    return self::$files -> upload_many($data);
  }

  private function patch($url, $data): array {
    return self::$files -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$files -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$files -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $ids = $data['ids'];
    $path = $data['path'];

    return self::$files -> delete_permanent($ids, $path);
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
          'upload' => self::upload($url, $data),
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
