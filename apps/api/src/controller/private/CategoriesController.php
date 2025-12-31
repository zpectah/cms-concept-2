<?php

namespace private;

use controller\Controller;
use model\Categories;
use model\Settings;

class CategoriesController extends Controller {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $categories = new Categories;

    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return $categories -> get_detail($id, $locales);
    } else {
      return $categories -> get_list();
    }
  }

  private function create($url, $data): array {
    $categories = new Categories;

    $locales = self::getActiveLocales();

    return $categories -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $categories = new Categories;

    $locales = self::getActiveLocales();

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

    $locales = self::getActiveLocales();

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
