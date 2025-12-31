<?php

namespace private;

use model\Articles;
use model\Settings;

class ArticlesController {

  private function getActiveLocales(): array {
    $settings = new Settings;

    return $settings -> get_table()['locales']['active'];
  }

  private function get($url): array {
    $articles = new Articles;

    $locales = self::getActiveLocales();

    $id = $url['a1'] === 'id' ? $url['a2'] : null;

    if ($id) {
      return $articles -> get_detail($id, $locales);
    } else {
      return $articles -> get_list();
    }
  }

  private function create($url, $data): array {
    $articles = new Articles;

    $locales = self::getActiveLocales();

    return $articles -> create($data, $locales);
  }

  private function patch($url, $data): array {
    $articles = new Articles;

    $locales = self::getActiveLocales();

    return $articles -> patch($data, $locales);
  }

  private function approve($url, $data): array {
    $articles = new Articles;

    return $articles -> approve($data);
  }

  private function toggle($url, $data): array {
    $articles = new Articles;

    return $articles -> toggle($data);
  }

  private function delete($url, $data): array {
    $articles = new Articles;

    return $articles -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $articles = new Articles;

    $locales = self::getActiveLocales();

    return $articles -> delete_permanent($data, $locales);
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
          'approve' => self::approve($url, $data),
          'delete' => self::delete($url, $data),
          'delete-permanent' => self::deletePermanent($url, $data),
        };

      default:
        return [];

    }

  }

}
