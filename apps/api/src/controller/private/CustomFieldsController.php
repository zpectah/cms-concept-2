<?php

namespace private;

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

  private function create($url, $data): array {
    return self::$customFields -> create($data);
  }

  private function patch($url, $data): array {
    return self::$customFields -> patch($data);
  }

  private function toggle($url, $data): array {
    return self::$customFields -> toggle($data);
  }

  private function delete($url, $data): array {
    return self::$customFields -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    return self::$customFields -> delete_permanent($data);
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
