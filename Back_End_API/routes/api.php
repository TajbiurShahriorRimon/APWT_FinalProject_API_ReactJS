<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DonationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Transaction
Route::get('/transactions', [TransactionController::class, 'index']);

//User
Route::get('/userList', [UserController::class, 'index']);
Route::get('/user/profile/{id}', [UserController::class, 'show']);
Route::put('/user/changeStatus/{id}/{status}', [UserController::class, 'changeStatus']);

//Donation
Route::get('/donationReport/yearly', [DonationController::class, 'index']);
Route::get('/donationReport/monthly/{year}', [DonationController::class, 'monthlyDonationReport']);
Route::get('/donorList', [DonationController::class, 'donorList']);
Route::get('/topDonor', [DonationController::class, 'topDonor']);
Route::get('/nonDonorList', [DonationController::class, 'nonDonorList']);
