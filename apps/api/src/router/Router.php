<?php

namespace router;

class Router {

  protected function getParsedUrl(): array {
    $url = $_SERVER['REQUEST_URI'] ?? '';
    $url_parsed = parse_url($url);
    $url_path = $url_parsed['path'] ?? '';
    $url_attributes = array_values(array_filter(explode('/', $url_path)));
    $url_query = [];
    $method = $_SERVER['REQUEST_METHOD'];

    if (!empty($url_parsed['query'])) {
      parse_str($url_parsed['query'], $url_query);
    }

    return [
      'method' => $method,
      'url' => $url,
      'query' => $url_query,
      /* Attribute for root */
      'model' => $url_attributes[1] ?? null,
      /* Rest of url attributes */
      'a1' => $url_attributes[2] ?? null,
      'a2' => $url_attributes[3] ?? null,
      'a3' => $url_attributes[4] ?? null,
      'a4' => $url_attributes[5] ?? null,
      'a5' => $url_attributes[6] ?? null,
      'a6' => $url_attributes[7] ?? null,
      'a7' => $url_attributes[8] ?? null,
      'a8' => $url_attributes[9] ?? null,
      'a9' => $url_attributes[10] ?? null,
      'a10' => $url_attributes[11] ?? null,
    ];
  }

  protected function getParsedData () {
    $rawJsonData = file_get_contents("php://input");

    return json_decode($rawJsonData, true);
  }

}
