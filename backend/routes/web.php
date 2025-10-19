<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\UserLogincontroller;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\GeneralsettingsController;
use App\Http\Controllers\RoleAndPermissionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/




Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminLoginController::class, 'login'])->name('login');
    Route::post('login-details-submit', [AdminLoginController::class, 'loginDetailsSubmit'])->name('login-details-submit');
    Route::get('forgot-password', [AdminLoginController::class, 'forgotPasswordForm'])->name('forgot.password');
    Route::post('send-otp', [AdminLoginController::class, 'sendOtp'])->name('send.otp');
    Route::post('otp-verification', [AdminLoginController::class, 'otpVerification'])->name('otp.verification');
    Route::get('reset-password', [AdminLoginController::class, 'resetPasswordform'])->name('reset.password');
    Route::post('reset-password', [AdminLoginController::class, 'resetPassword'])->name('reset.password');


    Route::middleware(['auth:admin'])->group(function () {
        Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('profileform', [AdminController::class, 'profileForm'])->name('profileForm');
        Route::get('logout', [AdminLoginController::class, 'logout'])->name('logout');
        Route::post('update-profile/{id}', [AdminController::class, 'updateProfile'])->name('updateProfile');
        Route::get('user-list', [AdminController::class, 'userList'])->name('user-list');
        Route::get('add-user-form', [AdminController::class, 'addUserForm'])->name('add-user-form');
        Route::post('change-user-status', [AdminController::class, 'changeUserStatus'])->name('change-user-status');
        Route::post('add-user', [AdminController::class, 'addUser'])->name('add-user');
        Route::get('edit-user/{id}', [AdminController::class, 'editUser'])->name('edit-user');
        Route::post('update-user/{id}', [AdminController::class, 'updateUser'])->name('update-user');
        Route::get('change-user-password/{id}', [AdminController::class, 'changeUserPassword'])->name('change-user-password');
        Route::get('delete-user/{id}', [AdminController::class, 'deleteUser'])->name('delete-user');
        Route::get('roles', [RoleAndPermissionController::class, 'roleList'])->name('roles');
        Route::get('add-role-form', [RoleAndPermissionController::class, 'addRoleForm'])->name('add-role-form');
        Route::post('add-role', [RoleAndPermissionController::class, 'addRole'])->name('add-role');
        Route::post('change-role-status', [RoleAndPermissionController::class, 'changeRoleStatus'])->name('change-role-status');
         
        // General Settings Routes
        Route::get('general-settings', [GeneralsettingsController::class, 'generalsettingscreate'])->name('general.settings');
        Route::post('generalsettings_form', [GeneralsettingsController::class, 'generalsettingsstore'])->name('general.setting.update');

        Route::get('assign-permissions-to-role/{role_name}', [RoleAndPermissionController::class, 'assignPermissionForm'])->name('assign-permissions-to-role');
        Route::post('assign-permissions', [RoleAndPermissionController::class, 'assignPermissions'])->name('assign-permissions');
        //Spatie Protected Routes
        Route::middleware(['permission'])->group(function () {
        });
    });
});


Route::get('/', function () {
    return view('user.login');
})->name('login');
Route::prefix('user')->name('user.')->group(function () {
    Route::post('login-details-submit', [UserLogincontroller::class, 'loginDetailsSubmit'])->name('login-details-submit');

    Route::middleware(['auth:web'])->group(function () {
        //Protected Route start
        Route::get('dashboard', [UserController::class, 'dashboard'])->name('dashboard');
        Route::get('logout', [UserController::class, 'logout'])->name('logout');
    });
});
