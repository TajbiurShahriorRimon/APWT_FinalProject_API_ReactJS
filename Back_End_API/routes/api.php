<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\EventController;

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
Route::post('/addManager', [UserController::class, 'addManager']);

//Donation
Route::get('/donationReport/yearly', [DonationController::class, 'index']);
Route::get('/donationReport/monthly/{year}', [DonationController::class, 'monthlyDonationReport']);
Route::get('/donorList', [DonationController::class, 'donorList']);
Route::get('/topDonor', [DonationController::class, 'topDonor']);
Route::get('/nonDonorList', [DonationController::class, 'nonDonorList']);

//Organizer
Route::get('/nonOrganizerList', [OrganizerController::class, 'nonOrganizerList']);
Route::get('/topOrganizer', [OrganizerController::class, 'topOrganizerDetails']);
Route::get('/organizerList/report', [OrganizerController::class, 'organizerNumOfEvents']);
Route::get('/organizerReport/yearly/{id}', [OrganizerController::class, 'organizerYearEventReport']);

//Notification
Route::get('/admin/notice', [NotificationController::class, 'adminNotification']);
Route::get('/admin/readNotice/{id}', [NotificationController::class, 'adminReadNotice']);
Route::get('/notices/checkSentNotices/{id}', [NotificationController::class, 'checkSentNotices']);
Route::get('/notice/readSentNotices/{id}', [NotificationController::class, 'readSentNotice']);
Route::get('/admin/createNotice', [NotificationController::class, 'adminCreateNotice']);
Route::post('/admin/createNotice/{adminId}', [NotificationController::class, 'adminSendNotice']);

//Event
Route::get('/userHomePage/events', [EventController::class, 'index']); //Admin Home Page
Route::get('/event/smallReport/{id}', [EventController::class, 'eventBriefDetails']);
Route::get('/events/archivedEvents', [EventController::class, 'archivedEvents']);
Route::post('/userHomePage/events', [EventController::class, 'searchActiveEvents']);
Route::get('/event/detailReviews/{id}', [EventController::class, 'detailReviews']);
Route::delete('/event/removeComment/{id}/{eventId}', [EventController::class, 'removeEventComment']);
Route::get('/events/eventRequest', [EventController::class, 'eventRequest']);
Route::delete('/events/removePendingEvent/{id}', [EventController::class, 'removePendingEvent']);
Route::get('/event/removeActiveEvent/{id}', [EventController::class, 'showEventForRemove']);
Route::get('/event/confirmRemoveEvent/{id}', [EventController::class, 'removeActiveEvent']);
Route::get('/eventRequest/approveForm/{id}', [EventController::class, 'approveForm']);
Route::post('/eventRequest/approveForm/{id}', [EventController::class, 'confirmCreateEvent']);
Route::get('/event/information/{id}', [EventController::class, 'eventInformation']);
Route::put('/event/information/{id}', [EventController::class, 'changeManagerForEvent']);
Route::get('/event/getManagerList/{id}', [EventController::class, 'managerListForEventUpdate']);

//Login
Route::post('/login', [LoginController::class, 'verification']);


Route::get('/ManagerHome', [EventController::class, 'index']);
Route::get('/Monthlycalculation', [EventController::class, 'MonthlyCalc']);
Route::get('/Yearlycalculation', [EventController::class, 'Yearlycalc']);
Route::get('/MonthlyUpdate/{id}', [EventController::class, 'editCalc']);
Route::put('/MonthlyUpdate/{id}', [EventController::class, 'updateCalc']);
Route::get('/Yearlycalculation', [EventController::class, 'Yearlycalc']);
Route::get('/YearlyUpdate/{id}', [EventController::class, 'editCalc']);
Route::put('/YearlyUpdate/{id}', [EventController::class, 'updateCalc']);
Route::get('/donorListman', [DonationController::class, 'donorListman']);
Route::get('/orgListman', [OrganizerController::class, 'OrganizerList']);
Route::get('/nonorgListman', [OrganizerController::class, 'nonOrganizerList']);
Route::post('/notices', [ManNoticesController::class, 'store']);
Route::post('/events/archivedEventsMan', [EventController::class, 'archived']);
Route::get('/event/confirmRemoveEvent/{id}', [EventController::class, 'removeActiveEventMan']);
Route::get('/eventRequestddf/approveFormff/{id}', [EventController::class, 'approveFormbrf']);
