<?php

namespace public;

use controller\Controller;
use model\CustomFields;
use model\CustomFieldsItems;

class CustomFieldsController extends Controller {

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
