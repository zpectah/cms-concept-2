<?php

namespace public;

use controller\Controller;
use model\Settings;
use model\Pages;

class PagesController extends Controller {

  private static Settings $settings;
  private static Pages $pages;

  public function __construct() {
    self::$settings = new Settings();
    self::$pages = new Pages();
  }

  private function getActiveLocales(): array {
    return self::$settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return self::$pages -> get_detail($id, $locales);
    } else {
      return self::$pages -> get_list();
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
