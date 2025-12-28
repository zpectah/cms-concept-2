<?php

namespace public;

use model\Requests;

class RequestsController {

  private function get($url): array {

    return [];
  }

  private function create($url, $data): array {

    return [];
  }

  private function patch($url, $data): array {

    return [];
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
        };

      default:
        return [];

    }
  }

}
