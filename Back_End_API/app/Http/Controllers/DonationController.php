<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class DonationController extends Controller
{
    public function index()
    {
        $result = DB::select("SELECT sum(Amount) as totalAmount, Year(date) as date from eventdonations
                                    GROUP BY year(date)");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        //$data = json_decode(json_encode($result), true);
        //return view('donation.yearlyDonation')->with('row', $data);
    }

    public function monthlyDonationReport($month)
    {
        $result = DB::select("SELECT sum(Amount) as totalAmount, Date_Format(date, '%M') as date
                                    from eventdonations where Year(date) = ? GROUP BY month(date)", [$month]);

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$result = DB::select("SELECT sum(Amount) as totalAmount, Month(date) as date from eventdonations
                                    where Year(date) = ? GROUP BY month(date)", [$month]);*/

        //$data = json_decode(json_encode($result), true);

        /*$chart = array();
        $count = count($data);
        $months = array( "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" );
        for ($i = 0; $i < 12; $i++){
            $barChart = new BarChart($months[$i], 0);
            $chart[$i] = $barChart;
        }
        for ($i = 0; $i < $count; $i++){
            $chart[$data[$i]['date'] - 1] = $data[$i]['totalAmount'];
        }*/
        //print_r($chart);
        //return view('donation.monthlyDonation')->with('row', $data);
    }

    function donorList()
    {
        $result = DB::select("SELECT SUM(Amount) as totalAmount, users.userId, users.userName, users.email
                                    FROM eventdonations, users
                                    WHERE users.userId = eventdonations.userId
                                    GROUP BY userId");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('donor.donorList')->with('data', $data);*/
    }

    function topDonor()
    {
        $result = DB::select("SELECT SUM(Amount) as totalAmount, users.userId, userName, email, type, status
                                    FROM eventdonations, users
                                    WHERE users.userId = eventdonations.userId GROUP BY userId
                                    ORDER BY SUM(Amount) DESC LIMIT 1");

        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        //$data = json_decode(json_encode($result), true);
        //return view('donor.topDonorDetails')->with('users', $data);
    }

    function nonDonorList()
    {
        $result = DB::select("SELECT users.userId, userName, email FROM users
                                    where users.userId Not IN (SELECT userId FROM eventdonations)
                                    and type = 'user'");
        return response()->json([
            "status" => 200,
            "result" => $result
        ]);

        /*$data = json_decode(json_encode($result), true);
        return view('donor.nonDonor')->with('users', $data);*/
    }
}
