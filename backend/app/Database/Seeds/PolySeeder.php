<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\Poly;

// generator data dummy poli
class PolySeeder extends Seeder
{
    public function run()
    {   
        $data = [
            [
                'name' => 'Poli Umum',
            ],
            [
                'name' => 'Poli Gigi',
            ],
            [
                'name' => 'Poli THT',
            ],
            [
                'name' => 'Poli Kebidanan',
            ],
        ];

        $model = model(Poly::class);

        foreach ($data as $item) {
            $model->save($item);
        }

    }
}
