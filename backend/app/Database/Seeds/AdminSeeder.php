<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'email' => 'admin@uloy.dev',
            'name' => 'admin',
            'password' => password_hash('password', PASSWORD_BCRYPT)
        ];

        model(Admin::class)->save($data);
    }
}
