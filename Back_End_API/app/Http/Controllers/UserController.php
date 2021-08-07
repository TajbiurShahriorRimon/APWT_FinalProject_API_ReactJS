<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //
    public function index()
    {
        $result = DB::select('SELECT * from users WHERE type <> "admin"');
        return response()->json([
            "status" => 200,
            "users" => $result
        ]);

        //$data = json_decode(json_encode($result), true);
        //return view('user.userList')->with('result', $data);
    }

    public function show($id)
    {
        $result = DB::select("select * from users where userId = $id");
        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        //return view('user.userProfile')->with('user', $result);
    }

    public function changeStatus($id, $status)
    {
        //if status is 1, that is active, we have to change to inactive, else vice versa
        if($status == 1){
            DB::update('update users set status = 0 where userId = ?', [$id]);
            return response()->json([
                "status" => 200,
            ]);
            //return redirect('/user/profile/'.$id);
        }
        else{
            DB::update('update users set status = 1 where userId = ?', [$id]);
            return response()->json([
                "status" => 200,
            ]);
            //return redirect('/user/profile/'.$id);
        }
    }
}
