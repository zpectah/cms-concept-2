<?php

namespace private;

use controller\Controller;
use model\Blacklist;

class BlacklistController extends Controller {

  private function get($url): array {
    $blacklist = new Blacklist;

    $id = self::url_id($url);

    if ($id) {
      return $blacklist -> get_detail($id);
    } else {
      return $blacklist -> get_list();
    }
  }

  private function create($url, $data): array {
    $blacklist = new Blacklist;

    return $blacklist -> create($data);
  }

  private function patch($url, $data): array {
    $blacklist = new Blacklist;

    return $blacklist -> patch($data);
  }

  private function toggle($url, $data): array {
    $blacklist = new Blacklist;

    return $blacklist -> toggle($data);
  }

  private function delete($url, $data): array {
    $blacklist = new Blacklist;

    return $blacklist -> delete($data);
  }

  private function deletePermanent($url, $data): array {
    $blacklist = new Blacklist;

    return $blacklist -> delete_permanent($data);
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
