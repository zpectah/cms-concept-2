<?php

namespace private;

use controller\Controller;
use model\CustomFields;
use model\CustomFieldsItems;

class CustomFieldsController extends Controller {

  private function get($url): array {

    return [];
  }

  private function create($url, $data): array {

    return [];
  }

  private function patch($url, $data): array {

    return [];
  }

  private function toggle($url, $data): array {

    return [];
  }

  private function delete($url, $data): array {

    return [];
  }

  private function deletePermanent($url, $data): array {

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
          'toggle' => self::toggle($url, $data),
          'delete' => self::delete($url, $data),
          'delete-permanent' => self::deletePermanent($url, $data),
        };

      default:
        return [];

    }
  }

}
