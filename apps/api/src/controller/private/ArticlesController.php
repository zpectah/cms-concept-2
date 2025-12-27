<?php

namespace private;

use model\Articles;

class ArticlesController {

  private function get($url): array {
    $articles = new Articles;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $articles -> getDetail($id);
    } else {
      return $articles -> getList();
    }
  }

  private function create($url, $data): array {
    $articles = new Articles;

    return $articles -> create($data);
  }

  private function patch($url, $data): array {
    $articles = new Articles;

    return $articles -> patch($data);
  }

  private function approve($url, $data): array {
    $articles = new Articles;

    return $articles -> approve($data);
  }

  private function toggle($url, $data): array {
    $articles = new Articles;

    return $articles -> toggle($data);
  }

  private function delete($url, $data): array {
    $articles = new Articles;

    return $articles -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $articles = new Articles;

    return $articles -> deletePermanent($data);
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
          'approve' => self::approve($url, $data),
          'delete' => self::delete($url, $data),
          'delete-permanent' => self::deletePermanent($url, $data),
        };

      default:
        return [];

    }

  }

}
