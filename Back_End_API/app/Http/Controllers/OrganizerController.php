<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrganizerController extends Controller
{
    public function nonOrganizerList(){
        $result = DB::select("SELECT userId, userName, email FROM users
                                    WHERE userId NOT IN (SELECT userId FROM EVENTS where status <> -1)
                                    AND type = 'user'");
        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('organizer.nonOrganizerList')->with('users', $data);*/
    }

    public function topOrganizerDetails(){
        $result = DB::select("SELECT SUM(raisedAmount) as raisedAmount, users.userId, userName, email, type, users.status
                                    FROM events, users
                                    WHERE users.userId = events.userId
                                    AND events.status = 0
                                    GROUP BY userId ORDER BY SUM(raisedAmount) DESC LIMIT 1");
        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('organizer.topOrganizerDetails')->with('users', $data);*/
    }

    public function organizerNumOfEvents(){
        $result = DB::select("SELECT COUNT(eventId) as numOfEvents, users.userId, email, userName
                                    FROM events, users WHERE events.status <> -1
                                    AND users.userId = events.userId GROUP by userId");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('organizer.numOfEvents')->with('users', $data);*/
    }

    public function organizerYearEventReport($id){
        $result = DB::select("SELECT sum(Amount) as totalAmount, Year(date) as date from eventdonations, events
                                    WHERE events.eventId = eventdonations.eventId
                                    and events.userId = $id GROUP BY year(date)");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('organizer.organizerYearlyReport')->with('report', $data);*/
    }
}
