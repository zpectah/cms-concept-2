<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$requested_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requested_path = rawurldecode($requested_path);
$base_dir = realpath(__DIR__ . '/../../dist/uploads');
$path_to_check = $base_dir . $requested_path;

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
  $path_to_check = iconv("UTF-8", "CP1250//IGNORE", $path_to_check);
}

$full_path = realpath($path_to_check);

if ($full_path && strpos($full_path, $base_dir) === 0 && is_file($full_path)) {
  $finfo = finfo_open(FILEINFO_MIME_TYPE);
  $mime_type = finfo_file($finfo, $full_path);
  finfo_close($finfo);

  if (ob_get_level()) ob_end_clean();

  header("Content-Type: {$mime_type}");
  header("Content-Length: " . filesize($full_path));

  readfile($full_path);
  exit();
}

http_response_code(404);
echo "File not found";
