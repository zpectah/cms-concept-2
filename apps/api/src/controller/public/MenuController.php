<?php

namespace public;

use model\Menu;
use model\MenuItems;

class MenuController {

  private function get($url): array {
    $menu = new Menu;

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $menu -> get_detail($id);
    } else {
      return $menu -> get_list();
    }
  }

  public function resolve($url, $data): array {
    $method = $url['method'];

    switch ($method) {

      case 'GET':
        return self::get($url);

      default:
        return [];

    }
  }

}
