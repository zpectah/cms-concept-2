<?php

namespace model;

use PDO;
use model\Model;

class Menu extends Model {

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

    $sql = "SELECT * FROM `menu`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id): array {
    $conn = self::connection();

    $sql = "SELECT * FROM `menu` WHERE `id` = :id LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::parse_row_to_json($detail);
  }

  public function create($data): array {
    $conn = self::connection();

    $data = self::parse_json_to_db($data);
    $params = self::get_columns_and_values_for_query(['uid', 'type', 'name', 'active', 'deleted']);
    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `menu` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':uid', $data['uid']);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
    ];
  }

  public function patch($data): array {
    $conn = self::connection();

    $data = self::parse_json_to_db($data);
    $setParts = self::query_parts($data, ['uid', 'type', 'name', 'active', 'deleted']);

    $sql = "UPDATE `menu` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':uid', $data['uid']);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `menu` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `menu` SET `deleted` = NOT `deleted` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `menu` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
