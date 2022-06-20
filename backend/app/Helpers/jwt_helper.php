<?php

namespace App\Helper;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function getJwtClaims($request)
{
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
    $key = getenv('JWT_SECRET');
    return JWT::decode($token, new Key($key, 'HS256'));
}

function generateJwtToken($id, $is_admin)
{
    $key = getenv('JWT_SECRET');
    $iat = time(); // current timestamp value
    $exp = $iat + 3600;

    $payload = array(
        "iat" => $iat, //Time the JWT issued at
        "exp" => $exp, // Expiration time of token
        "id" => $id,
        "is_admin" => $is_admin,
    );

    return JWT::encode($payload, $key, 'HS256');
}
