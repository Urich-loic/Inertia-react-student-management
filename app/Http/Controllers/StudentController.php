<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\SectionResource;
use App\Http\Resources\StudentResource;
use App\Models\Classes;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class StudentController extends Controller
{
        /**
        * Display a listing of the resource.
        */
        public function index(Request $request)
        {
        Gate::authorize('student_access');

            $students = Student::search($request)->with(['class', 'section'])->latest()->paginate(10);
            $classes = ClassResource::collection(Classes::all());
            
            return Inertia::render('Students/index', [
                'students' => StudentResource::collection($students),
                'classes' => $classes,
                'search' => $request->search?? "",
                'class_id' => $request->class_id?? "",
            ]);
        }
    
        /**
        * Show the form for creating a new resource.
        */
        public function create()
        {
            Gate::authorize('student_create');
            $classes = ClassResource::collection(Classes::all());
            return Inertia::render('Students/Create', [
                'classes' => $classes,
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
        public function edit(Student $student)
        {
            Gate::authorize('student_edit');
            $classes = ClassResource::collection(Classes::all());


            return Inertia::render('Students/Edit', [
                'classes' => $classes,
                'student' =>StudentResource::make($student->load(['class', 'section'])),
            ]);
        }
    
        /**
        * Update the specified resource in storage.
        */
        public function update(UpdateStudentRequest $request, Student $student)
        {
            $student->update($request->validated());

            return redirect()->route('students.index')->with('message', [
                'type'=>'success', 
                'body'=>'Student updated successfully.']);
        }
    
        /**
        * Remove the specified resource from storage.
        */
        public function destroy(Student $student)
        {
            Gate::authorize('student_delete');
            $student->delete();

            return redirect()->route('students.index')->with('message', [
                'type'=>'success', 
                'body'=>'Student deleted successfully.']);
        }
}
