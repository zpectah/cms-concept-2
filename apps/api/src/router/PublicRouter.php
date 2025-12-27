<?php

namespace router;

use router\Router;
use public\ArticlesController;

class PublicRouter extends Router {

  public function dispatch(): array {
    $url = self::getParsedUrl();
    $data = self::getParsedData();

    $model = $url['model'];

    switch ($model) {

      case 'articles':
        $articles = new ArticlesController;
        return $articles -> resolve($url, $data);

      // TODO

      default:
        http_response_code(404);
        return [
          'message' => 'Response from PRIVATE api service',
          'url' => $url,
          'data' => $data,
        ];

    }
  }

}
