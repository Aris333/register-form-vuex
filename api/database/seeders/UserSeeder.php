<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'user_type' => 'admin',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'user',
                'email' => 'user@gmail.com',
                'user_type' => 'user',
                'password' => bcrypt('password'),
            ]
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
