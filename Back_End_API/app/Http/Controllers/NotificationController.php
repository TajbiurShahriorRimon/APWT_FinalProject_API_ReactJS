<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function adminNotification(){
        $result = DB::select("SELECT notifications.notificationId, notifications.date, notifications.title,
                                    receivers.status, users.email, notifications.userId
                                    from notifications, receivers, users
                                    WHERE notifications.notificationId = receivers.notificationId
                                    AND users.userId = notifications.userId
                                    AND receivers.userId = (SELECT userId FROM users WHERE type = 'admin')
                                    ORDER BY notifications.date desc");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('notification.adminNotification')->with('notices', $data);*/
    }

    public function adminReadNotice($id){
        DB::update("update receivers set status = 1 where notificationId = $id");

        $result = DB::select("SELECT * FROM notifications where notificationId = $id");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);

        return view('notification.readNotice')->with('notices', $data);*/
    }

    public function checkSentNotices($adminId){
        //$adminId = session()->get('id2');

        $result = DB::select("SELECT receivers.userId, receivers.notificationId, notifications.title, users.userName, users.email, notifications.date
                                            FROM receivers, notifications, users
                                            WHERE receivers.notificationId = notifications.notificationId
                                            AND users.userId = receivers.userId
                                            AND notifications.userId = $adminId
                                            order by notifications.notificationId desc");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$notices = json_decode(json_encode($result), true);

        return view('notification.sentNoticeList')->with('notices', $notices);*/
    }

    public function readSentNotice($id){
        $result = DB::select("SELECT users.userName, users.userId, email, notifications.title,
                                    notifications.message, notifications.date
                                    FROM notifications, users
                                    WHERE users.userId = notifications.userId and notificationId = $id");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('notification.readSentNotice')->with('notices', $data);*/
    }

    public function adminCreateNotice(){
        $result = DB::select("SELECT * FROM users where type = 'manager' and status = 1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$managers = json_decode(json_encode($managerResult), true);
        return view('notification.create')->with('managers', $managers);*/
    }

    public function adminSendNotice(Request $request, $adminId){
        $todayDate = date('Y-m-d');
        //$adminId = $request->session()->get('id2');

        DB::insert("insert into notifications (title, message, userId, date)
                            values ('$request->title', '$request->message', '$adminId', '$todayDate')");

        $fetchNotificationId = DB::select("SELECT * FROM `notifications` ORDER by notificationId DESC LIMIT 1");
        $notificationInfo = json_decode(json_encode($fetchNotificationId), true);
        foreach ($notificationInfo as $notificationInformation){}

        $notificationId = $notificationInformation['notificationId'];

        $notificationReceiverStatus = 0;
        DB::insert("insert into receivers (notificationId, userId, status)
                          values ('$notificationId', '$request->managerUserId', '$notificationReceiverStatus')");

        return response()->json([
            "status" => 200,
        ]);

        //return redirect('/admin/notice')->with('noticeSentMsg', "Notice sent successfully!");
    }
}
