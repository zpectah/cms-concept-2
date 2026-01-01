<?php

namespace model;

use PDO;
use model\Model;

class Users extends Model {

  static array $tableFields = ['type', 'email', 'first_name', 'last_name', 'access_rights', 'avatar_image', 'avatar_hash', 'active', 'deleted'];

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

    $sql = "SELECT id, type, email, first_name, last_name, access_rights, avatar_image, avatar_hash, active, deleted, created, updated FROM `users`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id, $email, $withPassword = false): array {
    $conn = self::connection();

    if ($id) {
      if ($withPassword) {
        $sql = "SELECT id, type, password, email, first_name, last_name, access_rights, avatar_image, avatar_hash, active, deleted, created, updated FROM `users` WHERE `id` = :id LIMIT 1";
      } else {
        $sql = "SELECT id, type, email, first_name, last_name, access_rights, avatar_image, avatar_hash, active, deleted, created, updated FROM `users` WHERE `id` = :id LIMIT 1";
      }
    } else if ($email) {
      if ($withPassword) {
        $sql = "SELECT id, type, password, email, first_name, last_name, access_rights, avatar_image, avatar_hash, active, deleted, created, updated FROM `users` WHERE `email` = :email LIMIT 1";
      } else {
        $sql = "SELECT id, type, email, first_name, last_name, access_rights, avatar_image, avatar_hash, active, deleted, created, updated FROM `users` WHERE `email` = :email LIMIT 1";
      }
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
    $params = self::get_columns_and_values_for_query([ ...self::$tableFields, 'password' ]);

    $password = secure_password($data['password']);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `users` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':access_rights', $data['access_rights']);
    $stmt -> bindParam(':avatar_image', $data['avatar_image']);
    $stmt -> bindParam(':avatar_hash', $data['avatar_hash']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
    ];
  }

  public function patch($data): array {
    $conn = self::connection();

    $isPassword = isset($data['password']) && $data['password'] !== '';

    if ($isPassword) {
      $fields = [ ...self::$tableFields, 'password' ];
      $password = secure_password($data['password']);
    } else {
      $fields = self::$tableFields;
    }

    $data = self::parse_json_to_db($data);
    $setParts = self::query_parts($data, $fields);

    $sql = "UPDATE `users` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    if ($isPassword) $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':email', $data['email']);
    $stmt -> bindParam(':first_name', $data['first_name']);
    $stmt -> bindParam(':last_name', $data['last_name']);
    $stmt -> bindParam(':access_rights', $data['access_rights']);
    $stmt -> bindParam(':avatar_image', $data['avatar_image']);
    $stmt -> bindParam(':avatar_hash', $data['avatar_hash']);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function patch_password($data): array {
    $conn = self::connection();

    $email = $data['email'];
    $password = secure_password($data['password']);

    $sql = "UPDATE `users` SET `password` = :password WHERE `email` = :email";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':password', $password);
    $stmt -> bindParam(':email', $email);
    $stmt -> execute();

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `users` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `users` SET `deleted` = NOT `deleted` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `users` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

}
