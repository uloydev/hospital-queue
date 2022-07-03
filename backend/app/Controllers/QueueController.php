<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Poly;
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

    // menampilkan atrian by id
    public function show($queue_id)
    {
        return $this->respond(['queues' => $this->model->find($queue_id)], 200);
    }

    // logic registrasi antrian pasien
    public function store()
    {
        // mengambil data dari body json
        $data = [
            "name" => $this->request->getVar('name'),
            "phone" => $this->request->getVar('phone'),
            "address" => $this->request->getVar('address'),
            "complaint" => $this->request->getVar('complaint'),
            "poli_id" => $this->request->getVar('poli_id'),
            "number" => count($this->model->where('poli_id', $this->request->getVar('poli_id'))->findAll()) + 1,
        ];

        // ambil data user yang login
        $claims = getJwtClaims($this->request);
        $data["user_id"] = $claims->id;

        // menambahkan data registrasi antrian
        $queue_id = $this->model->insert($data);

        // mengembalikan data antrian user dengan status code 200
        return $this->respond(['queue' => $this->model->find($queue_id)], 200);
    }

    // logic mengambil data antrian user
    public function userQueue()
    {
        // ambil data user yg sedang login
        $claims = getJwtClaims($this->request);

        // ambil data antrian user
        $queue = $this->model
        ->where('user_id', $claims->id)
        ->where('status !=', 'Selesai')
        ->first();

        // cek antrian exist
        if (is_null($queue)) {
            // jika ga ada antrian return status code 404, not found
            return $this->respond([
                'message' => 'tidak ada antrian untuk anda',
            ], 404);
        }

        // ambil data antrian saat ini untuk poli yg dipilih user
        $currentQueue = $this->model->where('poli_id', $queue['poli_id'])
        ->where('status !=', 'selesai')
        ->first();

        // ambil data poli
        $poly = (new Poly())->find($queue['poli_id']);

        // menghitung jarak antrian user dengan antrian saat ini
        $queueDiff = $queue['number'] - $currentQueue['number'];
        
        return $this->respond([
            'queue' => $queue,
            'poly' => $poly,
            'show_arrive_notification' => $queueDiff <= 3 and $queueDiff > 0, // true jika jarak antrian <= 3 dan jarak antrian > 0
            'show_check_notification' => !is_null($queue['started_at']) and $queueDiff == 0, // true jika user belum melakukan pengecekan dan jarak antrian 0
        ], 200);
    }

    // logic untuk menampilkan semua antrian disalah satu poli by poli id
    public function polyQueue($poli_id)
    {
        return $this->respond([
            'queues' => $this->model->where('poli_id', $poli_id)->findAll(),
            'current_queue' => $this->model->where('poli_id', $poli_id)->where('status', 'Tiba')->first(),
        ], 200);
    }

    // logic untuk melakukan konfirmasi kedatangan user
    public function confirmArrival($queue_id)
    {
        return $this->respond(['success' => $this->model->update($queue_id, ["status" => "Tiba"])], 200);
    }

    // logic untuk melakukan konfirmasi pengecekan user
    public function confirmCheck($queue_id)
    {
        return $this->respond(['success' => $this->model->update($queue_id, ["status" => "Pemeriksaan"])], 200);
    }

    // logic untuk melanjutkan antrian ke antian selanjutnya di suatu poli by poli_id
    public function setNextQueue()
    {
        // ambil antrian saat ini daru 1 poli
        $currentQueue = $this->model->where('poli_id', $this->request->getVar('poli_id'))
        ->where('status !=', 'selesai')
        ->first();

        //cek antriannya exists
        if (is_null($currentQueue)) {
            // jika ga ada antrian return status code 404, not found
            return $this->respond([
                'message' => 'tidak ada antrian untuk poli ini',
            ], 404);
        }

        // update antrian saat ini jadi sukses, dan return http code 200
        return $this->respond(['success' => $this->model->update($currentQueue['id'], ["status" => "Selesai"])], 200);
    }

    // logic reset antrian disuatu poli 
    public function reset()
    {
        return $this->respond(['success' => $this->model->where("deleted_at is null")->where('poli_id', $this->request->getVar('poli_id'))->delete()], 200);
    }

    // logic set status antrian sedang dicek
    public function setCheckNotification()
    {
        // ambil data antrian saat ini by poli id
        $currentQueue = $this->model->where('poli_id', $this->request->getVar('poli_id'))
        ->where('status !=', 'selesai')
        ->first();

        // cek antrian exists
        if (is_null($currentQueue)) {
            return $this->respond([
                'message' => 'tidak ada antrian untuk poli ini',
            ], 404);
        }

        // update antrian dengan set started_at = now, dengan status code 200
        return $this->respond(['success' => $this->model->update($currentQueue['id'], ["started_at" => (new DateTime())->format('Y-m-d H:i:s')])], 200);
    }

}
