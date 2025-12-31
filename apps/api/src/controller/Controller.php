<?php

namespace controller;

class Controller {

  /** URL parser for ID only */
  protected function url_id($url): string | null {
    return ($url['a1'] === 'id' && is_numeric($url['a2'])) ? $url['a2'] : null;
  }

  /** URL parser for email only */
  protected function url_email($url): string | null {
    return ($url['a1'] === 'email' && filter_var($url['a2'], FILTER_VALIDATE_EMAIL)) ? $url['a2'] : null;
  }

  /** URL parser for token only */
  protected function url_token($url): string | null {
    return $url['a1'] === 'token' ? $url['a2'] : null;
  }

  /** URL parser for comments only */
  protected function url_comments($url): array {
    $type = $url['a1'] ?? null;
    $id = ($url['a2'] && is_numeric($url['a2'])) ?? null;

    return [
      'type' => $type,
      'id' => $id,
    ];
  }

}
