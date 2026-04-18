<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\SectionResource;
use App\Http\Resources\StudentResource;
use App\Models\Classes;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
        /**
        * Display a listing of the resource.
        */
        public function index()
        {
            $students = Student::with(['class', 'section'])->latest()->paginate(10);
            return Inertia::render('Students/index', [
                'students' => StudentResource::collection($students),
            ]);
        }
    
        /**
        * Show the form for creating a new resource.
        */
        public function create()
        {
            $classes = ClassResource::collection(Classes::all());
            $sections = SectionResource::collection(Section::all());
            return Inertia::render('Students/Create', [
                'classes' => $classes,
                'sections' => $sections,
            ]);
        }
    
        /**
        * Store a newly created resource in storage.
        */
        public function store(StoreStudentRequest $request)
        {
            Student::create($request->validated());

            return redirect()->route('students.index')->with('message', [
                'type'=>'success', 
                'body'=>'Student created successfully.']);
        }
    
        /**
        * Display the specified resource.
        */
        public function show(string $id)
        {
            //
        }
    
        /**
        * Show the form for editing the specified resource.
        */
        public function edit(string $id)
        {
            //
        }
    
        /**
        * Update the specified resource in storage.
        */
        public function update(Request $request, string $id)
        {
            //
        }
    
        /**
        * Remove the specified resource from storage.
        */
        public function destroy(string $id)
        {
            //
        }
}
