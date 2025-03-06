<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AttendanceController extends Controller
{
    public function scan(Request $request, $userId)
    {
        try {
            // Find user by ID
            $user = User::find($userId);
            if (!$user) {
                return response()->json([
                    'error' => 'User not found',
                    'message' => 'User with ID ' . $userId . ' not found',
                ], 404);
            }
            // Check if the user has an attendance record for today
            $today = now()->toDateString();
            $attendance = Attendance::where('user_id', $user->id)
                ->where('event_date', $today)
                ->first();
            return response()->json([
                'user' => $user,
                'attendance' => $attendance,
            ]);
        } catch (\Exception $e) {
            Log::error('Error scanning QR code: ' . $e->getMessage());
            return response()->json(['error' => 'Error scanning QR code: ' . $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $userId)
    {
        try {
            // Find user by ID
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $today = now()->toDateString();
            $attendance = Attendance::where('user_id', $user->id)
                ->where('event_date', $today)
                ->first();

            if ($attendance && $attendance->time_in && $attendance->time_out) {
                return response()->json([
                    'error' => 'Attendance already completed.',
                    'message' => 'You have already scanned in and out for today.',
                ], 400);
            }
            if (!$attendance) {
                // First scan - time in
                $attendance = Attendance::create([
                    'user_id' => $user->id,
                    'event_date' => $today,
                    'time_in' => now(),
                ]);
                return response()->json([
                    'success' => "Welcome, {$user->firstname}!",
                    'message' => "You have time in at " . now()->format('h:i A'),
                    'user' => $user,
                    'attendance' => $attendance,
                ]);
            }
            if (!$attendance->time_out) {
                // Second scan - time out
                $attendance->update([
                    'time_out' => now(),
                ]);
                return response()->json([
                    'success' => "Thank you, {$user->firstname}!",
                    'message' => "You have time out at " . now()->format('h:i A') . ". \n See you tomorrow!",
                    'user' => $user,
                    'attendance' => $attendance,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error processing attendance: ', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Error processing attendance: ' . $e->getMessage()], 500);
        }
    }
}
