<?php

namespace private;

use controller\Controller;
use model\Menu;
use model\MenuItems;

class MenuController extends Controller {

  private function get($url): array {
    $menu = new Menu;

    $id = self::url_id($url);

    if ($id) {
      return $menu -> get_detail($id);
    } else {
      return $menu -> get_list();
    }
  }

  private function create($url, $data): array {
    $menu = new Menu;

    return $menu -> create($data);
  }

  private function patch($url, $data): array {
    $menu = new Menu;

    return $menu -> patch($data);
  }

  private function toggle($url, $data): array {
    $menu = new Menu;

    return $menu -> toggle($data);
  }

  private function delete($url, $data): array {
    $menu = new Menu;

    return $menu -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $menu = new Menu;

    return $menu -> delete_permanent($data);
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
