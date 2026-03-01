<?php

namespace private;

use controller\Controller;
use model\Settings;
use model\Translations;

class TranslationsController extends Controller {

  private static Settings $settings;
  private static Translations $translations;

  public function __construct() {
    self::$settings = new Settings();
    self::$translations = new Translations();
  }

  private function getActiveLocales(): array {
    return self::$settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return self::$translations -> get_detail($id, $locales);
    } else {
      return self::$translations -> get_list();
    }
  }

  private function create($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$translations -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$translations -> patch($data, $locales);
  }

  private function toggle($url, $data): array {
    return self::$translations -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$translations -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $locales = self::getActiveLocales();

    return self::$translations -> delete_permanent($data, $locales);
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
