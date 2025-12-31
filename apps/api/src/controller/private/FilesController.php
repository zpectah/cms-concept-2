<?php

namespace private;

use controller\Controller;
use model\Files;

class FilesController extends Controller {

  private function get($url): array {
    $files = new Files;

    $id = self::url_id($url);

    if ($id) {
      return $files -> get_detail($id);
    } else {
      return $files -> get_list();
    }
  }

  private function create($url, $data): array {
    $files = new Files;

    return $files -> create($data);
  }

  private function upload($url, $data): array {
    $files = new Files;

    return $files -> upload($data);
  }

  private function patch($url, $data): array {
    $files = new Files;

    return $files -> patch($data);
  }

  private function toggle($url, $data): array {
    $files = new Files;

    return $files -> toggle($data);
  }

  private function delete($url, $data): array {
    $files = new Files;

    return $files -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $files = new Files;

    $ids = $data['ids'];
    $path = $data['path'];

    return $files -> delete_permanent($ids, $path);
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
