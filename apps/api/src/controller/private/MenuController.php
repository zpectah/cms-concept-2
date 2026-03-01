<?php

namespace private;

use controller\Controller;
use model\Menu;
// use model\MenuItems;

class MenuController extends Controller {

  private static Menu $menu;

  public function __construct() {
    self::$menu = new Menu();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$menu -> get_detail($id);
    } else {
      return self::$menu -> get_list();
    }
  }

  private function create($url, $data): array {
    return self::$menu -> create($data);
  }

  private function patch($url, $data): array {
    return self::$menu -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$menu -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$menu -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$menu -> delete_permanent($data);
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
