<?php

namespace model;

use PDO;
use model\Model;

class Comments extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data): array {
    $item = [
      ...$data,

      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    return $item;
  }

  /** Parsed JSON data for DB */
  private function parse_json_to_db($data): array {
    $item = [
      ...$data,

      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];

    return $item;
  }


  public function get_list(): array {
    $conn = self::connection();

    return [];
  }

  public function get_detail($id): array {
    $conn = self::connection();

    return [];
  }

  public function create($data): array {
    $conn = self::connection();

    return [
      'id' => 0,
    ];
  }

  public function patch($data): array {
    $conn = self::connection();

    return [
      'rows' => 0,
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();

    return [
      'rows' => 0,
    ];
  }

  public function delete($data): array {
    $conn = self::connection();

    return [
      'rows' => 0,
    ];
  }

  public function delete_permanent($data): array {
    $conn = self::connection();

    return [
      'rows' => 0,
    ];
  }

}
