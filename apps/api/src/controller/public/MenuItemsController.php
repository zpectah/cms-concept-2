<?php

namespace public;

use controller\Controller;
use model\MenuItems;
use model\Settings;

class MenuItemsController extends Controller {

  private function getLocales(): array {
    $settings = new Settings;

    return [
      ...$settings -> get_table()['locales'],
    ];
  }

  private function get($url): array {
    $menu = new MenuItems;

    $locales = self::getLocales()['active'];
    $id = self::url_id($url);
    $menuId = self::url_menuId($url);

    if ($id) {
      return $menu -> get_detail($id, $locales);
    } else if ($menuId) {
      return $menu -> get_list($menuId);
    } else {
      return [];
    }
  }

  public function resolve($url, $data): array {
    $method = $url['method'];
    $type = $url['a1'];

    switch ($method) {

      case 'GET':
        return self::get($url);

      default:
        return [];

    }
  }

}
