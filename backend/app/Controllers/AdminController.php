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

    public function login()
    {
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $admin = $this->model->where('email', $email)->first();

        if(is_null($admin)) {
            return $this->respond(['error' => 'Invalid adminname or password.'], 401);
        }

        if($password != $admin['password']) {
            return $this->respond(['error' => 'Invalid adminname or password.'], 401);
        }

        $token = generateJwtToken($admin['id'], true);

        $response = [
            'message' => 'Login Succesful',
            'admin' => $admin,
            'token' => $token
        ];

        return $this->respond($response, 200);
    }
}


