<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get only users who have attendance records with time_in NOT NULL
            $users = User::whereHas('attendances', function ($query) {
                $query->whereNotNull('time_in');
            })
                ->with(['attendances' => function ($query) {
                    $query->whereNotNull('time_in')
                        ->orderBy('time_in', 'desc');
                }])
                ->get()
                ->sortByDesc(function ($user) {
                    // Sort users by their latest time_in
                    return $user->attendances->first() ? $user->attendances->first()->time_in : null;
                })
                ->values() // Re-index the collection after sorting
                ->map(function ($user) {
                    $qrText = $user->id;
                    $qrCodeData = QrCode::size(pixels: 50)
                        ->margin(3)
                        ->format('svg')
                        ->generate($qrText);
                    $user->qrCode = 'data:image/svg+xml;base64,' . base64_encode($qrCodeData);
                    return $user;
                });
            return Inertia::render('Welcome', [
                'users' => $users
            ]);
        } catch (\Exception $e) {
            Log::error('Error rendering welcome page: ' . $e->getMessage());
            return Inertia::render('Error', [
                'error' => 'Error rendering welcome page: ' . $e->getMessage()
            ]);
        }
    }
}
