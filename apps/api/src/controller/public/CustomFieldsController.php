<?php

namespace public;

use controller\Controller;
use model\CustomFields;
// use model\CustomFieldsItems;

class CustomFieldsController extends Controller {

  private static CustomFields $customFields;

  public function __construct() {
    self::$customFields = new CustomFields();
  }

  private function get($url): array {
    $id = self::url_id($url);

    if ($id) {
      return self::$customFields -> get_detail($id);
    } else {
      return self::$customFields -> get_list();
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
