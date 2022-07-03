<?php

namespace App\Helper;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// logic untuk ambil jwt token dari header Authorization
function getJwtClaims($request)
{
    // ambil jwt token dari header Authorization
    $header = $request->header("Authorization");
    $token = null;

    // extract the token from the header
    if (!empty($header)) {
        if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
            $token = $matches[1];
        }
    }

    // check if token is null or empty
    if (is_null($token) || empty($token)) {
        throw new Exception("invalid token");
    }

    // ambil secret key dari .env
    $key = getenv('JWT_SECRET');

    // return hasil decode jwt token
    return JWT::decode($token, new Key($key, 'HS256'));
}

// logic untuk generate jwt token
function generateJwtToken($id, $is_admin)
{
    // ambil secret key dari .env
    $key = getenv('JWT_SECRET');
    // ambil timestamp saat ini
    $iat = time(); // current timestamp value
    // set expired token 3600 seconds
    $exp = $iat + 3600;

    $payload = array(
        "iat" => $iat, //Time the JWT issued at
        "exp" => $exp, // Expiration time of token
        "id" => $id,
        "is_admin" => $is_admin,
    );

    // encode payload to jwt token
    return JWT::encode($payload, $key, 'HS256');
}
