<?php

namespace model;

use model\Model;

class Articles extends Model {

  public function getList(): array {
    return [
      [
        'id' => 1,
        'type' => 'default',
        'name' => 'article name 1',
        'created' => '2025-11-09 09:28:18',
        'updated' => '2025-11-24 09:13:37',
        'author' => 1,
        'editor' => [1],
        'approved' => false,
        'active' => true,
        'deleted' => false,
      ],
      [
        'id' => 2,
        'type' => 'default',
        'name' => 'article name 2',
        'created' => '2025-11-09 09:28:18',
        'updated' => '2025-11-24 09:13:37',
        'author' => 1,
        'editor' => [1],
        'approved' => false,
        'active' => true,
        'deleted' => false,
      ],
    ];
  }

  public function getDetail($id): array {
    return [
      'id' => $id,
      'type' => 'default',
      'name' => 'article name 1',
      'created' => '2025-11-09 09:28:18',
      'updated' => '2025-11-24 09:13:37',
      'author' => 1,
      'editor' => [1],
      'approved' => false,
      'active' => true,
      'deleted' => false,
      'locale' => [
        'en' => [
          'title' => 'Article EN title' . $id,
          'description' => '...',
          'content' => 'Article EN content'
        ],
        'cs' => [
          'title' => 'Article CS title' . $id,
          'description' => '...',
          'content' => 'Article CS content'
        ],
      ],
    ];
  }

  public function create($data): array {

    return [
      'id' => 1,
      'locales' => [],
    ];
  }

  public function patch($data): array {

    return [
      'rows' => 0,
      'locales' => [],
    ];
  }

  public function toggle($data): array {

    return [
      'rows' => 0,
    ];
  }

  public function approve($data): array {

    return [
      'rows' => 0,
    ];
  }

  public function delete($data): array {

    return [
      'rows' => 0,
    ];
  }

  public function deletePermanent($data): array {

    return [
      'rows' => 0,
    ];
  }

}
