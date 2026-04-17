<?php

namespace Database\Seeders;

use App\Models\Classes;
use App\Models\Section;
use App\Models\Student;
use Attribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ClassesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Classes::factory()
    ->count(5)
    ->sequence(fn ($i) => [
        'name' => 'Class ' . ($i->index + 1),
    ])
    ->create()
    ->each(function ($class) {

        $sections = Section::factory()
    ->count(3)
    ->create([
        'class_id' => $class->id,
        'name' => fake()->randomElement(['A', 'B', 'C']),
    ]);

        foreach ($sections as $section) {
            Student::factory()
                ->count(5)
                ->create([
                    'class_id' => $class->id,
                    'section_id' => $section->id,
                ]);
        }
    });
    }
}
