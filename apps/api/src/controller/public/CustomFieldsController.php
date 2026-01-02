<?php

namespace public;

use controller\Controller;
use model\CustomFields;
use model\CustomFieldsItems;

class CustomFieldsController extends Controller {

  private function get($url): array {
    $customFields = new CustomFields;

    $id = self::url_id($url);

    if ($id) {
      return $customFields -> get_detail($id);
    } else {
      return $customFields -> get_list();
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
