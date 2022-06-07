<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class DevSeeder extends Seeder
{
    public function run()
    {
        $this->call('AdminSeeder');
        $this->call('PolySeeder');
        $this->call('UserSeeder');
    }
}
