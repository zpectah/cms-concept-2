<?php

namespace model;

use PDO;
use model\Model;

class Requests extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data): array {
    $item = [...$data];

    return $item;
  }

  /** Parsed JSON data for DB */
  private function parse_json_to_db($data): array {
    $item = [...$data];

    return $item;
  }


  public function get_list(): array {
    $conn = self::connection();

    $stmt = $conn -> prepare("SELECT * FROM `requests`");
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id, $token): array {
    $conn = self::connection();

    $status = 1;

    if ($id) {
      $sql = "SELECT * FROM `requests` WHERE `id` = :id AND `status` = :status LIMIT 1";
    } else if ($token) {
      $sql = "SELECT * FROM `requests` WHERE `token` = :token AND `status` = :status LIMIT 1";
    }
    $stmt = $conn -> prepare($sql);
    if ($id) {
      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    } else if ($token) {
      $stmt -> bindParam(':token', $token);
    }
    $stmt -> bindParam(':status', $status, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::parse_row_to_json($detail);
  }

  public function create($data): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);
    $params = self::get_columns_and_values_for_query(['type', 'token', 'applicant', 'status']);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `requests` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':token', $data['token']);
    $stmt -> bindParam(':applicant', $data['applicant']);
    $stmt -> bindParam(':status', $data['status'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
    ];
  }

  public function patch($data): array {
    $conn = self::connection();

    $data = self::parse_json_to_db($data);
    $setParts = self::query_parts($data, ['type', 'token', 'applicant', 'status']);

    $sql = "UPDATE `requests` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':token', $data['token']);
    $stmt -> bindParam(':applicant', $data['applicant']);
    $stmt -> bindParam(':status', $data['status'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `requests` SET `status` = 2 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `requests` SET `status` = 0 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `requests` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
