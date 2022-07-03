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

    // logic buat nampilin semua poli
    public function index()
    {
        return $this->respond(['poly' => $this->model->findAll()], 200);
    }

    // logic buat nampilin antrian dari semua poli
    public function counter()
    {
        $queueModel = new Queue();

        // ambil semua data poli
        $polies = $this->model->findAll();

        // cek nomor antrian saat ini untuk setiap poli
        foreach ($polies as $key => $poly) {
            $queue = $queueModel->where('poli_id', $poly['id'])
                ->where('status !=', 'selesai')
                ->first();

            $polies[$key]['current_number'] = $queue['number'] ?? 0;
        }

        //  return http status code 200 dan data antrian poli
        return $this->respond(['polies' => $polies], 200);
    }

    // update status poli, buka atau tutup
    public function changeStatus($poli_id)
    {
        return $this->respond(['success' => $this->model->update($poli_id, ["is_open" => $this->request->getVar('is_open')])], 200);
    }

}
