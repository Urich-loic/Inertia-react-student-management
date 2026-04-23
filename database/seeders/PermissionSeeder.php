<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissons = [
            ['title'=>'role_create'],
            ['title'=>'role_edit'],
            ['title'=>'role_delete'],
            ['title'=>'role_show'],
            ['title'=>'role_access'],
            ['title'=>'student_create'],
            ['title'=>'student_edit'],
            ['title'=>'student_delete'],
            ['title'=>'student_show'],
            ['title'=>'student_access'],
        ];
    }
}
