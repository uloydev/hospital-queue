<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

use App\Models\User;

// genrator data dummy user
class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'name' => 'user',
            'email' => 'user@uloy.dev',
            'password' => password_hash('password', PASSWORD_DEFAULT),
            'phone' => '08123456789',
            'address' => ' Jl Raden Saleh Raya 4 Dinar Bldg, Dki Jakarta',
        ];

        model(User::class)->save($data);
    }
}
