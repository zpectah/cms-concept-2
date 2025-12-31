<?php

namespace public;

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
