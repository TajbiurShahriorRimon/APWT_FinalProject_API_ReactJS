<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    //
    public function index()
    {
        $result = DB::select("select * from events where status = 1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);
        /*$data = json_decode(json_encode($result), true);
        return view('user.admin.userHome')->with('events', $data);*/
    }

    public function searchActiveEvents(Request $request){
        $result = DB::select("SELECT * FROM events WHERE status = 1 AND title LIKE '%$request->eventText%'
                                    OR description LIKE '%$request->eventText%' AND status = 1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('user.admin.userHome')->with('events', $data);*/
    }

    public function eventBriefDetails($id){
        $result = DB::select("SELECT Count(DISTINCT userId) as totalDonors, SUM(Amount) as totalRaisedAmount
                                    FROM eventdonations WHERE eventId = $id");

        //$data = json_decode(json_encode($result), true);

        $info = DB::select("SELECT users.email, users.userId, userName, events.title, events.startDate, events.endDate
                                    FROM events, users WHERE users.userId = events.userId AND eventId = $id");
        /*$data2 = json_decode(json_encode($info), true);

        return view('event.briefReport')->with('events', $data)
            ->with('information', $data2);*/

        return response()->json([
            "status" => 200,
            "result" => $result,
            "info" => $info
        ]);
    }

    public function archivedEvents()
    {
        $result = DB::select("select * from events where status = 0");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('event.archivedEvents')->with('events', $data);*/
    }

    public function eventInformation($id){
        $result = DB::select("SELECT * FROM events WHERE eventId = $id");

        $managerResult = DB::select("SELECT * FROM users where type = 'manager' and status = 1");
        $managers = json_decode(json_encode($managerResult), true);

        $events = json_decode(json_encode($result), true);

        $managerEventInfo = DB::select("SELECT users.userName, users.status, events.managerId FROM users, events
                                                WHERE users.userId = events.managerId
                                                AND users.type = 'manager' AND eventId = $id");
        $managerEvent = json_decode(json_encode($managerEventInfo), true);
        foreach ($managerEvent as $managerStatus){}

        $statusOfManager = $managerStatus['status'];
        return view('event.information', compact('events', 'managers', 'statusOfManager'));
    }
}
