<?php

namespace private;

use controller\Controller;
use model\Settings;
use model\Categories;

class CategoriesController extends Controller {

  private static Settings $settings;
  private static Categories $categories;

  public function __construct() {
    self::$settings = new Settings();
    self::$categories = new Categories();
  }

  private function getActiveLocales(): array {
    return self::$settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return self::$categories -> get_detail($id, $locales);
    } else {
      return self::$categories -> get_list();
    }
  }

  private function create($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$categories -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$categories -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    return self::$categories -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$categories -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$categories -> delete_permanent($data, $locales);
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
