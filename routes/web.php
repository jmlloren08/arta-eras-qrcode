<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
    Route::get('/auth/verified/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/auth/verified/attendance/scan/{user}', [AttendanceController::class, 'scan'])->name('attendance.scan');
    Route::post('/auth/verified/attendance/update/{user}', [AttendanceController::class, 'updateAttendance'])->name('attendance.update');
    Route::get('/auth/verified/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/auth/verified/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/auth/verified/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';