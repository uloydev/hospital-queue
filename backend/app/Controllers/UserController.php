<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use CodeIgniter\API\ResponseTrait;

use function App\Helper\generateJwtToken;
use function App\Helper\getJwtClaims;

class UserController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        helper('jwt');
        $this->model = new User();
    }

    // logic untuk gel all user
    public function index()
    {
        return $this->respond(['users' => $this->model->findAll()], 200);
    }

    // logic login user
    public function login()
    {
        // ambil input dari json body
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        // ambil user dari db by email
        $user = $this->model->where('email', $email)->first();

        // cek user exists
        if(is_null($user)) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        // cek password match
        if($password != $user['password']) {
            return $this->respond(['error' => 'Invalid username or password.'], 401);
        }

        // generate token jwt
        $token = generateJwtToken($user['id'], false);

        $response = [
            'message' => 'Login Succesful',
            'user' => $user,
            'token' => $token
        ];

        // return data user dan token, dengan status code 200
        return $this->respond($response, 200);
    }

    // logic register user
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
                'password' => $this->request->getVar('password'),
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

    public function update()
    {
        $claims = getJwtClaims($this->request);
        $rules = [
            'name' => ['rules' => 'required'],
            'address' => ['rules' => 'required'],
            'phone' => ['rules' => 'required'],
        ];
        
        if($this->validate($rules)){
            $data = [
                'id' => $claims->id,
                'name' => $this->request->getVar('name'),
                'address' => $this->request->getVar('address'),
                'phone' => $this->request->getVar('phone'),
            ];
            $this->model->save($data);

            return $this->respond(['message' => 'User Updated Successfully', 'user' => $this->model->find($claims->id)], 200);
        }else{
            $response = [
                'errors' => $this->validator->getErrors(),
                'message' => 'Invalid Inputs'
            ];
            return $this->fail($response , 409);
        }
    }
}
