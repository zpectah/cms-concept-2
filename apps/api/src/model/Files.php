<?php

namespace model;

use PDO;
use model\Model;

class Files extends Model {

  /** Parsed data from DB to JSON response */
  private function parse_row_to_json($data): array {
    $item = [
      ...$data,
      'explicit' => $data['explicit'] === 1,
      'active' => $data['active'] === 1,
      'deleted' => $data['deleted'] === 1,
    ];

    return $item;
  }

  /** Parsed JSON data for DB */
  private function parse_json_to_db($data): array {
    $item = [
      ...$data,
      'explicit' => $data['explicit'] ? 1 : 0,
      'active' => $data['active'] ? 1 : 0,
      'deleted' => $data['deleted'] ? 1 : 0,
    ];

    return $item;
  }

  /** Creates thumbnail in case the file is type image */
  private function create_image_thumbnail(string $sourceImageData, string $destinationImagePath, int $maxDimension = 250): bool {
    $imageInfo = @getimagesizefromstring($sourceImageData);

    if ($imageInfo === false) {
      return false;
    }

    $sourceWidth = $imageInfo[0];
    $sourceHeight = $imageInfo[1];
    $mime = $imageInfo['mime'];

    if ($mime === 'image/webp' && !function_exists('imagecreatefromwebp')) {
      // Pokud je WebP a chybí podpora, vrátí chybu.
      return false;
    }

    $sourceImage = @imagecreatefromstring($sourceImageData);

    if ($sourceImage === false) {
      return false;
    }

    if ($sourceWidth <= $maxDimension && $sourceHeight <= $maxDimension) {
      $newWidth = $sourceWidth;
      $newHeight = $sourceHeight;
    } else {
      if ($sourceWidth > $sourceHeight) {
        $ratio = $maxDimension / $sourceWidth;
      } else {
        $ratio = $maxDimension / $sourceHeight;
      }
      $newWidth = (int)round($sourceWidth * $ratio);
      $newHeight = (int)round($sourceHeight * $ratio);
    }

    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    // Keep transparency for PNG, GIF and WEBP
    if ($mime === 'image/png' || $mime === 'image/gif' || $mime === 'image/webp') {
      imagealphablending($newImage, false);
      imagesavealpha($newImage, true);
      $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
      imagefill($newImage, 0, 0, $transparent);
    }

    imagecopyresampled(
      $newImage,
      $sourceImage,
      0, 0, 0, 0,
      $newWidth,
      $newHeight,
      $sourceWidth,
      $sourceHeight
    );

    switch ($mime) {
      case 'image/jpeg':
        $success = @imagejpeg($newImage, $destinationImagePath, 90);
        break;

      case 'image/png':
        $success = @imagepng($newImage, $destinationImagePath, 9);
        break;

      case 'image/gif':
        $success = @imagegif($newImage, $destinationImagePath);
        break;

      case 'image/webp':
        $success = @imagewebp($newImage, $destinationImagePath, 90);
        break;

      default:
        $success = false;
        break;
    }

    imagedestroy($sourceImage);
    imagedestroy($newImage);

    return $success;
  }

