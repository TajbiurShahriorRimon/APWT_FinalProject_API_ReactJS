<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\org;
use App\Models\org_users;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    //
    public function verification(Request $req)
    {
        // $result=org::all();
        // print_r($result[0]->name);

        $data = org::where('email', $req->mail)
            ->where('password', $req->pass)
            ->get();

        $data2 = org_users::where('email', $req->mail)
            ->where('password', $req->pass)
            ->get();
        if (count($data) > 0 || count($data2) > 0) {
            $type = $data2[0]->type;
            $mail = $data2[0]->email;
            $userId = $data2[0]->userId;
            if ($type == 'user') {
                /*$req->session()->put('id1', $data[0]->id);
                $req->session()->put('id2', $data2[0]->userId);
                $req->session()->put('name', $data[0]->name);
                $req->session()->put('email', $data[0]->email);
                $req->session()->put('gender', $data[0]->gender);
                $req->session()->put('address', $data[0]->address);
                $req->session()->put('phone', $data[0]->phone);*/
                return response()->json(["status" => 200, "data" => $data, "data2" => $data2, "type" => $type,]);
                //return redirect('/org_dashboard');
            }
            if ($type == 'manager') {
                return response()->json([
                    "status" => 200,
                    "type" => $type,
                    "mail" => $mail,
                    "userId" => $userId
                ]);
            }
        }
        if (count($data2) > 0) {  //changes starts
            $type = $data2[0]->type;
            $mail = $data2[0]->email;
            $userId = $data2[0]->userId;
            if ($type == 'admin') {
                /*$req->session()->put('id2', $data2[0]->userId);
                $req->session()->put('email', $user_email);
                $req->session()->put('type', $type);*/
                return response()->json([
                    "status" => 200,
                    "type" => $type,
                    "mail" => $mail,
                    "userId" => $userId
                ]);
                //return redirect('/userHomePage/events');
            }
        } //change ends
        else {
            //$req->session()->flash('msg','invalid user !');
            return response()->json(["status" => 405]);
            //return redirect('/login') ->withInput();
        }

        /*$data=org::where('email', $req->mail)
            ->where('password', $req->pass)
            ->get();

        $data2=org_users::where('email', $req->mail)
            ->where('password', $req->pass)
            ->get();

        $type=$data2[0]->type;
        $user_email = $data2[0]->email;
        $req->session()->put('id2', $data2[0]->userId);
        $req->session()->put('email', $user_email);
        $req->session()->put('type', $type);
        return response()->json(["status" => $req->mail]);*/

        //$result = DB::select("SELECT * FROM users where email = '$req->email'");
        //return response()->json(["status" => $req->email]);
    }
}
