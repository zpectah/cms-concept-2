<?php

namespace private;

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

  private function create($url, $data): array {
    $menu = new MenuItems;

    $locales = self::getLocales()['active'];

    return $menu -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $menu = new MenuItems;

    $locales = self::getLocales()['active'];

    return $menu -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    $menu = new MenuItems;

    return $menu -> toggle($data);
  }

  private function delete($url, $data): array {
    $menu = new MenuItems;

    return $menu -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $menu = new MenuItems;

    $locales = self::getLocales()['installed'];

    return $menu -> delete_permanent($data, $locales);
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
