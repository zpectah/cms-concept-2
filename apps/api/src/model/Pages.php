<?php

namespace model;

use PDO;
use model\Model;

class Pages extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data, $localeData = false): array {
    $item = [
      ...$data,

      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if ($localeData) {
      $item['locale'] = $localeData;
    }

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
      'content' => $row['content'] ?? '',
    ];
  }


  public function get_list(): array {
    $conn = self::connection();

    $sql = "SELECT id, name, type, meta_robots, category_id, active, deleted, created, updated FROM `pages`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $items = [];

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id, $locales): array {
    $conn = self::connection();

    $sql = "SELECT * FROM `pages` WHERE `id` = :id LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    $localeData = [];

    foreach ($locales as $locale) {
      $tableName = 'pages_' . $locale;

      $localeSql = "SELECT title, description, content FROM `{$tableName}` WHERE `id` = :id LIMIT 1";
      $localeStmt = $conn -> prepare($localeSql);
      $localeStmt -> bindParam(':id', $id, PDO::PARAM_INT);
      $localeStmt -> execute();

      $localeRow = $localeStmt -> fetch(PDO::FETCH_ASSOC);

      $localeData[$locale] = self::parse_locale_row($localeRow);
    }

    return self::parse_row_to_json($detail, $localeData);
  }

  public function create($data, $locales): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);
    $params = self::get_columns_and_values_for_query(['type', 'name', 'meta_robots', 'category_id', 'active', 'deleted']);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `pages` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':meta_robots', $data['meta_robots']);
    $stmt -> bindParam(':category_id', $data['category_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    $insertId = $conn -> lastInsertId();

    if (isset($data['locale']) && is_array($data['locale'])) {
      $localeParams = self::get_columns_and_values_for_query(['title', 'description', 'content', 'id']);
      $localeColumns = $localeParams['columns'];
      $localeValues = $localeParams['values'];

      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $localeData = self::parse_locale_row($data['locale'][$locale]);
          $tableName = 'pages_' . $locale;

          $localeSql = "INSERT INTO `{$tableName}` ({$localeColumns}) VALUES ({$localeValues})";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':title', $localeData['title']);
          $localeStmt -> bindParam(':description', $localeData['description']);
          $localeStmt -> bindParam(':content', $localeData['content']);
          $localeStmt -> bindParam(':id', $insertId, PDO::PARAM_INT);
          $localeStmt -> execute();
        }
      }
    }

    return [
      'id' => $insertId,
      'locales' => $locales,
    ];
  }

  public function patch($data, $locales): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);
    $setParts = self::query_parts($data, ['type', 'name', 'meta_robots', 'category_id', 'active', 'deleted']);

    $sql = "UPDATE `pages` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':meta_robots', $data['meta_robots']);
    $stmt -> bindParam(':category_id', $data['category_id'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    $rows = $stmt -> rowCount();

    $id = $data['id'];

    if (isset($data['locale']) && is_array($data['locale'])) {
      foreach ($locales as $locale) {
        if (isset($data['locale'][$locale])) {
          $localeData = self::parse_locale_row($data['locale'][$locale]);
          $localeSetParts = self::query_parts($localeData, ['title', 'description', 'content']);
          $tableName = 'pages_' . $locale;

          $localeSql = "UPDATE `{$tableName}` SET " . implode(', ', $localeSetParts) . " WHERE `id` = :id";
          $localeStmt = $conn -> prepare($localeSql);
          $localeStmt -> bindParam(':title', $localeData['title']);
          $localeStmt -> bindParam(':description', $localeData['description']);
          $localeStmt -> bindParam(':content', $localeData['content']);
          $localeStmt -> bindParam(':id', $id, PDO::PARAM_INT);
          $localeStmt -> execute();

          $rows = $rows + $localeStmt -> rowCount();
        }
      }
    }

    return [
      'rows' => $rows,
      'locales' => $locales,
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `pages` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `pages` SET `deleted` = NOT `deleted` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data, $locales): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `pages` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    $rows = $stmt -> rowCount();

    foreach ($locales as $locale) {
      $tableName = 'pages_' . $locale;

      $localeSql = "DELETE FROM `{$tableName}` WHERE id IN ($placeholders)";
      $localeStmt = $conn -> prepare($localeSql);
      $localeStmt -> execute($data);

      $rows =  $rows + $localeStmt -> rowCount();
    }

    return [
      'rows' => $rows,
    ];
  }

}
