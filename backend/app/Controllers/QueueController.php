<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\Queue;

use function App\Helper\getJwtClaims;

class QueueController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        helper('jwt');
        $this->model = new Queue();
    }

    public function index()
    {
        return $this->respond(['queues' => $this->model->findAll()], 200);
    }

    public function show($queue_id)
    {
        return $this->respond(['queues' => $this->model->find($queue_id)], 200);
    }

    public function store()
    {
        $data = [
            "name" => $this->request->getVar('name'),
            "phone" => $this->request->getVar('phone'),
            "address" => $this->request->getVar('address'),
            "complaint" => $this->request->getVar('complaint'),
            "poli_id" => $this->request->getVar('poli_id'),
            "number" => count($this->model->where('poli_id', $this->request->getVar('poli_id'))->findAll()) + 1,
        ];
        $claims = getJwtClaims($this->request);
        $data["user_id"] = $claims->id;

        $queue_id = $this->model->insert($data);

        return $this->respond(['queue' => $this->model->find($queue_id)], 200);
    }

    public function userQueue()
    {
        $claims = getJwtClaims($this->request);
        return $this->respond([
            'queue' => $this->model
                ->where('user_id', $claims->id)
                ->where('status !=', 'Selesai')
                ->first()
        ], 200);
    }
}
