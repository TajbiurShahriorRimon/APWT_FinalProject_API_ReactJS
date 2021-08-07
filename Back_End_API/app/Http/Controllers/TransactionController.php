<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        //following line will return a class.
        $row = DB::select("SELECT transactions.*, events.*,users.userName FROM transactions, events, users
                                    WHERE transactions.eventId = events.eventId and users.userId = events.userId");

        /*Following line will convert the std class to associative array*/
        //$data = json_decode(json_encode($row), TRUE);
        return response()->json([
            "status" => 200,
            "transaction" => $row
        ]);
    }
}
