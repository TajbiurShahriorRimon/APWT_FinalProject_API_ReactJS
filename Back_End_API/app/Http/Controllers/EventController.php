<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Events;

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
    }
    public function MonthlyCalc()
    {
        $result = DB::select("SELECT eventId,title,targetAmount,raisedAmount,commission,startDate,targetAmount -raisedAmount as remaining FROM events WHERE startDate>now() - interval 1 month and status=1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);
    }
    public function editCalc($id)
    {
        $event = events::find($id);

        return response()->json([
            "status" => 200,
            "result" => $event
        ]);
    }
    public function updateCalc(Request $request, $id)
    {
        $event = events::find($id);
        $event->title = $request->input('title');
        $event->commission = $request->input('commission');
        $event->raisedAmount = $request->input('raisedAmount');
        $event->update();

        return response()->json([
            "status" => 200,
            "message" => 'Updated',
        ]);
    }
    public function YearlyCalc()
    {
        $result = DB::select("SELECT eventId,title,targetAmount,raisedAmount,commission,startDate,targetAmount -raisedAmount as remaining FROM events WHERE `startDate` >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) and status=1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);
    }
    public function searchActiveEvents(Request $request)
    {
        $result = DB::select("SELECT * FROM events WHERE status = 1 AND title LIKE '%$request->eventText%'
                                    OR description LIKE '%$request->eventText%' AND status = 1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('user.admin.userHome')->with('events', $data);*/
    }

    public function eventRequest()
    {
        $result = DB::select("SELECT * FROM events WHERE status = -1");

        return response()->json([
            "status" => 200,
            "result" => $result,
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('event.requestedEvents')->with('events', $data);*/
    }

    public function eventBriefDetails($id)
    {
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

    public function detailReviews($id)
    {
        $result = DB::select("SELECT users.email, users.userName, comments.description, commentId, comments.date, comments.eventId
                                    FROM comments, users WHERE eventId = $id
                                    AND comments.userId = users.userId");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('event.detailReviews')->with('events', $data);*/
    }

    public function removeEventComment($id, $eventId)
    {
        DB::select("Delete from comments where commentId = $id");

        $result = DB::select("SELECT users.email, users.userName, comments.description, commentId, comments.date, comments.eventId
                                    FROM comments, users WHERE eventId = $eventId
                                    AND comments.userId = users.userId");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        //return redirect('/event/detailReviews/'.$eventId)->with('removeEventCommentMsg', "Successfully removed Event Comment");
    }

    public function removePendingEvent($id)
    {
        DB::select("Delete from events where eventId = $id");

        return response()->json([
            "status" => 200,
        ]);

        //return redirect('/events/eventRequest')->with('removePendingEventMsg', "Successfully removed pending Event");
    }

    public function showEventForRemove($id)
    {
        $result = DB::select("select * from events where eventId = $id");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('event.activeEventForRemove')->with('events', $data);*/
    }

    public function removeActiveEvent($id)
    {
        $result = DB::select("SELECT SUM(Amount) as totalAmount FROM eventdonations WHERE eventId = $id");
        $data = json_decode(json_encode($result), true);
        foreach ($data as $amount) {
        }

        if ($amount['totalAmount'] == null) {
            $totalRaisedAmount = 0;
        } else {
            $totalRaisedAmount = $amount['totalAmount'];
        }

        DB::update("update events set raisedAmount = $totalRaisedAmount, status = 0 where eventId = $id");

        return response()->json([
            "status" => 200,
        ]);

        //return redirect('/userHomePage/events')->with('activeEventRemoveMessage', "Event Removed Successfully");
    }

    public function approveForm($id)
    {
        $result = DB::select("SELECT * FROM events WHERE eventId = $id");

        $managerResult = DB::select("SELECT * FROM users where type = 'manager' and status = 1");

        return response()->json([
            "status" => 200,
            "result" => $result,
            "managerResult" => $managerResult
        ]);

        /*$managers = json_decode(json_encode($managerResult), true);
        $events = json_decode(json_encode($result), true);
        return view('event.requestApproval', compact('events', 'managers'));*/
    }

    public function confirmCreateEvent($id, Request $request)
    {
        $todayDate = date('Y-m-d');

        $convertStartDate = strtotime($request->startDate);
        $eventStartDate = date('Y-m-d', $convertStartDate);

        $convertEndDate = strtotime($request->endDate);
        $eventEndDate = date('Y-m-d', $convertEndDate);

        $notificationMessage = "Your event Request is accepted. Commission percent: " . $request->commission . ". Event Title: " . $request->eventTitle .
            ". Start date: " . $request->startDate . ". End Date: " . $request->endDate;

        DB::update("update events set managerId = $request->managerUserId,
                                    startDate = $convertStartDate, endDate = $convertEndDate,
                                    commission = $request->commission, status = 1 where eventId = $id");

        $event = Events::find($id);
        $event->startDate = $request->startDate;
        $event->endDate = $request->endDate;
        $event->save();

        $organizer = DB::select("select * from events where eventId = $id");
        $organizerInfo = json_decode(json_encode($organizer), true);
        foreach ($organizerInfo as $organizerInformation) {
        }

        $organizerId = $organizerInformation['userId'];

        $admin = DB::select("select * from users where type = 'admin'");
        $adminInfo = json_decode(json_encode($admin), true);
        foreach ($adminInfo as $adminInformation) {
        }

        $adminId = $adminInformation['userId'];

        DB::insert("insert into notifications (title, message, userId, date)
                            values ('Event Created Successfully', '$notificationMessage', '$adminId', '$todayDate')");

        $fetchNotificationId = DB::select("SELECT * FROM `notifications` ORDER by notificationId DESC LIMIT 1");
        $notificationInfo = json_decode(json_encode($fetchNotificationId), true);
        foreach ($notificationInfo as $notificationInformation) {
        }

        $notificationId = $notificationInformation['notificationId'];

        $notificationReceiverStatus = 0;
        DB::insert("insert into receivers (notificationId, userId, status)
                          values ('$notificationId', '$organizerId', '$notificationReceiverStatus')");

        return response()->json([
            "status" => 200,
        ]);
        //return redirect('/events/eventRequest')->with('eventAcceptMessage', "Event Created Successfully");
    }

    public function eventInformation($id)
    {
        $result = DB::select("SELECT * FROM events WHERE eventId = $id");

        $managerResult = DB::select("SELECT * FROM users where type = 'manager' and status = 1");
        /*$managers = json_decode(json_encode($managerResult), true);
        $events = json_decode(json_encode($result), true);*/

        $managerEventInfo = DB::select("SELECT users.userName, users.status, events.managerId FROM users, events
                                                WHERE users.userId = events.managerId
                                                AND users.type = 'manager' AND eventId = $id");
        $managerEvent = json_decode(json_encode($managerEventInfo), true);
        foreach ($managerEvent as $managerStatus) {
        }

        $statusOfManager = $managerStatus['status'];

        return response()->json([
            "status" => 200,
            "result" => $result,
            "managerResult" => $managerResult,
            "managerStatus" => $statusOfManager
        ]);
        //return view('event.information', compact('events', 'managers', 'statusOfManager'));
    }

    public function managerListForEventUpdate($id)
    {
        $managerList = DB::select("SELECT * FROM users where type = 'manager' and status = 1 AND not userId = $id");
        $managerDetails = DB::select("SELECT * FROM users where userId = $id");

        return response()->json([
            "status" => 200,
            "managerList" => $managerList,
            "managerDetails" => $managerDetails
        ]);
    }

    public function changeManagerForEvent(Request $request, $id)
    {
        $event = Events::find($id);
        $event->managerId = $request->managerUserId;
        $event->save();

        return response()->json([
            "status" => 200
        ]);

        //return $request->managerUserId;
        //return redirect('/userHomePage/events')->with('managerChangeForEventMsg', "Manager Changed Successfully for Event!");
    }
}
