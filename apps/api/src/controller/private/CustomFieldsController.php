<?php

namespace private;

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

  private function create($url, $data): array {
    $customFields = new CustomFields;

    return $customFields -> create($data);
  }

  private function patch($url, $data): array {
    $customFields = new CustomFields;

    return $customFields -> patch($data);
  }

  private function toggle($url, $data): array {
    $customFields = new CustomFields;

    return $customFields -> toggle($data);
  }

  private function delete($url, $data): array {
    $customFields = new CustomFields;

    return $customFields -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $customFields = new CustomFields;

    return $customFields -> delete_permanent($data);
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
