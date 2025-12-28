<?php

namespace public;

use model\Translations;

class TranslationsController {

  private function get($url): array {

    return [];
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
