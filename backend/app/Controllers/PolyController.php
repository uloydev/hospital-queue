<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Poly;
use CodeIgniter\API\ResponseTrait;

class PolyController extends BaseController
{
    use ResponseTrait;
    
    public function __construct()
    {
        $this->model = new Poly();
    }

    public function index()
    {
        return $this->respond(['poly' => $this->model->findAll()], 200);
    }

}