  /** Creates single DB row */
  private function create_single_file($data): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);
    $params = self::get_columns_and_values_for_query([
      'type', 'name', 'file_name', 'file_type', 'file_ext', 'file_size', 'explicit', 'active', 'deleted'
    ]);

    $columns = $params['columns'];
    $values = $params['values'];

    $sql = "INSERT INTO `files` ($columns) VALUES ($values)";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':type', $data['type']);
    $stmt -> bindParam(':name', $data['name']);
    $stmt -> bindParam(':file_name', $data['file_name']);
    $stmt -> bindParam(':file_type', $data['file_type']);
    $stmt -> bindParam(':file_ext', $data['file_ext']);
    $stmt -> bindParam(':file_size', $data['file_size'], PDO::PARAM_INT);
    $stmt -> bindParam(':explicit', $data['explicit'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> execute();

    return [
      'id' => $conn -> lastInsertId(),
    ];
  }

  /** Creates single file in uploads folder */
  private function upload_single_file($file, $rootPath, $context): array {
    $response = [
      'files' => [],
      'thumbnails' => [],
    ];

    if (
      $context === 'user' ||
      $context === 'member'
    ) {
      $filePath = $rootPath . $context . '/';
    } else {
      $filePath = $rootPath . $file['type'] . '/';
    }

    $fileName = $file['name'] . '.' . $file['extension'];
    $finalFilePath = $filePath . $fileName;

    if (!file_exists($rootPath)) mkdir($rootPath, 0777, true);
    if (!file_exists($filePath)) mkdir($filePath, 0777, true);

    $response['files'][$fileName] = file_put_contents($finalFilePath, file_get_contents($file['content']));

    if ($file['type'] === 'image') {
      $thumbRootPath = $filePath . 'thumbnail/';
      $thumbFilePath = $thumbRootPath . $fileName;

      if (!file_exists($thumbRootPath)) mkdir($thumbRootPath, 0777, true);

      $response['thumbnails'][$fileName] = (new Files) -> create_image_thumbnail(file_get_contents($file['content']), $thumbFilePath);
    }

    return $response;
  }


  public function get_list(): array {
    $conn = self::connection();

    $items = [];

    $sql = "SELECT * FROM `files`";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute();

    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $item) {
      $items[] = self::parse_row_to_json($item);
    }

    return $items;
  }

  public function get_detail($id): array {
    $conn = self::connection();

    $sql = "SELECT * FROM `files` WHERE `id` = :id LIMIT 1";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':id', $id, PDO::PARAM_INT);
    $stmt -> execute();

    $detail = $stmt -> fetch(PDO::FETCH_ASSOC);

    return self::parse_row_to_json($detail);
  }

  public function create($data): array {
    $id = [];

    foreach ($data as $item) {
      $res = self::create_single_file($item);

      $id[] = $res['id'];
    }

    return [
      'ids' => $id,
    ];
  }

  public function upload($data): array {
    $response = [];
    $options = $data['options'] ?? [];
    $queue = $data['queue'] ?? [];
    $rootPath = $options['target'];
    $pathContext = $options['context'];

    foreach ($queue as $file) {
      $response[] = self::upload_single_file($file, $rootPath, $pathContext);
    }

    return $response;
  }

  public function patch($data): array {
    $conn = self::connection();
    $data = self::parse_json_to_db($data);
    $setParts = self::query_parts($data, [
      'explicit', 'active', 'deleted'
    ]);

    $sql = "UPDATE `files` SET " . implode(', ', $setParts) . " WHERE `id` = :id";
    $stmt = $conn -> prepare($sql);
    $stmt -> bindParam(':explicit', $data['explicit'], PDO::PARAM_INT);
    $stmt -> bindParam(':active', $data['active'], PDO::PARAM_INT);
    $stmt -> bindParam(':deleted', $data['deleted'], PDO::PARAM_INT);
    $stmt -> bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt -> execute();

    $rows = $stmt -> rowCount();

    return [
      'rows' => $rows,
    ];
  }

  public function toggle($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `files` SET `active` = NOT `active` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete($data): array {
    $conn = self::connection();
    $placeholders = self::update_placeholders($data);

    $sql = "UPDATE `files` SET `deleted` = NOT `deleted` WHERE `id` IN ({$placeholders})";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute($data);

    return [
      'rows' => $stmt -> rowCount(),
    ];
  }

  public function delete_permanent($data, $uploadsPath): array {
    $conn = self::connection();
    $placeholders = self::delete_placeholders($data);

    $selectSql = "SELECT `type`, `name`, `file_name` FROM `files` WHERE id IN ($placeholders)";
    $selectStmt = $conn -> prepare($selectSql);
    $selectStmt -> execute($data);

    $filesToDelete = $selectStmt -> fetchAll(PDO::FETCH_ASSOC);

    $deletedFilesCount = 0;
    $errors = [];

    foreach ($filesToDelete as $file) {
      $filePath = rtrim($uploadsPath, '/') . '/' . $file['type'] . '/' . $file['file_name'];

      if (file_exists($filePath)) {
        if (unlink($filePath)) {
          $deletedFilesCount++;

          if ($file['type'] === 'image') {
            $thumbnailPath = rtrim($uploadsPath, '/') . '/' . $file['type'] . '/thumbnail/' . $file['file_name'];

            if (file_exists($thumbnailPath)) {
              if (unlink($thumbnailPath)) $deletedFilesCount++;
            }
          }
        } else {
          $errors[] = 'Error during deleting file: ' . $filePath;
        }
      } else {
        $errors[] = 'File not found: ' . $filePath;
      }
    }

    $deleteSql = "DELETE FROM `files` WHERE id IN ($placeholders)";
    $deleteStmt = $conn -> prepare($deleteSql);
    $deleteStmt -> execute($data);

    return [
      'rows' => $deleteStmt -> rowCount(),
      'files' => $deletedFilesCount,
      'errors' => $errors,
    ];
  }

}
