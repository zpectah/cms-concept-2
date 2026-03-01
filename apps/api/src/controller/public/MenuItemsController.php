<?php

namespace public;

use controller\Controller;
use model\Settings;
use model\MenuItems;

class MenuItemsController extends Controller {

  private static Settings $settings;
  private static MenuItems $menuItems;

  public function __construct() {
    self::$settings = new Settings();
    self::$menuItems = new MenuItems();
  }

  private function getLocales(): array {
    return self::$settings -> get_table()['locales'];
  }

  private function get($url): array {
    $locales = self::getLocales()['active'];
    $id = self::url_id($url);
    $menuId = self::url_menuId($url);

    if ($id) {
      return self::$menuItems -> get_detail($id, $locales);
    } else if ($menuId) {
      return self::$menuItems -> get_list($menuId);
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
