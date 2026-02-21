<?php

namespace model;

use PDO;
use model\Model;

class Articles extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data, $localeData = false): array {
    $item = [
      ...$data,
      'categories' => $data['categories'] ? explode(',', $data['categories']) : [],
      'tags' => $data['tags'] ? explode(',', $data['tags']) : [],
      'attachments' => $data['attachments'] ? explode(',', $data['attachments']) : [],
      'author' => $data['author'] ?? 0,
      'editor' => $data['editor'] ? explode(',', $data['editor']) : [],
      'explicit' => $data['explicit'] === 1,
      'approved' => $data['approved'] === 1,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    if (isset($data['event_address_street'])) {
      $item['event_address'] = [
        'street' => $data['event_address_street'] ?? '',
        'street_no' => $data['event_address_street_no'] ?? '',
        'district' => $data['event_address_district'] ?? '',
        'city' => $data['event_address_city'] ?? '',
        'country' => $data['event_address_country'] ?? '',
        'zip' => $data['event_address_zip'] ?? '',
      ];
      $item['event_location'] = $data['event_location'] ? explode(',', $data['event_location']) : [0,0];
      $item['event_start'] = $data['event_start'] ?? '';
      $item['event_end'] = $data['event_end'] ?? '';

      unset($item['event_address_street']);
      unset($item['event_address_street_no']);
      unset($item['event_address_district']);
      unset($item['event_address_city']);
      unset($item['event_address_country']);
      unset($item['event_address_zip']);
    }

    if ($localeData) {
      $item['locale'] = $localeData;
    }

    return $item;
  }

  /** Parsed JSON data for DB */
  private function parse_json_to_db($data): array {
    $item = [
      ...$data,
      'categories' => implode(',', $data['categories']),
      'tags' => implode(',', $data['tags']),
      'attachments' => implode(',', $data['attachments']),
      'author' => $data['author'] ?? 0,
      'editor' => implode(',', $data['editor']),
      'explicit' => $data['explicit'] ? 1 : 0,
      'approved' => $data['approved'] ? 1 : 0,
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
      'event_address_street' => $data['event_address']['street'] ?? '',
      'event_address_street_no' => $data['event_address']['street_no'] ?? '',
      'event_address_district' => $data['event_address']['district'] ?? '',
      'event_address_city' => $data['event_address']['city'] ?? '',
      'event_address_country' => $data['event_address']['country'] ?? '',
      'event_address_zip' => $data['event_address']['zip'] ?? '',
      'event_location' => implode(',', $data['event_location']),
      'event_start' => $data['event_start'] ?? '',
      'event_end' => $data['event_end'] ?? '',
    ];

    unset($item['event_address']);

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

    $items = [];

    $sql = "SELECT id, name, type, categories, tags, attachments, author, editor, approved, explicit, active, deleted, created, updated FROM `articles`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id, $locales): array {
    $conn = self::connection();

    $localeData = [];

    $sql = "SELECT * FROM `articles` WHERE `id` = :id LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    foreach ($locales as $locale) {
      $tableName = 'articles_' . $locale;

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
    $params = self::get_columns_and_values_for_query([
      'type', 'name', 'categories', 'tags', 'attachments',
      'event_address_street', 'event_address_street_no', 'event_address_district', 'event_address_city', 'event_address_country', 'event_address_zip', 'event_location', 'event_start', 'event_end',
      'image_thumb_id',
      'author', 'editor', 'explicit', 'approved', 'active', 'deleted'
    ]);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `articles` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':categories', $data['categories']);
    $stmt -> bindParam(':tags', $data['tags']);
    $stmt -> bindParam(':attachments', $data['attachments']);
    $stmt -> bindParam(':event_address_street', $data['event_address_street']);
    $stmt -> bindParam(':event_address_street_no', $data['event_address_street_no']);
    $stmt -> bindParam(':event_address_district', $data['event_address_district']);
    $stmt -> bindParam(':event_address_city', $data['event_address_city']);
    $stmt -> bindParam(':event_address_country', $data['event_address_country']);
    $stmt -> bindParam(':event_address_zip', $data['event_address_zip']);
    $stmt -> bindParam(':event_location', $data['event_location']);
    $stmt -> bindParam(':event_start', $data['event_start']);
    $stmt -> bindParam(':event_end', $data['event_end']);
    $stmt -> bindParam(':image_thumb_id', $data['image_thumb_id']);
    $stmt -> bindParam(':author', $data['author'], PDO::PARAM_INT);
    $stmt -> bindParam(':editor', $data['editor']);
    $stmt -> bindParam(':explicit', $data['explicit'], PDO::PARAM_INT);
    $stmt -> bindParam(':approved', $data['approved'], PDO::PARAM_INT);
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
          $tableName = 'articles_' . $locale;

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
    $setParts = self::query_parts($data, [
      'type', 'name', 'categories', 'tags', 'attachments',
      'event_address_street', 'event_address_street_no', 'event_address_district', 'event_address_city', 'event_address_country', 'event_address_zip', 'event_location', 'event_start', 'event_end',
      'image_thumb_id',
      'author', 'editor', 'explicit', 'approved', 'active', 'deleted'
    ]);

    $sql = "UPDATE `articles` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':categories', $data['categories']);
    $stmt -> bindParam(':tags', $data['tags']);
    $stmt -> bindParam(':attachments', $data['attachments']);
    $stmt -> bindParam(':event_address_street', $data['event_address_street']);
    $stmt -> bindParam(':event_address_street_no', $data['event_address_street_no']);
    $stmt -> bindParam(':event_address_district', $data['event_address_district']);
    $stmt -> bindParam(':event_address_city', $data['event_address_city']);
    $stmt -> bindParam(':event_address_country', $data['event_address_country']);
    $stmt -> bindParam(':event_address_zip', $data['event_address_zip']);
    $stmt -> bindParam(':event_location', $data['event_location']);
    $stmt -> bindParam(':event_start', $data['event_start']);
    $stmt -> bindParam(':event_end', $data['event_end']);
    $stmt -> bindParam(':image_thumb_id', $data['image_thumb_id']);
    $stmt -> bindParam(':author', $data['author'], PDO::PARAM_INT);
    $stmt -> bindParam(':editor', $data['editor']);
    $stmt -> bindParam(':explicit', $data['explicit'], PDO::PARAM_INT);
    $stmt -> bindParam(':approved', $data['approved'], PDO::PARAM_INT);
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
          $localeSetParts = self::query_parts($localeData, [ 'title', 'description', 'content', 'id' ]);
          $tableName = 'articles_' . $locale;

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

    $sql = "UPDATE `articles` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function approve($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `articles` SET `approved` = NOT `approved` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `articles` SET `deleted` = NOT `deleted` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data, $locales): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $sql = "DELETE FROM `articles` WHERE id IN ($placeholders)";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    $rows = $stmt -> rowCount();

    foreach ($locales as $locale) {
      $tableName = 'articles_' . $locale;

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
