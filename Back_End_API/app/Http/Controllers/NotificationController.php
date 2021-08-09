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
                                    AND receivers.userId = (SELECT userId FROM users WHERE type = 'admin')");

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
}
