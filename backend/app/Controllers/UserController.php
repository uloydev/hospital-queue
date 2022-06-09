<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use CodeIgniter\API\ResponseTrait;
use Firebase\JWT\JWT;

class UserController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        $this->model = new User();
    }

    public function index()
    {
        return $this->respond(['users' => $this->model->findAll()], 200);
    }

    public function login()
    {
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $user = $this->model->where('email', $email)->first();

        if(is_null($user)) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        $pwd_verify = password_verify($password, $user['password']);

        if(!$pwd_verify) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        $key = getenv('JWT_SECRET');
        $iat = time(); // current timestamp value
        $exp = $iat + 3600;

        $payload = array(
            "iat" => $iat, //Time the JWT issued at
            "exp" => $exp, // Expiration time of token
            "id" => $user['id'],
            "is_admin" => false,
        );

        $token = JWT::encode($payload, $key, 'HS256');

        $response = [
            'message' => 'Login Succesful',
            'user' => $user,
            'token' => $token
        ];

        return $this->respond($response, 200);
    }

    public function register()
    {
        $rules = [
            'email' => ['rules' => 'required|valid_email|is_unique[users.email]'],
            'password' => ['rules' => 'required|min_length[8]'],
            'name' => ['rules' => 'required'],
            'address' => ['rules' => 'required'],
            'phone' => ['rules' => 'required'],
            'confirm_password'  => [ 'label' => 'confirm password', 'rules' => 'matches[password]']
        ];
            

        if($this->validate($rules)){
            $data = [
                'email'    => $this->request->getVar('email'),
                'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
                'name' => $this->request->getVar('name'),
                'address' => $this->request->getVar('address'),
                'phone' => $this->request->getVar('phone'),
            ];
            $this->model->save($data);

            return $this->respond(['message' => 'Registered Successfully'], 200);
        }else{
            $response = [
                'errors' => $this->validator->getErrors(),
                'message' => 'Invalid Inputs'
            ];
            return $this->fail($response , 409);
        }
    }
}