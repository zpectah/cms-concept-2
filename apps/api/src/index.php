<?php

const PATH_ROOT = __DIR__ . '/';

require PATH_ROOT . 'libs.php';

$uri = trim($_SERVER['REQUEST_URI'], '/');
$parts = explode('/', $uri);
$environment = $parts[0] ?? null;

switch ($environment) {

  case 'public':
    require PATH_ROOT . 'public.php';
    exit;

  case 'private':
    require PATH_ROOT . 'private.php';
    exit;

  default:
    http_response_code(404);

    print_r(
      json_encode(
        [ 'message' => 'Invalid API endpoint' ],
        JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
      )
    );
    exit;

}
