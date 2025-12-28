<?php

namespace model;

use PDO;
use model\Model;

class Translations extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data, $localeData = false): array {
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

  /** Parsed locale object data */
  private function parse_locale_row($row): array {
    return [
      'title' => $row['title'] ?? '',
      'description' => $row['description'] ?? '',
    ];
  }


  public function get_list(): array {
    $conn = self::connection();

    return [];
  }

  public function get_detail($id, $locales): array {
    $conn = self::connection();

    return [];
  }

  public function create($data, $locales): array {
    $conn = self::connection();

    return [
      'id' => 0,
      'locales' => $locales,
    ];
  }

  public function patch($data, $locales): array {
    $conn = self::connection();

    return [
      'rows' => 0,
      'locales' => $locales,
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

  public function delete_permanent($data, $locales): array {
    $conn = self::connection();

    return [
      'rows' => 0,
    ];
  }

}
