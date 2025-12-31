<?php

namespace private;

use model\Translations;
use model\Settings;

class TranslationsController {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $translations = new Translations;

    $locales = self::getActiveLocales();

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $translations -> get_detail($id, $locales);
    } else {
      return $translations -> get_list();
    }
  }

  private function create($url, $data): array {
    $translations = new Translations;

    $locales = self::getActiveLocales();

    return $translations -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $translations = new Translations;

    $locales = self::getActiveLocales();

    return $translations -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    $translations = new Translations;

    return $translations -> toggle($data);
  }

  private function delete($url, $data): array {
    $translations = new Translations;

    return $translations -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $translations = new Translations;

    $locales = self::getActiveLocales();

    return $translations -> delete_permanent($data, $locales);
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
