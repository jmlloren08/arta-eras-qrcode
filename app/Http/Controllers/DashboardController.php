<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $qrText = auth()->user()->id;
            $qrCodeData = QrCode::size(300)
                ->margin(3)
                ->format('svg')
                ->generate($qrText);

            return Inertia::render('Dashboard', [
                'qrCode' => 'data:image/svg+xml;base64,' . base64_encode($qrCodeData),
                'qrText' => $qrText,
            ]);
        } catch (\Exception $e) {
            Log::error('Error rendering dashboard: ' . $e->getMessage());
            return Inertia::render('Error', [
                'error' => 'Error rendering dashboard: ' . $e->getMessage()
            ]);
        }
    }
}
