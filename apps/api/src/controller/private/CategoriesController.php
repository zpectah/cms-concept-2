<?php

namespace private;

use model\Categories;

class CategoriesController {

  private function get($url): array {
    $categories = new Categories;

    $locales = ['en']; // TODO

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $categories -> get_detail($id, $locales);
    } else {
      return $categories -> get_list();
    }
  }

  private function create($url, $data): array {
    $categories = new Categories;

    $locales = ['en']; // TODO

    return $categories -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $categories = new Categories;

    $locales = ['en']; // TODO

    return $categories -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    $categories = new Categories;

    return $categories -> toggle($data);
  }

  private function delete($url, $data): array {
    $categories = new Categories;

    return $categories -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $categories = new Categories;

    $locales = ['en']; // TODO

    return $categories -> delete_permanent($data, $locales);
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
