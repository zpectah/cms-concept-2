<?php

namespace public;

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
