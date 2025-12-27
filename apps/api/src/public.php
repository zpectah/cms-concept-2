<?php
# public API bootstrap

use router\PublicRouter;

require PATH_ROOT . 'libs.public.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (isset($_SERVER['HTTP_CONTENT_ENCODING']) && $_SERVER['HTTP_CONTENT_ENCODING'] === 'gzip') {
  header('Content-Encoding: gzip');
}

$router = new PublicRouter();

print_r(
  json_encode(
    $router -> dispatch(),
    JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
  )
);
