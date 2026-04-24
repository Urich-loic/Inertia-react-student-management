<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
            'id' => 1, 
            'title' => Role::ROLES['0']
            ],
            [
            'id' => 2, 
            'title' => Role::ROLES['1']
                ]
        ];

        Role::insert($roles);
    }
}
