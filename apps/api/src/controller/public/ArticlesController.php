<?php

namespace public;

use controller\Controller;
use model\Articles;
use model\Settings;

class ArticlesController extends Controller {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $articles = new Articles;

    $locales = self::getActiveLocales();
    $id = self::url_id($url);

    if ($id) {
      return $articles -> get_detail($id, $locales);
    } else {
      return $articles -> get_list();
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
