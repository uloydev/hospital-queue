<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\Queue;
use DateTime;

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

        $queue = $this->model
        ->where('user_id', $claims->id)
        ->where('status !=', 'Selesai')
        ->first();

        if (is_null($queue)) {
            return $this->respond([
                'message' => 'tidak ada antrian untuk anda',
            ], 404);
        }
        
        $currentQueue = $this->model->where('poli_id', $queue['poli_id'])
        ->where('status !=', 'selesai')
        ->first();

        $queueDiff = $queue['number'] - $currentQueue['number'];
        
        return $this->respond([
            'queue' => $queue,
            'show_arrive_notification' => $queueDiff <= 3 and $queueDiff > 0,
            'show_check_notification' => !is_null($queue['started_at']),
        ], 200);
    }

    public function confirmArrival($queue_id)
    {
        return $this->respond(['success' => $this->model->update($queue_id, ["status" => "Tiba"])], 200);
    }

    public function confirmCheck($queue_id)
    {
        return $this->respond(['success' => $this->model->update($queue_id, ["status" => "Pemeriksaan"])], 200);
    }

    public function reset()
    {
        return $this->respond(['success' => $this->model->where("deleted_at is null")->delete()], 200);
    }

}
