<?php

namespace private;

use model\Pages;
use model\Settings;

class PagesController {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $pages = new Pages;

    $locales = self::getActiveLocales();

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $pages -> get_detail($id, $locales);
    } else {
      return $pages -> get_list();
    }
  }

  private function create($url, $data): array {
    $pages = new Pages;

    $locales = self::getActiveLocales();

    return $pages -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $pages = new Pages;

    $locales = self::getActiveLocales();

    return $pages -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    $pages = new Pages;

    return $pages -> toggle($data);
  }

  private function delete($url, $data): array {
    $pages = new Pages;

    return $pages -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $pages = new Pages;

    $locales = self::getActiveLocales();

    return $pages -> delete_permanent($data, $locales);
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
