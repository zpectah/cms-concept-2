<?php

namespace private;

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

  private function create($url, $data): array {
    $locales = self::getLocales()['active'];

    return self::$menuItems -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $locales = self::getLocales()['active'];

    return self::$menuItems -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    return self::$menuItems -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$menuItems -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $locales = self::getLocales()['installed'];

    return self::$menuItems -> delete_permanent($data, $locales);
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
