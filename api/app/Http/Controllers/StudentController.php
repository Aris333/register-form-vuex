<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{

    public function index()
    {
        $student = Student::with('courses')->paginate(10);
        return response()->json(['status' => true, 'message' => 'Record Found', 'data' => $student]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:students'],
            'courses' => ['required'],
        ]);

        $student = Student::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
        ]);

        foreach ($request->courses as $course){
            Course::create([
                'student_id' => $student->id,
                'course' => $course['courseName']
            ]);
        }

        return response()->json(['status' => true, 'message' => 'Student Registered Successfully'], 200);
    }


    public function destroy($id)
    {
        $student = Student::find($id);
        if ($student) {
            $student->delete();
            return response()->json(['status' => true, 'message' => 'Student Delete Successfully'], 200);
        }
    }
}
