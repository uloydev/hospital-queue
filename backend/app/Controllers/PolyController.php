<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Poly;
use App\Models\Queue;
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

    public function counter()
    {
        $queueModel = new Queue();
        $polies = $this->model->findAll();

        foreach ($polies as $key => $poly) {
            $queue = $queueModel->where('poli_id', $poly['id'])
                ->where('status !=', 'selesai')
                ->first();

            $polies[$key]['current_number'] = $queue['number'] ?? 0;
        }

        return $this->respond(['polies' => $polies], 200);
    }

    public function changeStatus($poli_id)
    {

        return $this->respond(['success' => $this->model->update($poli_id, ["is_open" => $this->request->getVar('is_open')])], 200);
    }

}
