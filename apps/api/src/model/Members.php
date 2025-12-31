<?php

namespace model;

use PDO;
use model\Model;

class Members extends Model {

  static array $tableFields = ['type', 'name', 'email', 'first_name', 'last_name',
    'address_street', 'address_street_no', 'address_district', 'address_city', 'address_country', 'address_zip',
    'flat_no', 'description', 'active', 'deleted'];

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data): array {
    $item = [
      ...$data,

      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if (isset($data['address_street']) && isset($data['address_street_no'])) {
      $item['address'] = [
        'street' => $data['address_street'],
        'street_no' => $data['address_street_no'],
        'district' => $data['address_district'],
        'city' => $data['address_city'],
        'country' => $data['address_country'],
        'zip' => $data['address_zip'],
      ];

      unset($item['address_street']);
      unset($item['address_street_no']);
      unset($item['address_district']);
      unset($item['address_city']);
      unset($item['address_country']);
      unset($item['address_zip']);
    }


    return $item;
  }

  /** Parsed JSON data for DB */
  private function parse_json_to_db($data): array {
    $item = [
      ...$data,
      'address_street' => isset($data['address']['street']) ? $data['address']['street'] : '',
      'address_street_no' => isset($data['address']['street_no']) ? $data['address']['street_no'] : '',
      'address_district' => isset($data['address']['district']) ? $data['address']['district'] : '',
      'address_city' => isset($data['address']['city']) ? $data['address']['city'] : '',
      'address_country' => isset($data['address']['country']) ? $data['address']['country'] : '',
      'address_zip' => isset($data['address']['zip']) ? $data['address']['zip'] : '',
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];

    return $item;
  }


  public function get_list(): array {
    $conn = self::connection();

    $sql = "SELECT id, type, name, email, first_name, last_name, active, deleted, created, updated FROM `members`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id, $email): array {
    $conn = self::connection();

    if ($id) {
      $sql = "SELECT id, type, name, email, first_name, last_name, address_street, address_street_no, address_district, address_city, address_country, address_zip, flat_no, description, active, deleted, created, updated FROM `members` WHERE `id` = :id LIMIT 1";
    } else if ($email) {
      $sql = "SELECT id, type, name, email, first_name, last_name, address_street, address_street_no, address_district, address_city, address_country, address_zip, flat_no, description, active, deleted, created, updated FROM `members` WHERE `email` = :email LIMIT 1";
    }
    $stmt = $conn -> prepare($sql);
    if ($id) {
      $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    } else if ($email) {
      $stmt -> bindParam(':email', $email);
    }
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::parse_row_to_json($detail);
  }

  public function create($data): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);

    if (isset($data['password'])) $password = password_hash($data['password'], PASSWORD_ARGON2ID);

    if (isset($data['password'])) {
      $fields = [ ...self::$tableFields, 'password' ];
    } else {
      $fields = self::$tableFields;
    }

    $params = self::get_columns_and_values_for_query($fields);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `members` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    if (isset($data['password'])) $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':address_street', $data['address_street']);
    $stmt -> bindParam(':address_street_no', $data['address_street_no']);
    $stmt -> bindParam(':address_district', $data['address_district']);
    $stmt -> bindParam(':address_city', $data['address_city']);
    $stmt -> bindParam(':address_country', $data['address_country']);
    $stmt -> bindParam(':address_zip', $data['address_zip']);
    $stmt -> bindParam(':flat_no', $data['flat_no']);
    $stmt -> bindParam(':description', $data['description']);
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

    if (isset($data['password'])) $password = password_hash($data['password'], PASSWORD_ARGON2ID);
    if (isset($data['password'])) {
      $fields = [ ...self::$tableFields, 'password' ];
    } else {
      $fields = self::$tableFields;
    }

    $setParts = self::query_parts($data, $fields);

    $sql = "UPDATE `members` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    if (isset($data['password'])) $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':address_street', $data['address_street']);
    $stmt -> bindParam(':address_street_no', $data['address_street_no']);
    $stmt -> bindParam(':address_district', $data['address_district']);
    $stmt -> bindParam(':address_city', $data['address_city']);
    $stmt -> bindParam(':address_country', $data['address_country']);
    $stmt -> bindParam(':address_zip', $data['address_zip']);
    $stmt -> bindParam(':flat_no', $data['flat_no']);
    $stmt -> bindParam(':description', $data['description']);
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

    $sql = "UPDATE `members` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `members` SET `deleted` = 1 WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `members` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
