<?php

namespace public;

use controller\Controller;
use model\Settings;
use model\Articles;

class ArticlesController extends Controller {

  private static Settings $settings;
  private static Articles $articles;

  public function __construct() {
    self::$settings = new Settings();
    self::$articles = new Articles();
  }

  private function getActiveLocales(): array {
    return self::$settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return self::$articles -> get_detail($id, $locales);
    } else {
      return self::$articles -> get_list();
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
