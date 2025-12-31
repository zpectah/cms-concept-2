<?php

function encrypt_string($plain_password, $key): string {
  $cipher = 'AES-256-CBC';
  $ivlen = openssl_cipher_iv_length($cipher);
  $iv = openssl_random_pseudo_bytes($ivlen);
  $encrypted = openssl_encrypt($plain_password, $cipher, $key, 0, $iv);

  return base64_encode($iv . $encrypted);
}

function decrypt_string($encrypted_data, $key): bool|string {
  $cipher = 'AES-256-CBC';
  $ivlen = openssl_cipher_iv_length($cipher);
  $c = base64_decode($encrypted_data);
  $iv = substr($c, 0, $ivlen);
  $encrypted = substr($c, $ivlen);

  return openssl_decrypt($encrypted, $cipher, $key, 0, $iv);
}

function secure_password($password): string {
  $trimmedPassword = trim($password);

  return password_hash($trimmedPassword, PASSWORD_ARGON2ID);
}

function match_password($password, $hash): bool {
  // TODO
  // $trimmedPassword = trim($password);
  // $trimmedHash = trim($hash);

  return password_verify($password, $hash);
}
