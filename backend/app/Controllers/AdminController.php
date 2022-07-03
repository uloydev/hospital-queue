<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Admin;
use CodeIgniter\API\ResponseTrait;

use function App\Helper\generateJwtToken;

class AdminController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        helper('jwt');
        $this->model = new Admin();
    }

    // admin login logic
    public function login()
    {
        // ambil data dari json body
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        // ambil admin dari db sesuai input email
        $admin = $this->model->where('email', $email)->first();

        // cek admin exsist
        if(is_null($admin)) {
            return $this->respond(['error' => 'Invalid adminname or password.'], 401);
        }

        // cek password
        if($password != $admin['password']) {
            return $this->respond(['error' => 'Invalid adminname or password.'], 401);
        }

        // generate token jwt
        $token = generateJwtToken($admin['id'], true);

        $response = [
            'message' => 'Login Succesful',
            'admin' => $admin,
            'token' => $token
        ];

        // response dengan status code 200
        return $this->respond($response, 200);
    }
}


